import React, {useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, getDatabase, ref, set, remove, push, child, stroageRef, uploadBytesResumable } from "../../../firebase";
import mime from 'mime-types';


function MessageForm() {

    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom)
    const user = useSelector(state => state.user.currentUser)
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesRef = ref(getDatabase(), "messages");
    const inputOpenImageRef = useRef();
    

    const handleChange = (event) => {
        setContent(event.target.value);
    }

    const createMessage = (fileUrl = null) => {
        const message = {
            timestamp: new Date().getTime(),
            user: {
                id: user.uid,
                name: user.displayName,
                image: user.photoURL
            }
        }

        if (fileUrl !== null) {
            message["image"] = fileUrl;
        } else {
            message["content"] = content;
        }

        return message;
    }

    const handleSubmit = async () => {
        if(!content) {
            setErrors(prev => prev.concat('Type contents first'));
            return;
        }
        setLoading(true);

        // firebase에 메세지를 저장하는 부분

        try {
            await set(push(child(messagesRef, chatRoom.id)), createMessage());
            setLoading(false);
            setContent('');
            setErrors([]);
        } catch (error) {
            setErrors(pre => pre.concat(error.message));
            setLoading(false);
            setTimeout(() => {
                setErrors([])
            }, 5000);
        }
    }

    const handleOpenImageRef = async () => {
        inputOpenImageRef.current.click();
    };

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        const storage = getStorage();

        if(!file) return;
        const filePath = `/message/public/${file.name}.jpg`
        const metaData = {contentType:mime.lookup(file.name)};
        setLoading(true);

        try {
            const storageRef = stroageRef(storage, filePath);
            const uploadTask = uploadBytesResumable(storageRef, file, metaData);

            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                        default:
                            // do nothing
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                        default:
                            // do nothing
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    set(push(child(messagesRef, chatRoom.id)), createMessage(downloadURL))
                    setLoading(false)
                });
            }
        );
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                    value={content}
                    onChange={handleChange}
                     as="textarea" rows={3} />
                </Form.Group>
                </Form>

                <ProgressBar variant="warning" label="60%" now={60} />

                <div>
                {errors.map(errorMsg => <p style={{ color: 'red' }} key={errorMsg}>
                    {errorMsg}
                </p>)}
                </div>

                <Row>
                <Col>
                    <button
                        onClick={handleSubmit}
                        className="message-form-button"
                        style={{ width: '100%' }}
                        disabled={loading ? true : false}
                    >
                        SEND
                    </button>
                </Col>
                <Col>
                    <button
                        onClick={handleOpenImageRef}
                        className="message-form-button"
                        style={{ width: '100%' }}
                        disabled={loading ? true : false}
                    >
                        UPLOAD
                    </button>
                </Col>
            </Row>

            <input onChange={handleUploadImage} style={{display: 'none'}} ref={inputOpenImageRef} type="file" />

        </div>
    )
}

export default MessageForm

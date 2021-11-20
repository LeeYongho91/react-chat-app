import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, remove, push, child } from "../../../firebase";

function MessageForm() {

    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom)
    const user = useSelector(state => state.user.currentUser)
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesRef = ref(getDatabase(), "messages");
    

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
                       
                        className="message-form-button"
                        style={{ width: '100%' }}
                        disabled={loading ? true : false}
                    >
                        UPLOAD
                    </button>
                </Col>
            </Row>

        </div>
    )
}

export default MessageForm

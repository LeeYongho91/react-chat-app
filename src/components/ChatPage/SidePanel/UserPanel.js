import React, {useRef} from 'react';
import {IoIosChatboxes} from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector} from 'react-redux';
import {getAuth, ref, getDatabase, signOut, getStorage, stroageRef, uploadBytes, updateProfile, getDownloadURL, update} from '../../../firebase';
import mime from 'mime-types';
import {setPhotoURL} from '../../../redux/actions/user_action';



function UserPanel() {

    const auth = getAuth();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    const inputOpenImageRef = useRef();

    const handleLogout = async () => {
        await signOut(auth);
    };

    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const metadata = {contentType: mime.lookup(file.name)};
        const storage = getStorage();
        const stroageREF = stroageRef(storage, `user_image/${user.uid}`);
        const db = getDatabase();

    
        try {
            let uploadTaskSnapshot = await uploadBytes(stroageREF, 
            file, metadata);

            let downloadURL = await getDownloadURL(stroageREF);
         
            // 프로필 이미지 수정
            await updateProfile(auth.currentUser, {
                photoURL: downloadURL
            });

            dispatch(setPhotoURL(downloadURL));

            const updates = {};
            updates[ `users/ + ${user.uid}`] = {
                image : downloadURL
            };

            await update(ref(db), updates);
            
            console.log('uploadTaskSnapshot', uploadTaskSnapshot);
        } 
        catch(e) {
            console.log(e);
        }
        
    };

    return (
        <div>
            {/* Logo */}
            <h3 style={{color: 'white'}}>
            <IoIosChatboxes /> {" "} Chat App
            </h3>

            <div style={{display: 'flex', marginBottom: '1rem'}}>
                 <Image src={user && user.photoURL}
                    style={{width: '30px', height: '30px', marginTop: '3px'}}
                 roundedCircle />

                <input style={{display: 'none'}} type="file"
                ref={inputOpenImageRef}
                accept="image/jpeg, image/png"
                onChange={handleUploadImage} / >


                <Dropdown>
                    <Dropdown.Toggle
                    style={{background: 'transparent', border: '0px'}}
                    id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOpenImageRef}>
                            프로필 사진 변경
                            </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            로그아웃
                            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default UserPanel

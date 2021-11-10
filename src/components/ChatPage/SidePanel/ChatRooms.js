import React, { Component } from 'react';
import {FaRegSmileWink} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import { getDatabase, ref, push, update, child} from '../../../firebase';


export class ChatRooms extends Component {

    db = getDatabase();

    state = {
        show: false,
        name: '',
        description: '',
        chatRoomsRef: ref(this.db)
    }

    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});

    handleSubmit = (e) => {
        e.preventDefault();

        const { name, description } = this.state;

        if(this.isFormValid(name, description)) {
            this.addChatRoom();
        }

    };

    addChatRoom = async () => {
        const key = push(child(this.state.chatRoomsRef, 'chatRooms')).key;
        const {name, description} = this.state;
        const {user} = this.props;

        const newChatRoom = {
            id: key,
            name: name,
            description: description,
            createBy: {
                name: user.displayName,
                image: user.photoURL
            }
        }

        try {
            const updates = {};
            updates['chatRooms/' + key] = newChatRoom;
            await update(this.state.chatRoomsRef, updates);
            this.setState({
                name: "",
                description: "",
                show: false
            })
        } catch (error) {
            console.log(error);
        }

        
        
    };

    isFormValid = (name, description) => 
        name && description;
    


    render() {
        return (
            <div>
              <div style={{
                  position: 'relative', width: '100%',
                  display: 'flex', alignItems: 'center'
              }}>

                <FaRegSmileWink style={{marginRight: 3}} />
                CHAT ROOMS {" "} (1)
                <FaPlus style={{
                    position: 'absolute',
                    right: 0, cursor: 'pointer'                  
                }} onClick={this.handleShow} />


                {/* ADD CHAT ROOM MODAL */}
       

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create a chat room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>방 이름</Form.Label>
                        <Form.Control type="text"
                        onChange={(e) => this.setState({name: e.target.value})}
                        placeholder="Enter a chat room name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>방 설명</Form.Label>
                        <Form.Control type="text"
                        onChange={(e) => this.setState({description: e.target.value})}
                        placeholder="Enter a chat room description " />
                    </Form.Group>
               </Form>      
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Create
                    </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
            </div>
         
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(ChatRooms);

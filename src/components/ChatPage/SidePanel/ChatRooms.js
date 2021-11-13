import React, { Component } from 'react';
import {FaRegSmileWink} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import { getDatabase, ref, push, update, child, onChildAdded, off} from '../../../firebase';
import {setCurrentChatRoom} from '../../../redux/actions/chatRoom_action';


export class ChatRooms extends Component {

    db = getDatabase();

    state = {
        show: false,
        name: '',
        description: '',
        chatRoomsRef: ref(this.db, 'chatRooms'),
        chatRooms: [],
        firstLoad: true,
        activeChatRoomId: ''
    };


    componentDidMount() {
        this.AddChatRoomsListeners();
    };

    componentWillUnmount() {
        off(this.state.chatRoomsRef);
    };

    setFirstChatRoom = () => {
        const firstChatRoom = this.state.chatRooms[0];
        if(this.state.firstLoad && this.state.chatRooms.length > 0) {
            this.props.dispatch(setCurrentChatRoom(firstChatRoom));
            this.setState({activeChatRoomId: firstChatRoom.id})
        }
        this.setState({firstLoad: false});
    };

    AddChatRoomsListeners = () => {
        let chatRoomsArray = [];

        onChildAdded(this.state.chatRoomsRef, (snapshot) => {
        const data = snapshot.val();
        chatRoomsArray.push(data);
        this.setState({chatRooms: chatRoomsArray}, () => {
            this.setFirstChatRoom();
        });
        });

        console.log(this.state.chatRooms);

     };

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
        const key = push(this.state.chatRoomsRef).key;
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
            // const updates = {};
            // updates['chatRooms/' + key] = newChatRoom;
            // await update(this.state.chatRoomsRef, updates);
            await update(child(this.state.chatRoomsRef, key), newChatRoom);
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

    changeChatRoom = (room) => {
        this.props.dispatch(setCurrentChatRoom(room));
        this.setState({activeChatRoomId: room.id});
    };

    renderChatRooms = (chatRooms) =>
        
        chatRooms.length > 0 &&
        chatRooms.map(room => (
            <li style={{cursor:'pointer', backgroundColor: room.id === this.state.activeChatRoomId && 
              "#ffffff45"   
            }} key={room.id} onClick={() => this.changeChatRoom(room)}>
                # {room.name}
            </li>
        ))
    
    render() {
        return (
            <div>
              <div style={{
                    position: 'relative', width: '100%',
                    display: 'flex', alignItems: 'center'
                }}>

                    <FaRegSmileWink style={{ marginRight: 3 }} />
                    CHAT ROOMS {" "} ({this.state.chatRooms.length})

                    <FaPlus
                        onClick={this.handleShow}
                        style={{
                            position: 'absolute',
                            right: 0, cursor: 'pointer'
                        }} />
                </div>

                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {this.renderChatRooms(this.state.chatRooms)}
                </ul>


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
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(ChatRooms);

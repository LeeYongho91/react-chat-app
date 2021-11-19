import React, { Component } from 'react';
import MessageHeader from './MessageHeader';
import Message from './Message';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import { getDatabase, ref, onChildAdded, onChildRemoved, child, off } from "../../../firebase";


export class MainPanel extends Component {

    state = {
        messages: [],
        messagesRef: ref(getDatabase(), "messages"),
        messagesLoading: true,
        searchTerm: "",
        searchResults: [],
        searchLoading: false,
        typingRef: ref(getDatabase(), "typing"),
        typingUsers: [],
        listenerLists: []
    }


    componentDidMount() {
        const { chatRoom } = this.props;

        if (chatRoom) {
            this.addMessagesListeners(chatRoom.id);
            this.addTypingListeners(chatRoom.id);
        }
    }

    addMessagesListeners = (chatRoomId) => {

        let messagesArray = [];

        let { messagesRef } = this.state;

        onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {

            messagesArray.push(DataSnapshot.val());
            this.setState({
                messages: messagesArray,
                messagesLoading: false
            })
            // this.userPostsCount(messagesArray)
        })
    }

    renderMessages = (messages) =>
        messages.length > 0 &&
        messages.map(message => (
            <Message
                key={message.timestamp}
                message={message}
                user={this.props.user}
            />
        ))





    render() {
        const { messages } = this.state;
        return (
            <div style={{
                padding: '2rem 2rem 0 2rem'
            }}>
                <MessageHeader />

                <div style={{
                    width: '100%',
                    height: '450px',
                    border: '.2rem solid #ececec',
                    borderRadius: '4px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    overflowY: 'auto'
                }}>
                {this.renderMessages(messages)}

                </div>

                <MessageForm />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
        chatRoom: state.chatRoom.currentChatRoom
    }
}

export default connect(mapStateToProps)(MainPanel)

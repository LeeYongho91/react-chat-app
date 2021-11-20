import React from 'react'
// import Media from 'react-bootstrap/Media';
import moment from 'moment';

function Message({ message, user }) {

    const timeFromNow = timestamp => moment(timestamp).fromNow();

    const isImage = message => {
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    }
    const isMessageMine = (message, user) => {
       if(user) {
           return message.user.id === user.uid
       }
    }

    return (
      <div>
        <div className="chat-container">
  <img src={message.user.image} alt="Avatar" />

  <p>Hello. How are you today?</p>
  <span className="time-right"> <h6>{message.user.name}{" "}
                    <span style={{ fontSize: '10px', color: 'gray' }}>
                        {timeFromNow(message.timestamp)}
                    </span>
                </h6></span>
</div>

<div className="chat-container darker">
  <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" />
  <p>Hey! I'm fine. Thanks for asking!</p>
  <span className="time-left">11:01</span>
</div>
      </div>
      
    )
}

export default Message

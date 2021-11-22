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
        
        <div className={isMessageMine(message, user) ? 'chat-container darker' : 'chat-container'} >
  <img style={{borderRadius: '10px'}}
        width={48}
        height={48}
  src={message.user.image} alt={message.user.name} className={isMessageMine(message, user) ? 'right' : '' } />

  {isImage(message) ? 
  <img style={{maxWidth:'300px'}} alt="이미지" src={message.image}/>
  :
  <p>{message.content}</p>}
  <span className={isMessageMine(message, user) ? 'time-left' : 'time-right' }> <h6>{message.user.name}{" "}
                    <span style={{ fontSize: '10px', color: 'gray' }}>
                        {timeFromNow(message.timestamp)}
                    </span>
                </h6></span>
</div>
      </div>
      
    )
}

export default Message

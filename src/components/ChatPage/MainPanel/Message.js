import React from 'react'
import { MDBMedia } from 'mdbreact';
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
        // <Media style={{ marginBottom: '3px' }}>
        //     <img
        //         style={{ borderRadius: '10px' }}
        //         width={48}
        //         height={48}
        //         className="mr-3"
        //         src={message.user.image}
        //         alt={message.user.name}
        //     />
        //     <Media.Body style={{
        //         backgroundColor: isMessageMine(message, user) && "#ECECEC"
        //     }}>
        //         <h6>{message.user.name}{" "}
        //             <span style={{ fontSize: '10px', color: 'gray' }}>
        //                 {timeFromNow(message.timestamp)}
        //             </span>
        //         </h6>
        //         {isImage(message) ?
        //             <img style={{ maxWidth: '300px' }} alt="이미지" src={message.image} />
        //             :
        //             <p>
        //                 {message.content}
        //             </p>
        //         }
        //     </Media.Body>
        // </Media>
        <MDBMedia>
      <MDBMedia left className="mr-3" href="#">
        <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" />
      </MDBMedia>
      <MDBMedia body>
        <MDBMedia heading>
          Media heading
      </MDBMedia>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </MDBMedia>
    </MDBMedia>
    )
}

export default Message

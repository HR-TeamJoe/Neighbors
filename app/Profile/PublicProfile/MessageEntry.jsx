import React from 'react';

const MessageEntry = (props) => {
  // var classes = props.self === props.eachMessage.user_id ? 'currentUser pull-right col-xs-8' : 'notCurrentUser pull-left col-xs-8';
  
  var message;
  var who = props.eachMessage.user_id;

  if (who === 999999) {
    message = <p className="joinStatus text-center col-xs-12">{props.eachMessage.message}</p>
  } else if(who === props.self) {
    message = <p className="currentUser pull-right col-xs-10">{props.selfName}: {props.eachMessage.message}</p>
  } else {
    message = <p className="notCurrentUser pull-left col-xs-10">{props.friendName}: {props.eachMessage.message}</p>
  }

  return(
    <li>
      {message}
    </li>
  )
}

module.exports = MessageEntry;

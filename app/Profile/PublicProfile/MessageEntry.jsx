import React from 'react';

const MessageEntry = (props) => {
  var classes = props.self === props.eachMessage.user_id ? 'currentUser pull-right col-xs-8' : 'notCurrentUser pull-left col-xs-8';

  var who = props.eachMessage.user_id;
  // var friendFirstName = props.friendName.split(' ')[0]

  return(
    <div>
      {who === props.self ? <p className={classes}>{props.selfName}: {props.eachMessage.message}</p> : <p className={classes}>{props.friendName}: {props.eachMessage.message}</p>}
    </div>
  )
}

module.exports = MessageEntry;

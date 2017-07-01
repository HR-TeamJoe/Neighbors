import React from 'react';
import io from 'socket.io-client';
import MessageEntry from './MessageEntry.jsx';
var socket; 

class Messages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      message: ''
    }
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount(){
    socket = io.connect();
    const newProps = this.props;
    
    socket.on('connect', function(){ 
      socket.emit('findRoom', 
        {self: newProps.self, friend: newProps.friend, fullName: newProps.allProps.profile.fullName}
      )
    })

    socket.on('server:message', 
      (messages) => {
        console.log('+++server:message: ', messages)
        this.setState({
          messages
      })
    })

    socket.on('server:new message',
      (msg) => {
        var newMessage = this.state.messages;
        newMessage.push(msg);
        this.setState({
          messages: newMessage
        })
      }
    )

    socket.on('entered', (name) => {
      var enteredPerson = `${name} has entered the room!`;
      var enteredMessage = {
        message: enteredPerson,
        user_id: 999999
      }
      var enteredRoom = this.state.messages;
      enteredRoom.push(enteredMessage);
      this.setState({
        messages: enteredRoom
      })
    })

    socket.on('disconnected', (name) => {
      var disconnectedPerson = `${name} has left the room!`;
      var disconnectedMessage = {
        message: disconnectedPerson,
        user_id: 999999
      }
      var disconnectedRoom = this.state.messages;
      disconnectedRoom.push(disconnectedMessage);
      this.setState({
        messages: disconnectedRoom
      })
    })

  }

  setMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  sendMessage(e) {
    e.preventDefault();
    var eachMessage = {
      message: this.state.message,
      user_id: this.props.self,
      friend: this.props.friend
    }

    socket.emit('new message', eachMessage);

    this.setState({
      message: ''
    })
  }

  render(){
    return (
      <div className='messageBox'>
        
        
          <ul className="msgUl">
            {this.state.messages.map((eachMessage, idx) => 
              <MessageEntry key={idx} eachMessage={eachMessage} self={this.props.self} friend={this.props.friend} selfName={this.props.allProps.profile.firstName} friendName={this.props.friendName}/>
            )}
          </ul>
          
          <form className="row msgContainer" onSubmit={(e) => this.sendMessage(e)}>
            <div className="col-xs-8">
              <input className="msgInput" type="text" onChange={this.setMessage} value={this.state.message}/>
            </div>
            <button className="col-xs-4 msgSubmit" type="submit">Send</button>
          </form>
        
      </div>
    )
  }
}

module.exports = Messages;
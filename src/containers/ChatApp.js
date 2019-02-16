import React, { Component } from 'react';
import { Input, Button } from 'antd';
import ChatList from '../components/ChatList';

// Firebase App is always required and must be first
var firebase = require("firebase/app");

// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");

const config = {
  apiKey: "AIzaSyA2HhXJhIyPQmL6ojv6URjVCrOjzMCWTz0",
  authDomain: "chat-app-5dc9a.firebaseapp.com",
  databaseURL: "https://chat-app-5dc9a.firebaseio.com",
  projectId: "chat-app-5dc9a",
  storageBucket: "chat-app-5dc9a.appspot.com",
  messagingSenderId: "423447585784"
}

class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      data: [],
    }
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.loadMessages()
  }

  deleteMessage = (id) => {
    this.setState({data: this.state.data.filter(m=>m.id !== id)})
  }

  addMessage = (message) => {
    const data = this.state.data.find(m=>m.id === message.id) ? this.state.data : [...this.state.data, message]
    this.setState({
      data,
    })
  }

  loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore().collection('messages').where('chat','==','test').orderBy('timestamp', 'desc').limit(12);

    // Start listening to the query.
    query.onSnapshot((snapshot) => {
      for (let change of snapshot.docChanges()) {
        const message = change.doc.data();
        change.type === 'removed' ? 
          this.deleteMessage(change.doc.id)
        :
          this.addMessage({id: change.doc.id, ...message})
          console.log(message.timestamp)
      }
    });
  }

  saveMessage = async () => {

    // Add a new message entry to the Firebase database.
    let message = await firebase.firestore().collection('messages').add({
      name: 'username',
      text: this.state.message,
      profilePicUrl: 'profile',
      chat: 'test',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    })
    console.log(message)
  }

  render() {
    return(
      <div className="stkd-widget" style={{background: '#fff'}}>
        <div className="flex">
          <div className="chat-list" style={{width: 350}}>
            <ChatList
              data={this.state.data}
            />
          </div>
          <Input value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} />
          <Button onClick={this.saveMessage} type="primary">Send</Button>
        </div>
      </div>
    )
  }
}

export default ChatApp
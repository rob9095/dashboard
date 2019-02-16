import React, { Component } from 'react';
import { Input, Button } from 'antd'

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
    firebase.initializeApp(config)
  }

  deleteMessage = (id) => {
    this.setState({data: this.state.data.filter(m=>m.id !== id)})
  }

  loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore().collection('messages').orderBy('timestamp', 'desc').limit(12);

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === 'removed') {
          this.deleteMessage(change.doc.id);
        } else {
          var message = change.doc.data();
          this.displayMessage(change.doc.id, message.timestamp, message.name,
            message.text, message.profilePicUrl, message.imageUrl);
        }
      });
    });
  }

  saveMessage = () => {
    // Add a new message entry to the Firebase database.
    return firebase.firestore().collection('messages').add({
      name: 'username',
      text: this.state.message,
      profilePicUrl: 'profile',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  }

  render() {
    return(
      <div className="stkd-widget" style={{background: '#fff'}}>
        <Input value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} />
        <Button onClick={this.saveMessage} type="primary">Send</Button>
      </div>
    )
  }
}

export default ChatApp
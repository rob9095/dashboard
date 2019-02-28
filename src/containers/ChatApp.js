import React, { Component } from 'react';
import { Input, Button } from 'antd';
import ChatList from '../components/ChatList';
import ChatMessageList from '../components/ChatMessageList';
import mockData from '../data/mockData'

// Firebase App is always required and must be first
// var firebase = require("firebase/app");
//
// // Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");
//
// const config = {
//   apiKey: "AIzaSyA2HhXJhIyPQmL6ojv6URjVCrOjzMCWTz0",
//   authDomain: "chat-app-5dc9a.firebaseapp.com",
//   databaseURL: "https://chat-app-5dc9a.firebaseio.com",
//   projectId: "chat-app-5dc9a",
//   storageBucket: "chat-app-5dc9a.appspot.com",
//   messagingSenderId: "423447585784"
// }

class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      users: this.addAvatars(mockData.userData),
      chats: this.addAvatars(mockData.chatData),
      messages: this.addAvatars(mockData.messageData),
    }
  }

  addAvatars = (array) => {
    return array.map(val=>{
      const randNum = (Math.floor(Math.random() * 60)).toFixed(0)
      const gender =  randNum > 30 ? 'women' : 'men'
      return ({
        ...val,
        avatar: `https://randomuser.me/api/portraits/${gender}/${randNum}.jpg`,
      })
    })
  }

  componentDidMount() {
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(config);
    // }
    // this.loadMessages()
    // this.loadChats()
  }

  // deleteChat = (id) => {
  //   this.setState({chats: this.state.chats.filter(c=>c.id !== id)})
  // }
  //
  // addChat = (chat) => {
  //   const chats = this.state.chats.find(c=>c.id === chat.id) ? this.state.chats : [...this.state.chats, chat]
  //   this.setState({
  //     chats,
  //   })
  // }
  //
  // deleteMessage = (id) => {
  //   this.setState({data: this.state.data.filter(m=>m.id !== id)})
  // }
  //
  // addMessage = (message) => {
  //   const data = this.state.data.find(m=>m.id === message.id) ? this.state.data : [...this.state.data, message]
  //   this.setState({
  //     data,
  //   })
  // }
  //
  // loadMessages() {
  //   // Create the query to load the last 12 messages and listen for new ones.
  //   var query = firebase.firestore().collection('messages').where('chat','==','test').orderBy('timestamp', 'desc').limit(12);
  //
  //   // Start listening to the query.
  //   query.onSnapshot((snapshot) => {
  //     for (let change of snapshot.docChanges()) {
  //       const message = change.doc.data();
  //       change.type === 'removed' ?
  //         this.deleteMessage(change.doc.id)
  //       :
  //         this.addMessage({id: change.doc.id, ...message})
  //         console.log(message.timestamp)
  //     }
  //   });
  // }
  //
  // saveMessage = async () => {
  //
  //   // Add a new message entry to the Firebase database.
  //   let message = await firebase.firestore().collection('messages').add({
  //     name: 'username',
  //     text: this.state.message,
  //     profilePicUrl: 'profile',
  //     chat: 'test',
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   }).catch(function (error) {
  //     console.error('Error writing new message to Firebase Database', error);
  //   })
  //   console.log(message)
  // }
  //
  // loadChats = async () => {
  //   // Create the query to load the last 12 messages and listen for new ones.
  //   var userChats = await firebase.firestore().collection('chatUsers').where('userId','==','T1f5WToDe9zyiopOv4kg').get();
  //   let chatsQuery = await firebase.firestore().collection('chat')
  //   for (let chat of userChats.docs) {
  //     chatsQuery.where('id','==',chat.data().chatId)
  //     console.log(chatsQuery.docs)
  //   }
  //   // Start listening to the query.
  //   chatsQuery.onSnapshot((snapshot) => {
  //     for (let change of snapshot.docChanges()) {
  //       const chat = change.doc.data();
  //       change.type === 'removed' ?
  //         this.deleteChat(change.doc.id)
  //       :
  //         this.addChat({id: change.doc.id, ...chat})
  //         console.log(chat.timestamp)
  //     }
  //   });
  // }
  //
  // createChat = async () => {
  //   const db = firebase.firestore();
  //   let chatUsers = ['T1f5WToDe9zyiopOv4kg','WWIdCXSQLWIAydEM8n51'],
  //   chat = {
  //     name: 'second chat',
  //     message: 'Lorum Ipsum don itis lupis ist',
  //     userId: 'WWIdCXSQLWIAydEM8n51',
  //     firstName: 'Lantis',
  //     lastName: 'Ipsum',
  //     avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  //   }
  //   const createdChat = await db.collection('chat').add(chat)
  //   if (!createdChat.id) {
  //     console.log(createdChat)
  //     return
  //   }
  //
  //   chatUsers = chatUsers.map(userId=>({userId, chatId: createdChat.id}))
  //
  //   // Get a new write batch
  //   let batch = db.batch();
  //
  //   for (let cu of chatUsers) {
  //     let cuRef = db.collection('chatUsers').doc()
  //     batch.set(cuRef, cu)
  //   }
  //
  //   batch.commit()
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  //
  // }

  render() {
    return(
      <div className="flex" style={{height: '100%', width: '100%'}}>
        <div className="chat-app flex stkd-widget stkd-content" style={{padding: 0, width: '100%'}}>
          <div className="chat-list" style={{ width: '60%' }}>
            <ChatList
              data={this.state.chats}
            />
          </div>
          <div>
            {/* <Input value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} />
            <Button onClick={this.saveMessage} type="primary">Send</Button>
            <Button onClick={this.createChat} type="primary">create chat!</Button> */}
          </div>
          <div className="chat-message-list" style={{ width: '100%' }}>
            <ChatMessageList
              data={this.state.messages.filter((m, i) => i <= 8).map((m, i) => i % 2 ? { ...m, isUserMessage: true } : m)}
              currentChat={this.state.chats[0]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatApp

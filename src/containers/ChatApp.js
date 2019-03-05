import React, { Component } from 'react';
import { Input, Button, Modal } from 'antd';
import ChatList from '../components/ChatList';
import ChatMessageList from '../components/ChatMessageList';
import mockData from '../data/mockData';
import ModalForm from '../components/ModalForm';

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
      Users: [],
      Chats: [],
      messages: this.addAvatars(mockData.messageData),
      currentUser: {},
      chatListPagination: {
        currentPage: 1,
        pageSize: 1,
      },
      currentChatPagination: {
        page: 1,
        pageSize: 12,
      },
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

  listenForDocs = async (queryConfig) => {
    const { colName, where, orderBy, limit, lastDoc } = queryConfig
    // Create the query
    let query = await this.db.collection(colName)
    query = where ? query.where(where.field, where.op, where.value) : query
    query = orderBy ? query.orderBy(orderBy.field, orderBy.dir) : query
    query = limit ? query.limit(limit) : query
    query = lastDoc ? query.startAfter(lastDoc) : query
  
    // Start listening to the query and update state on changes
    query.onSnapshot((snapshot) => {
      for (let change of snapshot.docChanges()) {
        let docData = {
          ...change.doc.data(),
          id: change.doc.id,
        };
        change.type === 'removed' ?
          this.setState({[colName]: this.state[colName].fitler(doc=>doc.id !== docData.id)})
        :
          this.setState({[colName]: this.state[colName].find(doc=>doc.id===docData.id) ? this.state[colName] : [...this.state[colName], docData]})
      }
    });
  }

  getDocs = async (queryConfig) => {
    const { colName, where, orderBy, limit } = queryConfig;
    const { lastDoc } = this.state;
    console.log(queryConfig)
    // Create the query
    let query = this.db.collection(colName)
    query = where ? query.where(where.field,where.op,where.value) : query
    query = orderBy ? query.orderBy(orderBy.field, orderBy.dir) : query
    query = limit ? query.limit(limit) : query
    query = lastDoc ? query.startAfter(lastDoc.timestamp) : query

    query.get()
    .then(snapShot=>{
      let queryData = snapShot.docs.map(doc=>({...doc.data(), id: doc.id}))
      let nextQuery = 
      console.log(queryData)
      this.setState({[colName]: queryData, lastDoc: queryData[queryData.length-1]})
    })
    .catch(err=>{
      console.log('error getting data', err)
    })
  }

  fetchCurrentUser = () => {
    // userId for demo
    const id = '0MlxyJuIWB7SRfdfNnAp'
    this.db.collection('Users').doc(id).get()
    .then(doc=>{
      doc.exists ? this.setState({currentUser: {...doc.data(), id}}) : console.log('user not found')
    })
    .catch(err=>{
      console.log('error', err)
    })
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.db = firebase.firestore()
    this.fetchCurrentUser()
    this.getDocs({colName: 'Users'})
    this.getDocs({ colName: 'Chats', limit: 3, orderBy: { field: 'timestamp', dir: 'desc' }})
    //this.listenForDocs({colName:'Chats',orderBy:{field:'timestamp',dir: 'desc'}})
    //this.loadMessages()
    //this.loadChats()
  }

  deleteChat = (id) => {
    this.setState({chats: this.state.chats.filter(c=>c.id !== id)})
  }
  
  addChat = (chat) => {
    const chats = this.state.chats.find(c=>c.id === chat.id) ? this.state.chats : [...this.state.chats, chat]
    this.setState({
      chats,
    })
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
  
  loadChats = async () => {
    // Create the query to load the last 12 messages and listen for new ones.
    var userChats = await firebase.firestore().collection('chatUsers').where('userId','==','T1f5WToDe9zyiopOv4kg').get();
    let chatsQuery = await firebase.firestore().collection('chat')
    for (let chat of userChats.docs) {
      chatsQuery.where('id','==',chat.data().chatId)
      console.log(chatsQuery.docs)
    }
    // Start listening to the query.
    chatsQuery.onSnapshot((snapshot) => {
      for (let change of snapshot.docChanges()) {
        const chat = change.doc.data();
        change.type === 'removed' ?
          this.deleteChat(change.doc.id)
        :
          this.addChat({id: change.doc.id, ...chat})
          console.log(chat.timestamp)
      }
    });
  }
  
  createChat = (data) => {
    return new Promise(async (resolve,reject) => {
      const { title, user, message } = data
      let chat = {
        title,
        message,
        invitedUserAvatar: user.avatar,
        invitedUserId: user.id,
        currentUserId: this.state.currentUser.id,
        invitedUsername: user.name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }
      await this.db.collection('Chats').add(chat)
      .then(res=>{
        console.log('chat created')
        resolve({text:'Chat Created',status:'success'})
      })
      .catch(err=>{
        console.log('err creating chat')
        console.log(err)
        reject({text:'Unable to Create Chat', status: 'error'})
      })
    })
  
  }

  createUsers = () => {
    const db = firebase.firestore()
    const users = this.state.users.map(u=>{ delete u.id; return u})
    console.log(users)
    // Get a new write batch
    let batch = db.batch();

    for (let user of users) {
      let userRef = db.collection('Users').doc()
      batch.set(userRef, user)
    }
  
    batch.commit()
    .then((res) => {
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
      
  }

  handleLoadMore = (colName, queryConfig) => {
    queryConfig = {
      ...queryConfig,
      colName,
    }
  }

  render() {
    return(
      <div className="flex" style={{height: '100%', width: '100%'}}>
        {this.state.showNewChatModal && (
          <ModalForm
            title={'Create Chat'}
            inputs={[
              {span: 24, id: 'user', text: 'User', required: true, autoComplete: true, autoCompleteData: this.state.Users.map(u=>({id: u.id, avatar: u.avatar, name: u.firstName + " " + u.lastName})), searchKey: 'name', message: 'Choose a user'},
              {span: 24, id: 'title', text: 'Title', required: true, message: 'Choose a title'},
              {span: 24, id: 'message', text: 'Message', required: true, message: 'Type a message', type: 'textarea'},
              ,
            ]}
            okText={'Send Message'}
            cancelText={'Cancel'}
            onClose={()=>this.setState({showNewChatModal: false})}
            onSave={this.createChat}
          />
        )}
        <Button onClick={this.createUsers}>Create Users</Button>
        <Button onClick={()=>this.setState({showNewChatModal: true})}>New Chat</Button>
        <div className="chat-app flex stkd-widget stkd-content" style={{padding: 0, width: '100%'}}>
          <div className="chat-list" style={{ width: '60%' }}>
            <ChatList
              data={this.state.Chats}
              onLoadMore={this.getDocs}
              currentPage={this.state.chatListPagination.currentPage}
              hasMore={true}
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
              currentChat={mockData.chatData[0]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatApp

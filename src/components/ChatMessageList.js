import React, { Component } from 'react';
import { List, Icon, Avatar, Button } from "antd";
import theme from "../theme";
const Color = require('color');
const moment = require("moment");

const styles = {
  userMessage: {
    borderRadius: '10px 10px 0px 10px',
    background: theme.colors.main,
    color: '#fff'
  }
}

class ChatMessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleSearch = (e) => {
    const val = e.target.value.toLowerCase()
    this.setState({
      searchVal: val,
      searchData: this.props.data.filter(item=>(
        item.message.toLowerCase().includes(val) ||
        item.firstName.toLowerCase().includes(val) ||
        item.lastName.toLowerCase().includes(val) ||
        item.name && item.name.toLowerCase().includes(val)
      ))
    })
  }

  clearSearch = () => {
    this.setState({
      searchVal: '',
    })
    this.searchInput.focus()
  }

  handleMessageItemClick = (id) => {
    console.log(id)
  }

  render() {
    const currentChat = this.props.currentChat ? this.props.currentChat : {}
    return (
      <div
        className="message-list-wrapper flex flex-col"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="flex space-between align-items-center half-pad" style={{ background: '#fff', borderBottom: '2px solid #eff2f7', height: 104}}>
          <div className="flex">
            <div className="flex align-items-center justify-content-center" style={{marginRight: 15}}>
              {currentChat.avatar ?
                <Avatar style={{height: 45, width: 45}} src={currentChat.avatar} />
                :
                <Avatar
                  style={{
                    background: currentChat.color,
                    height: 45,
                    width: 45,
                  }}
                >
                  {currentChat.firstName[0]}
                </Avatar>
              }              
            </div>
            <div className="flex flex-col">
              <h2 className="no-margin">{currentChat.name}</h2>
              <h4 className="no-margin">{`From: ${currentChat.firstName + " " + currentChat.lastName}`}</h4>            
            </div>
          </div>
          <div>
            <Button className="menu-btn no-border">
              <Icon type="search" />
            </Button>
            <Button className="menu-btn no-border">
              <Icon type="ellipsis" className="rotate-90" />
            </Button>
          </div>
        </div>
        <List
          className="contain"
          size="large"
          style={{ height: '100%', padding: '0px 12px',}}
          dataSource={this.state.searchVal ? this.state.searchData : this.props.data}
          renderItem={item => {
            const itemSelected = item.id === currentChat.id || this.state.hoverId === item.id ? true : false
            return (
              <List.Item
                onMouseEnter={()=>this.setState({hoverId: item.id})}
                onMouseLeave={() => this.setState({ hoverId: null })}
                onClick={() => this.handleMessageItemClick(item.id)}
                key={item.id}
                className={item.unread ? 'unread' : null}
                style={itemSelected ? styles.itemSelected : null}
              >
                <div className="message-wrapper flex" style={item.isUserMessage ? {flexDirection: 'row-reverse', width: '100%'} : {width: '100%'}}>
                  <div className="message-avatar flex">
                    {item.avatar ?
                      <Avatar src={item.avatar} />
                      :
                      <Avatar
                        style={{
                          background: item.color,
                        }}
                      >
                        {item.firstName[0]}
                      </Avatar>
                    }
                  </div>
                  <div className="message-content" style={item.isUserMessage ? styles.userMessage : null}>
                    {item.text}
                    <div className="message-timestamp" style={item.isUserMessage ? {color: '#fff'} : null}>
                      {moment(item.timestamp).fromNow()}
                    </div>
                  </div>
                </div>
              </List.Item>
            )
          }}
        />
        <div className="chat-reply flex flex-col half-pad" style={{ minHeight: 180, borderTop: '2px solid #eff2f7'}}>
          <textarea className="half-pad" style={{position: 'relative',background: '#eff2f7', border: '1px solid #eff2f7', marginTop: 12}} placeholder="Type a Message..." />
          <div className="flex" style={{justifyContent: 'flex-end', marginTop: 24}}>
            <Button type="primary" style={{fontWeight: 'bold',height: 35}}>Send</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatMessageList

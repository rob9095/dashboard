import React, { Component } from 'react';
import { List, Icon, Avatar, Input, Tooltip, Button } from "antd";
import theme from "../theme";
const Color = require('color');
const moment = require("moment");

const styles = {
  itemSelected: {
    background: theme.colors.main,
  },
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
        <div className="message-search flex space-between half-pad" style={{background: '#fff'}}>
          <div>
            <h2>{currentChat.name}</h2>
            <h4>
              <span>From: </span>{currentChat.firstName + " "+ currentChat.lastName}
            </h4>
          </div>
          <div>
            <Button className="menu-btn">
              <Icon type="menu" style={{fontSize: 18,color: '#a7a8b8'}} />
            </Button>
          </div>
        </div>
        <List
          className="contain"
          size="large"
          style={{height: '100%'}}
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
                <div className="message-avatar">
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
                <div className="message-content">
                  {item.text}
                </div>
              </List.Item>
            )
          }}
        />
      </div>
    )
  }
}

export default ChatMessageList

import React, { Component } from 'react';
import { List, Icon, Avatar, Input, Tooltip, Button } from "antd";
import theme from "../theme";
const Color = require('color');
const moment = require("moment");

const styles = {
  itemSelected: {
    borderLeft: `4px solid ${theme.colors.main}`,
  },
}

class ChatList extends Component {
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

  handleChatItemClick = (id) => {
    console.log(id)
  }

  render() {
    const chatItem = this.props.chatItem ? this.props.chatItem : {}
    return (
      <div
        className="chat-list-wrapper flex flex-col"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="chat-search flex space-between half-pad" style={{background: '#fff'}}>
          <div style={{paddingRight: 10, width: '100%'}}>
            <Input
              suffix={this.state.searchVal ? <Icon className="search-close" style={{color: 'red', fontSize: 16}} type="close-circle" onClick={this.clearSearch} /> : <Icon type="search" style={{color: '#a7a8b8', fontSize: 18}} />}
              placeholder={"Search"}
              value={this.state.searchVal}
              onChange={this.handleSearch}
              ref={node=>this.searchInput = node}
              style={{color: '#a7a8b8',}}
            />
          </div>
          <div>
            <Button className="menu-btn">
              <Icon type="menu" style={{fontSize: 18,color: '#a7a8b8'}} />
            </Button>
          </div>
        </div>
        <List
          className="contain"
          itemLayout="vertical"
          size="large"
          style={{height: '100%', padding: '0px 12px'}}
          dataSource={this.state.searchVal ? this.state.searchData : this.props.data}
          renderItem={item => {
            const itemSelected = item.id === chatItem.id || this.state.hoverId === item.id ? true : false
            return (
              <List.Item
                onMouseEnter={()=>this.setState({hoverId: item.id})}
                onMouseLeave={() => this.setState({ hoverId: null })}
                onClick={() => this.handleChatItemClick(item.id)}
                key={item.id}
                className={item.isUserMessage ? 'chat-message user-message' : 'chat-message'}
                style={itemSelected ? styles.itemSelected : null}
              >
                <List.Item.Meta
                  style={{alignItems: 'center'}}
                  className="flex"
                  avatar={item.avatar ?
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
                  title={
                    <div className="chat-title flex align-items-center">
                      <span className="chat-author flex align-items-center">
                        {/* {item.unread && (
                          <Icon type="mail" twoToneColor={theme.colors.main} theme="twoTone" style={{ marginRight: 5, fontSize: 12, }} />
                        )} */}
                        <span>{item.firstName +" "+ item.lastName}</span>
                      </span>
                      <span className="chat-timestamp">
                        {moment(item.timestamp).format("ddd, hA")}
                      </span>
                    </div>
                  }
                />
                <div className="flex flex-col">
                  {item.name && <h4 style={{textTransform: 'capitalize'}}>{item.name}</h4>}
                  <div>
                    {item.message}
                  </div>
                </div>
              </List.Item>
            )
          }}
        />
      </div>
    )
  }
}

export default ChatList

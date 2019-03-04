import React, { Component } from 'react';
import { List, Icon, Avatar, Input, Button } from "antd";
import theme from "../theme";
const moment = require("moment");

const styles = {
  itemSelected: {
    borderLeft: `4px solid ${theme.colors.main}`,
    background: 'rgba(0, 0, 0, 0.03)',
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
        item.invitedUsername.toLowerCase().includes(val) ||
        item.title.toLowerCase().includes(val)
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
    const chatItem = this.props.chatItem || {}
    return (
      <div
        className="chat-list-wrapper flex flex-col"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="flex flex-col half-pad" style={{ background: '#fff', borderBottom: '1px solid #e8e8e8' }}>
          <div className="chat-header flex space-between align-items-center">
            <div className="chat-search" style={{ width: '100%' }}>
              <Input
                suffix={this.state.searchVal ? <Icon className="search-close" style={{ color: 'red' }} type="close-circle" onClick={this.clearSearch} /> : null}
                prefix={<Icon type="search" />}
                placeholder={"Search"}
                value={this.state.searchVal}
                onChange={this.handleSearch}
                ref={node => this.searchInput = node}
              />
            </div>
            <div>
              <Button className="menu-btn no-border">
                <Icon type="menu" />
              </Button>
            </div>
          </div>
        </div>
        <List
          className="contain"
          itemLayout="vertical"
          size="large"
          style={{height: '100%'}}
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
                  avatar={item.invitedUserAvatar ?
                    <Avatar src={item.invitedUserAvatar} />
                    :
                    <Avatar
                      style={{
                        background: item.color,
                      }}
                    >
                      {item.invitedUsername[0]}
                    </Avatar>
                  }
                  title={
                    <div className="chat-title flex align-items-center space-between">
                      <span className="chat-author flex align-items-center">
                        {/* {item.unread && (
                          <Icon type="mail" twoToneColor={theme.colors.main} theme="twoTone" style={{ marginRight: 5, fontSize: 12, }} />
                        )} */}
                        <span>{item.invitedUsername}</span>
                      </span>
                      <span className="chat-timestamp">
                        {moment(item.timestamp.toDate()).fromNow()}
                      </span>
                    </div>
                  }
                />
                <div className="flex flex-col">
                  {item.title && <h4 style={{textTransform: 'capitalize'}}>{item.invitedUsername}</h4>}
                  <div>
                    {item.message}
                  </div>
                </div>
              </List.Item>
            )
          }}
        >
          <div className="bottom justify-flex-end full-pad" style={{position: 'sticky', float: 'right', marginTop: -88}}>
            <Button type="primary" icon="plus" style={{height: 40, width: 40}} />
          </div>
        </List>
      </div>
    )
  }
}

export default ChatList

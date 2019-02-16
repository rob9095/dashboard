import React, { Component } from 'react';
import { List, Icon, Avatar, Input, Tooltip } from "antd";
import theme from "../theme";
const Color = require('color');
const moment = require("moment");

const IconText = ({ type, text }) => (
  <span className="mail-attachment">
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const styles = {
  itemSelected: {
    background: 'rgba(0, 0, 0, .03)',
    borderLeft: `3px solid ${theme.colors.main}`
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
        item.text.toLowerCase().includes(val) ||
        item.name.toLowerCase().includes(val)
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
        className="mail-list-wrapper flex flex-col"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="mail-search">
          <Input
            prefix={(<Icon type="search" />)}
            suffix={this.state.searchVal ? <Icon className="search-close" type="close-circle" onClick={this.clearSearch} /> : null}
            placeholder={"Search"}
            value={this.state.searchVal}
            onChange={this.handleSearch}
            ref={node=>this.searchInput = node}
          />
        </div>
        <List
          className="contain"
          itemLayout="vertical"
          size="large"
          style={{height: '100%'}}
          dataSource={this.state.searchVal ? this.state.searchData : this.props.data}
          renderItem={item => {
            return (
              <List.Item
                onMouseEnter={()=>this.setState({hoverId: item.id})}
                onMouseLeave={() => this.setState({ hoverId: null })}
                onClick={() => this.handleChatItemClick(item.id)}
                key={item.id}
                className={item.unread ? 'unread' : null}
                style={item.id === chatItem.id || this.state.hoverId === item.id ? styles.itemSelected : null}
              >
                <List.Item.Meta
                  avatar={item.avatar ?
                    <Avatar src={item.avatar} />
                    :
                    <Avatar
                      style={{
                        background: item.color,
                      }}
                    >
                      {item.name[0]}
                    </Avatar>
                  }
                  title={
                    <div className="chat-title flex align-items-center">
                      <span className="chat-author flex align-items-center">
                        {/* {item.unread && (
                          <Icon type="mail" twoToneColor={theme.colors.main} theme="twoTone" style={{ marginRight: 5, fontSize: 12, }} />
                        )} */}
                        <span>{item.name}</span>
                      </span>
                      <span className="chat-timestamp">
                        {/* moment(item.timestamp.toDate()).format("ddd, hA") */}
                      </span>
                    </div>
                  }
                />
                {item.text}
              </List.Item>
            )
          }}
        />
      </div>
    )
  }
}

export default ChatList

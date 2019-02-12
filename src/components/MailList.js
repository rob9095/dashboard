import React, { Component } from 'react';
import { List, Icon, Avatar, Input } from "antd";
import IconDropDown from "../components/IconDropDown";
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
    background: Color(theme.colors.main).fade(.9).string()
  },
  itemHover: {
    background: Color(theme.colors.main).alpha(.1).fade(.5).string(),
  },
}

class MailList extends Component {
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
        item.content.toLowerCase().includes(val) ||
        item.subject.toLowerCase().includes(val) ||
        item.first_name.toLowerCase().includes(val) ||
        item.last_name.toLowerCase().includes(val) ||
        item.email_address.toLowerCase().includes(val)
      ))
    })
  }

  clearSearch = () => {
    this.setState({
      searchVal: '',
    })
    this.searchInput.focus()
  }

  handleMailItemClick = async (id) => {
    console.log('click from menuItem')
    await this.props.onMailUpdate(id,'unread',false)
    this.props.onSetCurrentMail(id)
  }

  render() {
    return (
      <div
        className="mail-list-wrapper flex flex-col"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="mail-search">
          <Input
            prefix={(<Icon type="search" />)}
            suffix={this.state.searchVal ? <Icon className="search-close" type="close-circle" onClick={this.clearSearch} /> : null}
            placeholder="Search"
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
          renderItem={item => (
            <List.Item
              onClick={()=>this.handleMailItemClick(item.id)}
              key={item.id}
              className={item.unread ? 'unread' : null}
              style={this.props.mailItem && (item.id === this.props.mailItem.id ? styles.itemHover : null)}
              actions={
                item.attachments && (
                  item.attachments.map(a=>(
                    <IconText key={a.name + item.id} type="paper-clip" text={a.name} />
                  ))
                )}
              extra={
                <IconDropDown
                  icon={"ellipsis"}
                  iconTheme={"outlined"}
                  iconSize={"1.2rem"}
                  dropDownPlacement={"bottomRight"}
                  noBorder={true}
                  buttonStyles={{background:'transparent'}}
                  onSelect={(val) => this.props.onDropdownSelect(val, item.id)}
                  options={[
                    {
                      id: 1,
                      text: item.unread ? "Mark Read" : "Mark Unread",
                      icon: "eye",
                      iconTheme: null
                    },
                    {
                      id: 2,
                      text: "Reply",
                      icon: "arrow-left",
                      iconTheme: null
                    },
                    {
                      id: 3,
                      text: "Forward",
                      icon: "arrow-right",
                      iconTheme: null
                    },
                    {
                      id: 5,
                      text: "Move to",
                      icon: "folder-add",
                      iconTheme: null,
                      subMenuOptions: [
                        { id: 2, text: "Important", icon: "star" },
                        { id: 3, text: "Spam", icon: "warning" }
                      ]
                    },
                    {
                      id: 6,
                      text: "Label as",
                      icon: "plus-circle",
                      iconTheme: null,
                      subMenuOptions: this.props.labelList
                    },
                    {
                      id: 7,
                      text: "Delete",
                      icon: "delete",
                      iconTheme: null
                    }
                  ]}
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <div className="mail-title">
                    <span className="mail-author">
                      {`${item.first_name} ${item.last_name}`}
                    </span>
                    <span className="mail-date">
                      {moment(new Date(item.date)).format("ddd, hA")}
                    </span>
                  </div>
                }
                description={
                  <div className="mail-subject">
                    <h5>{item.subject}</h5>
                  </div>
                }
              />
              {item.content}
                {/* .split(" ")
                .filter((w, i) => i <= 25)
                .map((w, i, a) =>
                  i === a.length - 1 ? w + "..." : w + " "
                )} */}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default MailList
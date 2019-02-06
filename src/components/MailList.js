import React, { Component } from 'react';
import { List, Icon, Avatar, Input } from "antd";
import IconDropDown from "../components/IconDropDown";
const moment = require("moment");

const IconText = ({ type, text }) => (
  <span className="mail-attachment">
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

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

  render() {
    return (
      <div
        className="mail-list-wrapper flex flex-col"
        style={{ height: "100%" }}
      >
        <div className="mail-search">
          <Input
            prefix={<Icon type="search" />}
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
          dataSource={this.state.searchVal ? this.state.searchData : this.props.data}
          renderItem={item => (
            <List.Item
              key={item.id}
              className={item.unread ? 'unread' : null}
              actions={
                item.file_name && [
                  <IconText type="paper-clip" text={item.file_name} />
                ]
              }
              extra={
                <IconDropDown
                  icon={"ellipsis"}
                  iconTheme={"outlined"}
                  iconSize={"1.2rem"}
                  dropDownPlacement={"bottomRight"}
                  noBorder={true}
                  backgroundColor={'transparent'}
                  options={[
                    {
                      id: 1,
                      text: "Reply",
                      icon: null,
                      iconTheme: null
                    },
                    {
                      id: 2,
                      text: "Foward",
                      icon: null,
                      iconTheme: null
                    },
                    {
                      id: 3,
                      text: "Delete",
                      icon: null,
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
              {item.content
                .split(" ")
                .filter((w, i) => i <= 15)
                .map((w, i, a) =>
                  i === a.length - 1 ? w + "..." : w + " "
                )}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default MailList
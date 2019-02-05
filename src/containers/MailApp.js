import React, { Component } from 'react';
import { Row, Col, Button, Menu, List, Icon, Avatar, Input } from 'antd';
import IconDropDown from '../components/IconDropDown';
import theme from '../theme';
import mockData from '../data/mockData';

const moment = require("moment");

const IconText = ({ type, text }) => (
  <span className="mail-attachment">
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class MailApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navList: [{id:1,text:'Inbox',icon: 'inbox',unread: 4},{id:2,text:'Drafts',icon:'edit'},{id:3,text:'Important',icon: 'flag',unread: 10},{id:4,text:'Sent',icon:'export'},{id:5,text:'Deleted',icon:'delete'}],
      labelList: [{id:6,text:'Personal',color: theme.colors.main,unread: 14},{id:7,text:'Family',color:theme.colors.purple, unread: 18},{id:8,text:'Friends',color:theme.colors.orange,unread: 10},{id:9,text:'Work',color:theme.colors.green,unread: 21},],
    }
  }
  render() {
    return (
      <div
        className="stkd-content stkd-widget mail-app"
        style={{ height: "calc(100vh - 170px)" }}
      >
        <Row
          gutter={0}
          style={{ border: "2px solid #eee", height: "100%" }}
          type="flex"
        >
          <Col
            className="mail-nav"
            xs={24}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ border: "2px solid #eee" }}
          >
            <div className="mail-nav-wrapper flex flex-col justify-content-center full-pad">
              <div
                className="flex align-items-center justify-content-center"
                style={{ padding: "0px 14px 14px 14px" }}
              >
                <Button block type="primary" size="large">
                  New Message
                </Button>
              </div>
              <div>
                <Menu style={{ border: "none" }}>
                  {this.state.navList.map(item => (
                    <Menu.Item key={item.id} className="menu-item">
                      <Icon type={item.icon} />
                      {item.text}
                      <span className="unread">{item.unread}</span>
                    </Menu.Item>
                  ))}
                  <Menu.ItemGroup
                    title={
                      <div
                        className="flex align-items-center space-between"
                        style={{
                          padding: "0px 0px 0px 16px",
                          fontSize: 16
                        }}
                      >
                        <span>Labels</span>
                        <Button className="no-border">
                          <Icon type="plus" />
                        </Button>
                      </div>
                    }
                  />
                  {this.state.labelList.map(item => (
                    <Menu.Item className="menu-item" key={item.id}>
                      <div
                        style={{ borderColor: item.color }}
                        className="ant-timeline-item-head"
                      />
                      {item.text}
                      <span className="unread">{item.unread}</span>
                    </Menu.Item>
                  ))}
                </Menu>
              </div>
            </div>
          </Col>
          <Col
            className="mail-list"
            xs={24}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ border: "2px solid #eee" }}
          >
            <div className="mail-list-wrapper flex flex-col" style={{height: '100%'}}>
              <div className="mail-search">
                <Input
                  prefix={<Icon type="search" />}
                  placeholder={"Search"}
                />
              </div>
              <List
                className="contain"
                itemLayout="vertical"
                size="large"
                dataSource={mockData.mailData}
                renderItem={item => (
                  <List.Item
                    key={item.id}
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
                        options={[
                          {
                            id: 1,
                            text: "Last 7 Days",
                            icon: null,
                            iconTheme: null
                          },
                          {
                            id: 2,
                            text: "Last 2 Weeks",
                            icon: null,
                            iconTheme: null
                          },
                          {
                            id: 3,
                            text: "Last Month",
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
          </Col>
          <Col
            className="mail-content"
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            style={{ border: "2px solid #eee" }}
          >
            MAIL CONTENT
          </Col>
        </Row>
      </div>
    );
  }
}

export default MailApp
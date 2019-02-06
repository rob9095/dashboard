import React, { Component } from "react";
import { Row, Col, Button, Menu, Icon, Avatar, Tag } from "antd";
import theme from "../theme";
import mockData from "../data/mockData";
import IconDropDown from '../components/IconDropDown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faReplyAll,
  faAngleDown,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../components/MailList";

const ButtonGroup = Button.Group;
const moment = require("moment");

class MailApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: mockData.mailData,
      navList: [
        { id: 1, text: "Inbox", icon: "inbox", unread: 4 },
        { id: 2, text: "Drafts", icon: "save" },
        { id: 3, text: "Important", icon: "star", unread: 10 },
        { id: 4, text: "Sent", icon: "export" },
        { id: 5, text: "Spam", icon: "warning" },
        { id: 6, text: "Deleted", icon: "delete" }
      ],
      labelList: [
        { id: 7, text: "Personal", color: theme.colors.main, unread: 14 },
        { id: 8, text: "Family", color: theme.colors.purple, unread: 18 },
        { id: 9, text: "Friends", color: theme.colors.orange, unread: 10 },
        { id: 10, text: "Work", color: theme.colors.green, unread: 21 }
      ]
    };
  }
  render() {
    return (
      <div
        className="stkd-content stkd-widget mail-app"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <Row
          gutter={0}
          style={{ border: "2px solid #eee", height: "100%" }}
          type="flex"
        >
          <Col
            className="mail-nav"
            xs={24}
            sm={8}
            md={8}
            lg={8}
            xl={5}
            style={{ border: "2px solid #eee" }}
          >
            <div className="mail-nav-wrapper flex flex-col justify-content-center full-pad contain">
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
            sm={16}
            md={16}
            lg={16}
            xl={7}
            style={{ border: "2px solid #eee" }}
          >
            <MailList data={this.state.data} />
          </Col>
          <Col
            className="mail-content"
            xs={0}
            sm={0}
            md={0}
            lg={0}
            xl={12}
            style={{ border: "2px solid #eee" }}
          >
            <div className="mail-content half-pad">
              <div className="mail-content-header flex space-between align-items-center" style={{minHeight: 40}}>
                <div>
                  <ButtonGroup>
                    <Button>
                      <Icon type="star" />
                    </Button>
                    <Button>
                      <Icon type="warning" />
                    </Button>
                    <IconDropDown
                      icon={"folder-open"}
                      iconTheme={"outlined"}
                      iconSize={"16px"}
                      options={[
                        {
                          id: 5,
                          text: "Move to",
                          icon: 'retweet',
                          iconTheme: null,
                          subMenuOptions: [{ id: 1, text: 'Unread' }, { id: 2, text: 'Important' }, { id: 3, text: 'Spam' }],
                        },
                        {
                          id: 6,
                          text: "Label as",
                          icon: 'folder-add',
                          iconTheme: null,
                          subMenuOptions: this.state.labelList,
                        },
                      ]}
                    />
                  </ButtonGroup>
                </div>
                <Tag color={theme.colors.main}>Inbox</Tag>
                <div className="flex align-items-center">
                  {/* <ButtonGroup>
                    <Button>
                      <FontAwesomeIcon icon={faReply} />
                    </Button>
                    <Button>
                      <FontAwesomeIcon icon={faReplyAll} />
                    </Button>
                    <Button>
                      <FontAwesomeIcon icon={faLongArrowAltRight} />
                    </Button>
                    <Button>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </Button>
                  </ButtonGroup> */}
                  <ButtonGroup>
                    <Button>
                      <Icon type="left" />
                    </Button>
                    <Button>
                      <Icon type="right" />
                    </Button>
                    <IconDropDown
                      icon={"down"}
                      iconTheme={"outlined"}
                      iconSize={"16px"}
                      dropDownPlacement={"bottomRight"}
                      options={[
                        {
                          id: 1,
                          text: "Reply",
                          icon: 'vertical-right',
                          iconTheme: null
                        },
                        {
                          id: 2,
                          text: "Reply All",
                          icon: 'double-left',
                          iconTheme: null
                        },
                        {
                          id: 3,
                          text: "Foward",
                          icon: 'arrow-right',
                          iconTheme: null
                        },
                        {
                          id: 4,
                          text: "Print",
                          icon: 'printer',
                          iconTheme: null
                        },
                        {
                          id: 5,
                          text: "Save Draft",
                          icon: 'save',
                          iconTheme: null
                        },
                        {
                          id: 6,
                          text: "Delete",
                          icon: 'delete',
                          iconTheme: null
                        }
                      ]}
                    />
                  </ButtonGroup>
                </div>
              </div>
              <div className="flex align-items-center space-between" style={{marginTop: 10}}>
                <span style={{ fontSize: 12 }}>
                  {moment(new Date(mockData.mailData[0].date)).format(
                    "dddd, MMMM Do YYYY, h:mm A"
                  )}
                </span>
              </div>
              <div className="mail-from flex align-items-center">
                <div className="mail-from-avatar">
                  <Avatar src={mockData.mailData[0].avatar} />
                </div>
                <div className="half-pad">
                  <div className="mail-from-details flex flex-col">
                    <span className="mail-from-contact flex">
                      <h4>
                        {mockData.mailData[0].first_name +
                          " " +
                          mockData.mailData[0].last_name}
                      </h4>
                      <span style={{ marginLeft: 10 }}>
                        {"<"}
                        {mockData.mailData[0].email_address}
                        {">"}
                      </span>
                    </span>
                    <span className="mail-to-contact">
                      to
                      <strong> me </strong>
                      <FontAwesomeIcon size={"xs"} icon={faAngleDown} />
                    </span>
                  </div>
                </div>
              </div>
              <h1 style={{ textTransform: "capitalize" }}>
                {mockData.mailData[0].subject}
              </h1>
              <p
                style={{ margin: "24px 0px 34px 0px", lineHeight: "25px" }}
              >
                {mockData.mailData[0].content}
              </p>
              <div
                className="flex align-items-center"
                style={{
                  padding: "0px 10px 0px 10px",
                  borderRadius: 5,
                  border: "1px solid #d9d9d9",
                  maxWidth: "200px"
                }}
              >
                <div>
                  <Icon type="file-text" style={{ fontSize: "2rem" }} />
                </div>
                <div className="half-pad">
                  <div className="file-info flex flex-col">
                    <h4 className="file-name">filename.png</h4>
                    <span className="file-size" style={{ fontSize: 12 }}>
                      78 kb
                    </span>
                  </div>
                  <div
                    className="file-options"
                    style={{ marginTop: ".5em" }}
                  >
                  <Button className="no-border" style={{fontSize: "1rem", padding: 5,marginRight: 5}}>
                    <Icon
                      type="download"
                    />
                  </Button>
                  <Button className="no-border" style={{fontSize: "1rem", padding: 5,marginRight: 5}}>
                    <Icon
                      type="eye"
                    />
                  </Button>
                  </div>
                </div>
              </div>
              <div
                className="flex align-items center"
                style={{ marginTop: 24 }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{ fontWeight: 600, marginRight: 10 }}
                >
                  <FontAwesomeIcon icon={faReply} /> Reply
                </Button>
                <Button size="large" style={{ fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faLongArrowAltRight} /> Foward
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MailApp;

import React, { Component } from "react";
import { Row, Col } from "antd";
import theme from "../theme";
import mockData from "../data/mockData";
import MailList from "../components/MailList";
import MailContent from "../components/MailContent";
import MailNav from "../components/MailNav";

class MailApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavItem: {},
      data: mockData.mailData,
      navList: [
        { id: '1', text: "Inbox", icon: "inbox"},
        { id: '2', text: "Drafts", icon: "save" },
        { id: '3', text: "Important", icon: "star"},
        { id: '4', text: "Sent", icon: "export" },
        { id: '5', text: "Spam", icon: "warning" },
        { id: '6', text: "Deleted", icon: "delete" },
        { id: '7', text: "Personal", color: theme.colors.main, icon: "user", isLabel: true },
        { id: '8', text: "Family", color: theme.colors.purple, icon: "home", isLabel: true },
        { id: '9', text: "Friends", color: theme.colors.orange, icon: "team", isLabel: true },
        { id: '10', text: "Work", color: theme.colors.green, icon: "laptop", isLabel: true }
      ],
    };
  }

  componentDidMount() {
    this.handleMailNavMenuClick('Inbox','1')
  }

  handleNewMail = (id) => {
    const mailItem = this.state.data.find(item => item.id === id)
    mailItem.unread = false;
    const data = this.state.data.map(m=>m.id === 1 ? {...m,unread: false} : m)
    this.setState({
      mailItem,
      data,
    })
  }
  handleMailNavMenuClick = (text,id,isLabel) => {
    text = text.toLowerCase()
    const prop = isLabel ? 'label' : 'folder'
    this.setState({
      currentNavItem: {
        text,
        id,
      },
      navData: this.state.data.filter(m=>m[prop] === text),
    })
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
            <MailNav
              data={this.state.data}
              labelList={this.state.navList.filter(m =>m.isLabel)}
              navList={this.state.navList.filter(m =>!m.isLabel)}
              onMenuClick={this.handleMailNavMenuClick}
              currentNavItem={this.state.currentNavItem}
            />
          </Col>
          <Col
            className="mail-list"
            xs={24}
            sm={16}
            md={16}
            lg={16}
            xl={this.state.mailItem ? 7 : 19}
            style={{ border: "2px solid #eee" }}
          >
            <MailList
              mailItem={this.state.mailItem}
              onNewMail={this.handleNewMail}
              data={this.state.navData ? this.state.navData : this.state.data}
            />
          </Col>
            {this.state.mailItem && (
              <Col
                className="mail-content"
                xs={0}
                sm={0}
                md={0}
                lg={0}
                xl={12}
                style={{ border: "2px solid #eee" }}
              >
                <MailContent
                  mailItem={this.state.mailItem}
                  labelList={this.state.navList.filter(m=>m.isLabel === true)}
                />
              </Col>
            )}
        </Row>
      </div>
    );
  }
}

export default MailApp;

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
      breakpoint: 992,
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
    const data = this.state.data.map(m=>m.id === id ? {...m,unread: false} : m)
    const mailItem = data.find(item => item.id === id)
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
        prop,
      },
    })
  }
  
  render() {
    return (
      <div className="stkd-widget" style={{ margin: "10px auto" }}>
        <div
          className="mail-app flex"
          style={{ height: "100%", background: "#fff" }}
        >
          <div className="flex" style={{ height: "100%" }}>
            <div
              style={{
                borderRight: "2px solid #eee",
                minWidth: this.props.clientWidth < this.state.breakpoint ? 60 : 300
              }}
              className="mail-nav"
            >
              <MailNav
                data={this.state.data}
                labelList={this.state.navList.filter(m => m.isLabel)}
                navList={this.state.navList.filter(m => !m.isLabel)}
                onMenuClick={this.handleMailNavMenuClick}
                currentNavItem={this.state.currentNavItem}
                showDrawer={this.props.clientWidth < this.state.breakpoint}
              />
            </div>
            <div
              style={{
                borderRight: "2px solid #eee",
                borderLeft: "2px solid #eee",
                display: this.props.clientWidth < this.state.breakpoint && this.state.mailItem ? 'none' : 'inherit',
                width: this.state.mailItem ? '60%' : '100%'
              }}
              className="mail-list"
            >
              <MailList
                mailItem={this.state.mailItem}
                onNewMail={this.handleNewMail}
                data={this.state.data.filter(
                  item =>
                    item[this.state.currentNavItem.prop] ===
                    this.state.currentNavItem.text
                )}
              />
            </div>
            {this.state.mailItem && (
              <div
                style={{
                  borderLeft: "2px solid #eee",
                  width: '100%',
                }}
                className="mail-content"
              >
                <MailContent
                  mailItem={this.state.mailItem}
                  labelList={this.state.navList.filter(
                    m => m.isLabel === true
                  )}
                  onNewMail={this.handleNewMail}
                  data={this.state.data.filter(
                    item =>
                      item[this.state.currentNavItem.prop] ===
                      this.state.currentNavItem.text
                  )}
                />
              </div>
            )}
          </div>
          {/* <Row
          gutter={0}
          style={{height: "100%" }}
          type="flex"
        >
          <Col
            className="mail-nav"
            xs={4}
            sm={2}
            md={2}
            lg={this.state.mailItem ? 6 : 8}
            xl={4}
            style={{ borderRight: "2px solid #eee" }}
          >
            <MailNav
              data={this.state.data}
              labelList={this.state.navList.filter(m =>m.isLabel)}
              navList={this.state.navList.filter(m =>!m.isLabel)}
              onMenuClick={this.handleMailNavMenuClick}
              currentNavItem={this.state.currentNavItem}
              showDrawer={this.props.clientWidth <= this.state.breakpoint}
            />
          </Col>
          <Col
            className="mail-list"
            xs={this.state.mailItem ? 0 : 20}
            sm={this.state.mailItem ? 0 : 22}
            md={this.state.mailItem ? 0 : 22}
            lg={this.state.mailItem ? 0 : 16}
            xl={this.state.mailItem ? 8 : 20}
            style={{ borderRight: "2px solid #eee", borderLeft: "2px solid #eee" }}
          >
            <MailList
              mailItem={this.state.mailItem}
              onNewMail={this.handleNewMail}
              data={this.state.data.filter(item=>item[this.state.currentNavItem.prop] === this.state.currentNavItem.text)}
            />
          </Col>
            {this.state.mailItem && (
              <Col
                className="mail-content"
                xs={20}
                sm={22}
                md={22}
                lg={18}
                xl={12}
                style={{ borderLeft: "2px solid #eee" }}
              >
                <MailContent
                  mailItem={this.state.mailItem}
                  labelList={this.state.navList.filter(m=>m.isLabel === true)}
                  onNewMail={this.handleNewMail}
                  data={this.state.data.filter(item=>item[this.state.currentNavItem.prop] === this.state.currentNavItem.text)}
                />
              </Col>
            )}
        </Row> */}
        </div>
      </div>
    );
  }
}

export default MailApp;

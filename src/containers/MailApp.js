import React, { Component } from "react";
import { Row, Col, Button, Menu, Icon } from "antd";
import theme from "../theme";
import mockData from "../data/mockData";
import MailList from "../components/MailList";
import MailContent from "../components/MailContent";

class MailApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: mockData.mailData,
      navList: [
        { id: 1, text: "Inbox", icon: "inbox", unread: 4},
        { id: 2, text: "Drafts", icon: "save" },
        { id: 3, text: "Important", icon: "star", unread: 10 },
        { id: 4, text: "Sent", icon: "export" },
        { id: 5, text: "Spam", icon: "warning" },
        { id: 6, text: "Deleted", icon: "delete" }
      ],
      labelList: [
        { id: 7, text: "Personal", color: theme.colors.main, icon: "user", unread: 14 },
        { id: 8, text: "Family", color: theme.colors.purple, icon: "home", unread: 18 },
        { id: 9, text: "Friends", color: theme.colors.orange, icon: "team", unread: 10 },
        { id: 10, text: "Work", color: theme.colors.green, icon: "laptop", unread: 21 }
      ]
    };
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
            <div className="mail-nav-wrapper flex flex-col justify-content-center contain full-pad" style={{paddingTop: 0}}>
              <div
                className="flex align-items-center justify-content-center"
                style={{height: 60}}
              >
                <Button block type="primary">
                  New Message
                </Button>
              </div>
              <div>
                <Menu style={{ border: "none" }}>
                  {this.state.navList.map(item => (
                    <Menu.Item key={item.id} className="menu-item">
                      <Icon type={item.icon} />
                      {item.text}
                      <span className="unread">
                        {this.state.data.filter(m => m.unread === true && m.folder === item.text.toLowerCase()).length > 0 ?
                          this.state.data.filter(m => m.unread === true && m.folder === item.text.toLowerCase()).length
                        :
                          null
                        }
                      </span>
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
            xl={this.state.mailItem ? 7 : 19}
            style={{ border: "2px solid #eee" }}
          >
            <MailList
              mailItem={this.state.mailItem}
              onNewMail={this.handleNewMail}
              data={this.state.data}
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
                  labelList={this.state.labelList}
                />
              </Col>
            )}
        </Row>
      </div>
    );
  }
}

export default MailApp;

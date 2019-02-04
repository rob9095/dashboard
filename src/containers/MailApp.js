import React, { Component } from 'react';
import { Row, Col, Button, Menu, List, Icon } from 'antd';
import theme from '../theme';

class MailApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navList: [{id:1,text:'Inbox',icon: 'inbox',unread: 4},{id:2,text:'Drafts',icon:'edit'},{id:3,text:'Important',icon: 'flag',unread: 10},{id:4,text:'Sent',icon:'export'},{id:5,text:'Deleted',icon:'delete'}],
      labelList: [{id:1,text:'Personal',color: theme.colors.main,unread: 14},{id:2,text:'Family',color:theme.colors.purple, unread: 18},{id:3,text:'Friends',color:theme.colors.orange,unread: 10},{id:4,text:'Work',color:theme.colors.green,unread: 21},],
    }
  }
  render() {
    return (
      <div className="stkd-content stkd-widget mail-app">
        <Row gutter={0}>
          <Col className="mail-nav" xs={24} sm={12} md={12} lg={6}>
            <div className="flex align-items-center justify-content-center half-pad">
              <Button block type="primary" size="large">New Message</Button>
            </div>
            <div className="border-bottom half-pad">
            <Menu>
              {this.state.navList.map(item=>(
                <Menu.Item key={item.id} className="menu-item">
                  <Icon type={item.icon} />
                  {item.text}
                  <span className="unread">{item.unread}</span>
                </Menu.Item>
              ))}
            </Menu>
            </div>
            <div className="half-pad">
              <div className="flex align-items-center justify-content-center space-between">
                <h4>Labels</h4>
                <Button><Icon type="plus" /></Button>
              </div>
                <Menu>
                  {this.state.labelList.map(item=>(
                    <Menu.Item className="menu-item" key={item.id}>
                      <div style={{borderColor: item.color}} className="ant-timeline-item-head" />
                      {item.text}
                  </Menu.Item>
                  ))}
                </Menu>
            </div>
          </Col>
          <Col className="mail-list" xs={24} sm={12} md={12} lg={6}>
            MAIL LIST
          </Col>
          <Col className="mail-content" xs={24} sm={12} md={12} lg={12}>
            MAIL CONTENT
          </Col>
        </Row>
      </div>
    )
  }
}

export default MailApp
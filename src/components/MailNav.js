import React, { Component } from "react";
import { Button, Menu, Icon, Drawer } from "antd";

class MailNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  toggleDrawer = () => this.setState({drawerOpen: !this.state.drawerOpen})

  getUnreadCount = (text,isLabel) => {
    text = text.toLowerCase()
    const prop = isLabel ? 'label' : 'folder'
    const unread = this.props.data.filter(
      m => m.unread === true && m[prop] === text
    ).filter(m => !isLabel || m.folder !== 'deleted').length
    return unread > 0 ? unread : null
  }

  render() {
    const menuDiv = (
      <div className="flex flex-col justify-content-center">
        <div
          className="flex align-items-center justify-content-center half-pad"
          style={{ height: 60 }}
        >
          <Button block type="primary">New Message</Button>
        </div>
        <div>
          <Menu selectedKeys={[this.props.currentNavItem.id]} style={{ border: "none" }}>
            {this.props.navList.map(item => (
              <Menu.Item key={item.id} className="menu-item" onClick={() => this.props.onMenuClick(item.text, item.id, item.isLabel)}>
                <Icon type={item.icon} />
                {item.text}
                <span className="unread">
                  {this.getUnreadCount(item.text, item.isLabel)}
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
            {this.props.labelList.map(item => (
              <Menu.Item className="menu-item" key={item.id} onClick={() => this.props.onMenuClick(item.text, item.id, item.isLabel)}>
                <div
                  style={{ borderColor: item.color }}
                  className="ant-timeline-item-head"
                />
                {item.text}
                <span className="unread">
                  {this.getUnreadCount(item.text, item.isLabel)}
                </span>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
    )
    return (
      <div className={this.props.showDrawer ? 'no-pad contain' : 'full-pad contain'} style={{ paddingTop: 0 }}>
        {this.props.showDrawer ? (
          <div className="flex half-pad align-items-center justify-content-center" style={{ height: 60 }}>
            <Button onClick={this.toggleDrawer} className="no-border flex-i justify-content-center align-items-center">
              <Icon type="menu" style={{ fontSize: "1.30rem" }} />
            </Button>
          </div>
        ) : (
          <div>{menuDiv}</div>
        )}
        <Drawer
          placement={"left"}
          onClose={this.toggleDrawer}
          visible={this.state.drawerOpen}
          closable={false}
          className="mail-app"
        >
          <div className="mail-nav">
            {menuDiv}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default MailNav;
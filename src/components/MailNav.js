import React, { Component } from "react";
import { Button, Menu, Icon, Drawer, Badge } from "antd";
import theme from "../theme";

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

  handleMenuItemClick = (navItem) => {
    this.state.drawerOpen && this.toggleDrawer();
    this.props.onMenuClick(navItem);
  }

  menuDiv = (iconOnly) => (
    <div className="flex flex-col justify-content-center">
      {!iconOnly && (
        <div
          className="flex align-items-center justify-content-center half-pad"
          style={{ height: 60 }}
        >
          <Button block type="primary">New Message</Button>
        </div>
        )
      }
      <div>
        <Menu selectedKeys={[this.props.currentNavItem.id]} style={{ border: "none" }}>
          {this.props.navList.map(item => (
            <Menu.Item key={item.id} className="menu-item" onClick={() => this.handleMenuItemClick(item)}>
              {iconOnly ? (
                <Badge dot={this.getUnreadCount(item.text, item.isLabel) ? true : false}>
                  <Icon type={item.icon} />
                </Badge>
              ) : (
                  <span>
                    <Icon type={item.icon} />
                    {item.text}
                    <span className="unread">
                      {this.getUnreadCount(item.text, item.isLabel)}
                    </span>
                  </span>
                )}
            </Menu.Item>
          ))}
          {!iconOnly && (
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
          )}
          {this.props.labelList.map(item => (
            <Menu.Item className="menu-item" key={item.id} onClick={() => this.handleMenuItemClick(item)}>
              {iconOnly ? (
                <Badge dot={this.getUnreadCount(item.text, item.isLabel) ? true : false}>
                  <div
                    style={{ borderColor: item.color }}
                    className="ant-timeline-item-head"
                  />
                </Badge>
              ) : (
                <div className="flex align-items-center">
                  <div
                    style={{ borderColor: item.color }}
                    className="ant-timeline-item-head"
                  />
                  {item.text}
                  <span className="unread">
                    {this.getUnreadCount(item.text, item.isLabel)}
                  </span>
                </div>
              )}
          </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  )

  render() {
    return (
      <div className={this.props.showDrawer ? 'no-pad' : 'full-pad'} style={{ paddingTop: 0 }}>
        {this.props.showDrawer ? (
          this.props.clientWidth < 480 ? 
            <div className="flex half-pad align-items-center space-between" style={{ height: 60, overflow: 'hidden', background: this.props.currentNavItem.color ? this.props.currentNavItem.color : theme.colors.main}}>
              {this.props.mailItem && (
                <Button style={{ background: 'transparent' }} onClick={()=>this.props.onSetCurrentMail(null)} className="no-border flex-i justify-content-center align-items-center">
                  <Icon type="arrow-left" style={{ fontSize: "1.30rem", color: '#fff' }} />
                </Button>
              )}
              <h3 style={{color: '#fff', margin: 0, textTransform: 'capitalize'}}>
                <Icon type={this.props.currentNavItem.icon} style={{marginRight: 5}} />
                {this.props.currentNavItem.text}
              </h3>
              <Button style={{background: 'transparent'}} onClick={this.toggleDrawer} className="no-border flex-i justify-content-center align-items-center">
                <Icon type="menu" style={{ fontSize: "1.30rem", color: '#fff' }} />
              </Button>
            </div>            
          :
            <div className="contain">
              <div className="flex half-pad align-items-center justify-content-center" style={{ height: 60 }}>
                <Button onClick={this.toggleDrawer} className="no-border flex-i justify-content-center align-items-center">
                  <Icon type="menu" style={{ fontSize: "1.30rem" }} />
                </Button>
              </div>
              <div>{this.menuDiv(true)}</div>
            </div>
          ) : (
            <div className="contain">{this.menuDiv()}</div>
        )}
        <Drawer
          placement={"left"}
          onClose={this.toggleDrawer}
          visible={this.state.drawerOpen}
          closable={false}
          className="mail-app"
        >
          <div className="mail-nav">
            {this.menuDiv()}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default MailNav;
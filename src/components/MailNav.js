import React, { Component } from "react";
import { Button, Menu, Icon, Drawer, Badge, Tooltip, Popover, Input } from "antd";
import theme from "../theme";
import { BlockPicker } from 'react-color'

class MailNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      labelPopoverOpen: false,
      colorPickerColor: theme.colors.main,
      newLabelVal: '',
    };
  }

  toggle = (key) => {
    this.setState({[key]: !this.state[key]})
    key === 'drawerOpen' && this.setState({labelPopoverOpen: false})
  }

  getUnreadCount = (text,isLabel) => {
    text = text.toLowerCase()
    const prop = isLabel ? 'label' : 'folder'
    const unread = this.props.data.filter(
      m => m.unread === true && m[prop] === text
    ).filter(m => !isLabel || m.folder !== 'deleted').length
    return unread > 0 ? unread : null
  }

  handleMenuItemClick = (navItem) => {
    this.state.drawerOpen && this.toggle('drawerOpen');
    this.props.onMenuClick(navItem);
  }

  handleNewMessageClick = () => {
    this.state.drawerOpen && this.toggle('drawerOpen');
    this.props.onSetMailComposer({ type: 'new' })
  }

  handleNewLabelSubmit = () => {
    this.props.onNewLabel(this.state.newLabelVal, this.state.colorPickerColor)
    this.toggle('labelPopoverOpen')
    this.setState({})
  }

  menuDiv = (iconOnly) => (
    <div className="flex flex-col justify-content-center">
      {!iconOnly && (
        <div
          className="flex align-items-center justify-content-center half-pad"
          style={{ height: 60 }}
        >
          <Button onClick={this.handleNewMessageClick} block type="primary">New Message</Button>
        </div>
        )
      }
      <div>
        <Menu selectedKeys={[this.props.currentNavItem.id]} style={{ border: "none" }}>
          {this.props.navList.map(item => (
            <Menu.Item key={item.id} className={iconOnly ? 'menu-item icon-only' : 'menu-item'} onClick={() => this.handleMenuItemClick(item)}>
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
                  <Tooltip title="Add Label">
                    <Popover onClose={() => this.toggle('labelPopoverOpen')} visible={this.state.labelPopoverOpen} placement="right" trigger="click" content={(
                      <div>
                        <Input autoFocus value={this.state.newLabelVal} onChange={(e)=>this.setState({newLabelVal: e.target.value})} style={{ width: 188, marginBottom: 8, display: 'block' }} placeholder="New Label" suffix={(
                          <Popover placement="right" trigger="click" content={(
                            <BlockPicker
                              color={this.state.colorPickerColor}
                              triangle="hide"
                              onChange={(color)=>this.setState({colorPickerColor: color.hex})}
                            />
                          )}>
                          <span className="flex align-items-center justify-content-center">
                            <span className="color-picker-suffix" style={{ background: this.state.colorPickerColor }} />
                          </span>
                          </Popover>
                        )} />
                          <Button
                            type="primary"
                            size="small"
                            style={{ width: 90, marginRight: 8 }}
                            disabled={!this.state.newLabelVal || this.props.labelList.find(l=>l.text.toLowerCase() === this.state.newLabelVal.toLowerCase())}
                            onClick={this.handleNewLabelSubmit}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => this.toggle('labelPopoverOpen')}
                            size="small"
                            style={{ width: 90 }}
                          >
                            Cancel
                        </Button>
                      </div>
                    )}>
                      <Button onClick={() => this.toggle('labelPopoverOpen')} className="no-border">
                        <Icon type="plus" />
                      </Button>
                    </Popover>
                  </Tooltip>
                </div>
              }
            />
          )}
          {this.props.labelList.map(item => (
            <Menu.Item className={iconOnly ? 'menu-item icon-only' : 'menu-item'} key={item.id} onClick={() => this.handleMenuItemClick(item)}>
              {iconOnly ? (
                <Badge dot={this.getUnreadCount(item.text, item.isLabel) ? true : false}>
                  <div
                    style={{ background: item.color }}
                    className="ant-timeline-item-head"
                  />
                </Badge>
              ) : (
                <div className="flex align-items-center">
                  <div
                    style={{ background: item.color }}
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
              <h3 className="flex" style={{width: '100%', color: '#fff', margin: 0, textTransform: 'capitalize'}}>
                {this.props.currentNavItem.text}
              </h3>
              <Button style={{background: 'transparent'}} onClick={()=>this.toggle('drawerOpen')} className="no-border flex-i justify-content-center align-items-center">
                <Icon type="menu" style={{ fontSize: "1.30rem", color: '#fff' }} />
              </Button>
            </div>
          :
            <div>
              <div className="flex half-pad align-items-center justify-content-center" style={{ height: 60 }}>
                <Button onClick={() => this.toggle('drawerOpen')} className="no-border flex-i justify-content-center align-items-center">
                  <Icon type="menu" style={{ fontSize: "1.30rem" }} />
                </Button>
              </div>
              <div>{this.menuDiv(true)}</div>
            </div>
          ) : (
            <div>{this.menuDiv()}</div>
        )}
        <Drawer
          placement={"left"}
          onClose={()=>this.toggle('drawerOpen')}
          visible={this.state.drawerOpen}
          closable={false}
          className="mail-app"
        >
          <div className="mail-nav">
            {this.state.drawerOpen && this.menuDiv()}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default MailNav;
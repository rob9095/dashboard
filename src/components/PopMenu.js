import React, { Component } from 'react';
import { Button, Icon } from 'antd';

class PopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        {this.props.menuItems.map(item=>(
          <div key={item.id} className="ant-menu-item flex align-items-center">
            <Icon type={item.icon} theme={item.iconTheme} twoToneColor={item.iconColor} />
            <span>{item.text}</span>
          </div>
        ))}
        {this.props.buttonText && (
          <div style={{ marginTop: 10 }}>
            <Button block type="primary">{this.props.buttonText}</Button>
          </div>
        )}
      </div>
    )
  }
}

export default PopMenu;
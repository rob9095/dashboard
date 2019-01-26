import React from 'react';
import { Menu, Dropdown, Icon, Button } from 'antd';

const IconDropDown = (props) => {
  const menu = (
    <Menu>
      {props.options.map(item =>
        <Menu.Item key={item.id}>
          {item.icon && (
            <Icon type={item.icon} theme={item.iconTheme} />
          )}
          {item.text}
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement={props.dropDownPlacement}>
      <Button style={{display: 'flex'}}>
        <Icon
          type={props.icon}
          theme={props.iconTheme}
          style={{
            fontSize: props.iconSize,
          }}
        />
      </Button>
    </Dropdown>
  )
}

export default IconDropDown;
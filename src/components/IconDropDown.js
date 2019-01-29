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
    <div style={{ marginBottom: '.5em' }}>
      <Dropdown overlay={menu} placement={props.dropDownPlacement}>
        <Button className="flex-i" style={props.noBorder ? { border: 0, boxShadow: 'none' } : null}>
          <Icon
            type={props.icon}
            theme={props.iconTheme}
            style={{
              fontSize: props.iconSize,
            }}
          />
        </Button>
      </Dropdown>
    </div>
  )
}

export default IconDropDown;
import React from 'react';
import { Menu, Dropdown, Icon, Button } from 'antd';

const IconDropDown = (props) => {
  const menu = (
    <Menu>
      {props.options.map(item =>
        <Menu.Item key={item.id} onClick={() => props.onSelect && props.onSelect({text:item.text, id: item.id, rowKey: item.rowKey})}>
          {item.icon && (
            <Icon type={item.icon} theme={item.iconTheme} />
          )}
          {item.text}
        </Menu.Item>
      )}
    </Menu>
  );
  return (
      <Dropdown
        overlay={menu}
        placement={props.dropDownPlacement}
        style={{ marginBottom: ".5em" }}
      >
        <Button
          size={props.size}
          className={props.noBorder ? "no-border" : null}
          style={props.buttonStyles}
        >
          {props.text}
          {props.icon && (
            <Icon
              type={props.icon}
              theme={props.iconTheme}
              style={{
                fontSize: props.iconSize
              }}
            />
          )}
        </Button>
      </Dropdown>
  );
}

export default IconDropDown;
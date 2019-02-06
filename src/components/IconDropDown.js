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
  const styles = {
    background: props.backgroundColor,
  }
  return (
    <div style={{ marginBottom: '.5em' }}>
      <Dropdown overlay={menu} placement={props.dropDownPlacement}>
        <Button
          size={props.size}
          className={props.noBorder ? "no-border flex-i" : "flex-i"}
          style={styles}
        >
          {props.text}
          {props.icon && (
            <Icon
              type={props.icon}
              theme={props.iconTheme}
              style={{
                fontSize: props.iconSize,
              }}
            />
          )}
        </Button>
      </Dropdown>
    </div>
  )
}

export default IconDropDown;
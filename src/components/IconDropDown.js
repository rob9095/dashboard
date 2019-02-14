import React from 'react';
import { Menu, Dropdown, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

const IconDropDown = (props) => {
  const menu = (
    <Menu>
      {props.options.map(item =>
        item.subMenuOptions ? (
          <SubMenu
            key={item.id}
            title={
              <span>
                <Icon type={item.icon} theme={item.iconTheme} style={{marginRight: 8}} />
                {item.text}
              </span>
            }
          >
            {item.subMenuOptions.map(subItem => (
              <Menu.Item
                key={subItem.id}
                onClick={(e) => {
                  console.log('click from dropdown subitem')
                  e.domEvent.stopPropagation()
                  props.onSelect &&
                  props.onSelect({
                    text: subItem.text,
                    id: subItem.id,
                    rowKey: subItem.rowKey
                  })
                }}
              >
                {subItem.icon && (
                  <Icon type={subItem.icon} theme={subItem.iconTheme} />
                )}
                {subItem.text}
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item
            key={item.id}
            onClick={(e) => {
              console.log('click from dropdown')
              e.domEvent.stopPropagation()
              props.onSelect &&
              props.onSelect({
                text: item.text,
                id: item.id,
                rowKey: item.rowKey
              })
            }}
          >
            {item.icon && <Icon type={item.icon} theme={item.iconTheme} />}
            {item.text}
          </Menu.Item>
        )
      )}
    </Menu>
  );
  return (
      <Dropdown
        overlay={menu}
        placement={props.dropDownPlacement}
        style={{ marginBottom: ".5em" }}
        trigger={['click','hover']}
      >
        <Button
          size={props.size}
          className={props.noBorder ? "no-border" : null}
          style={props.buttonStyles}
          onClick={(e)=>e.stopPropagation()}
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
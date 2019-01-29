import React from 'react';
import { List, Checkbox, Tabs } from 'antd';
import IconDropDown from "./IconDropDown";
const TabPane = Tabs.TabPane;

const TodoWidget = props => (
  <div className="stkd-widget stkd-content">
    <div className="flex space-between align-items-center" style={{borderBottom: '1px solid #e8e8e8'}}>
      <h2>{props.title}</h2>
      <Tabs defaultActiveKey="1" tabBarStyle={{borderBottom: 'none'}}>
        <TabPane tab="Today" key="1" />
        <TabPane tab="Week" key="2" />
      </Tabs>
    </div>
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={item => (
        <div className="todo-item">
          <span className="todo-before" style={{ background: item.color }} />
          <List.Item
            actions={[
              <IconDropDown
                icon={"ellipsis"}
                iconTheme={"outlined"}
                iconSize={"1rem"}
                dropDownPlacement={"bottomRight"}
                noBorder={true}
                options={[
                  { id: 1, text: "Edit", icon: 'edit', iconTheme: 'outlined' },
                  { id: 2, text: "Complete", icon: 'check', iconTheme: 'outlined' },
                  { id: 3, text: "Delete", icon: 'delete', iconTheme: 'outlined' }
                ]}
              />
            ]}
          >
            <List.Item.Meta
              avatar={<Checkbox />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        </div>
      )}
    />
  </div>
);

export default TodoWidget;
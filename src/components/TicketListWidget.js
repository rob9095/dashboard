import React from 'react';
import { Avatar, List, Tag } from 'antd';
import IconDropDown from "./IconDropDown";

const TicketListWidget = props => (
  <div className="stkd-widget stkd-content">
    <div className="flex space-between align-items-center">
      <h2>{props.title}</h2>
      <IconDropDown
        icon={"down"}
        iconTheme={"outlined"}
        text={"All"}
        dropDownPlacement={"bottomRight"}
        options={[
          { id: 1, text: "All Tickets", icon: null, iconTheme: null },
          { id: 2, text: "My Tickets", iicon: null, iconTheme: null }
        ]}
      />
    </div>
    <List
      dataSource={props.data}
      renderItem={item => (
        <div className="ticket-item border-bottom">
          <List.Item
            actions={[
              <Tag className="ticket-tag" color={item.color}>{item.status}</Tag>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size="large" />}
              title={item.title}
              description={item.date}
            />
          </List.Item>
          {item.description}
        </div>
      )}
    />
  </div>
);

export default TicketListWidget;
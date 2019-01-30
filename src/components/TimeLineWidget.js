import React from 'react';
import { Timeline, Icon } from 'antd';
import IconDropDown from './IconDropDown';

const TimeLineWidget = props => (
  <div className="stkd-widget stkd-content">
    <div className="flex space-between">
      <h2>{props.title}</h2>
      <IconDropDown
        icon={"ellipsis"}
        iconTheme={"outlined"}
        iconSize={"2rem"}
        dropDownPlacement={"bottomRight"}
        noBorder={true}
        options={[
          { id: 1, text: "Last 7 Days", icon: null, iconTheme: null },
          { id: 2, text: "Last 2 Weeks", icon: null, iconTheme: null },
          { id: 3, text: "Last Month", icon: null, iconTheme: null }
        ]}
      />
    </div>
    <div className="timeLineWidget-wrapper half-pad contain">
      <Timeline>
        {props.data.map(item => (
          <Timeline.Item
            dot={item.icon && (<Icon type={item.icon} theme={item.iconTheme} style={{color: item.color}} />)}
            className="timeline-item"
            key={item.id}
            color={item.color}
          >
            <span className="time">{item.time}</span>
            <div className="flex space-between">
              <div>
                {item.description}
              </div>
              {item.extra && (
                <div className="extra">
                  {item.extra}
                </div>
              )}
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  </div>
);

export default TimeLineWidget;
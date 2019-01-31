import React from 'react';
import { Progress } from 'antd';
import { Icon } from "antd";

const ProgressWidget = (props) => {
  const styles = {
    header: {
      justifyContent: 'space-between',
      marginBottom: -15,
    },
    progessBar: {
      margin: '17px 0px',
    },
    icon: {
      color: props.iconColor,
      fontSize: 25,
    }
  }
  return (
    <div className="stkd-widget stkd-content" style={{height: props.height}}>
      <div className="widget-wrapper">
        <div className="flex" style={styles.header}>
          <h2>{props.title}</h2>
          {props.icon && (
            <div className="icon" style={styles.icon}>
              <Icon type={props.icon} theme={props.iconTheme} />
            </div>
          )}
        </div>
        {props.data.map(item => (
          <div key={item.id} style={styles.progessBar}>
            {item.text ? item.text : item.progress + '% Complete'}
            <Progress
              strokeColor={item.color}
              percent={item.progress}
              status={item.status}
              showInfo={item.showInfo}
            />
          </div>
        ))}
        <p className="widget-footer">{props.footerText}</p>
      </div>
    </div>
  )
}

export default ProgressWidget;
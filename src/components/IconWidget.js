import React from 'react';
import { Icon } from 'antd';

const IconWidget = (props) => {
  const styles = {
    accentColor: {
      color: props.accentColor,
    },
  }
  return (
    <div className="iconWidget-wrapper">
      <h2 className="title">{props.title}</h2>
      {props.icon && (
        <div
          className="icon"
          style={styles.accentColor}
        >
          <Icon type={props.icon} theme={props.iconTheme} />
        </div>
      )}
      {props.stat && (
        <div
          className="stat"
          style={styles.accentColor}
        >
          {props.stat}
        </div>
      )}
      <div
        className="widget-footer"
      >
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default IconWidget;
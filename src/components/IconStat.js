import React from 'react';
import { Icon } from 'antd';
const Color = require('color');

const IconStat = (props) => {
  const styles = {
    icon: {
      background: Color(props.color).darken(0.1),
    },
    stat: {
      background: props.color,
      color: '#fff',
    },
  }
  return (
    <div className={props.filled ? 'stkd-widget' : 'stkd-widget stkd-content'}>
      <div className="iconStat-wrapper">
        <div
          className="icon"
          style={props.filled ? styles.icon : {color: props.color, width: '20%'}}
        >
          <Icon type={props.icon} theme={props.iconTheme} />
        </div>
        <div
          className="stat"
          style={props.filled ? styles.stat : {width: '80%'}}
        >
          <h3 style={props.filled ? {color:'#fff'} : null}>{props.stat}</h3>
          <span>{props.title}</span>
        </div>
      </div>      
    </div>
  )
}

export default IconStat;
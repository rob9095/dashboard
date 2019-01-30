import React from 'react';
import { Icon } from 'antd';
const Color = require('color');

const IconStat = (props) => {
  const styles = {
    filled: {
      icon: {
        background: Color(props.color).darken(0.1),
      },
      stat: {
        background: props.color,
        color: '#fff',
      },
    },
    default: {
      icon: {
        background: `linear-gradient(-145deg, ${props.color}, ${Color(props.color).fade(.3)})`,
        borderRadius: 5,
        maxHeight: 80,
        maxWidth: 80,
        margin: 'auto',
      },
    },
  }
  return (
    <div className={props.filled ? 'stkd-widget' : 'half-pad stkd-widget stkd-content'}>
      <div className={props.filled ? 'iconStat-wrapper' : 'iconStat-wrapper flex-row-reverse'}>
        <div
          className="icon"
          style={props.filled ? styles.filled.icon : styles.default.icon}
        >
          <Icon type={props.icon} theme={props.iconTheme} />
        </div>
        <div
          className="stat"
          style={props.filled ? styles.filled.stat : styles.default.stat}
        >
          <h3 style={props.filled ? {color:'#fff'} : null}>{props.stat}</h3>
          <span>{props.title}</span>
        </div>
      </div>      
    </div>
  )
}

export default IconStat;
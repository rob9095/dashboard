import React from 'react';
import { Icon } from 'antd';

function LightenDarkenColor(col, amt) {
  
  var usePound = false;

  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

const IconStat = (props) => {
  const darkColor = LightenDarkenColor(props.color, -30);
  const styles = {
    icon: {
      background: darkColor,
    },
    stat: {
      background: props.color,
      color: '#fff',
      padding: '5px 0px 10px 15px',
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
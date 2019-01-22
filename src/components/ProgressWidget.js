import React from 'react';
import { Progress } from 'antd';

const styles = {
  progessBar: {
    margin: '17px 0px',
  }
}

const ProgressWidget = (props) => (
  <div className="widget-wrapper">
    <h2>{props.title}</h2>
    {props.data.map(item => (
      <div key={item.id} style={styles.progessBar}>
      {item.text}
      <Progress strokeColor={item.color} percent={item.progress} status="active" />
      </div>
    ))}
    <p className="widget-footer">{props.footerText}</p>
  </div>
)

export default ProgressWidget;
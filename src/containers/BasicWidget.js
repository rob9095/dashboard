import React, { Component } from 'react';

class BasicWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { title, subTitle, styles, actions, content, footer } = this.props
    return(
      <div className="stkd-widget stkd-content" style={styles}>
        {title || actions ? (
          <div className="widget-header flex space-between">
            <div className="title">
              <h2>{title}</h2>
              <span>{subTitle}</span>
            </div>
            <div className="widget-actions flex space-around">
              {actions}
            </div>
          </div>
        ) : null}
        {content && (
          <div className="widget-content">
            {content}
          </div>
        )}
        {footer && (
          <div className="widget-footer">
            {footer}
          </div>
        )}
      </div>
    )
  }
}

export default BasicWidget;
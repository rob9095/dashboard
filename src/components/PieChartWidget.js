import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { List, Row, Col, Tag } from 'antd';
import IconDropDown from './IconDropDown';
const Color = require('color');

class PieChartWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [58.2,27.5,14.3],
      labels: ['Desktop','Tablet','Mobile'],
      colors: [
        Color(props.accentColor).string(),
        Color(props.accentColor).fade(.25).string(),
        Color(props.accentColor).fade(.50).string(),
      ]
    }
    this.data = (canvas) => {
      const {data,labels,colors} = this.state
      return {
        labels,
        datasets: [
          {
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            data,
          }
        ]
      }
    };
  }
  render() {
    const labelsArr = this.state.labels.map((label,i)=>({label,percent:this.state.data[i],color:this.state.colors[i]}))
    return(
      <div className="stkd-widget stkd-content">
        <div className="pieChartWidget-wrapper">
          <div className="flex space-between align-items-center">
            <h2>{this.props.title}</h2>
            <IconDropDown
                icon={'ellipsis'}
                iconTheme={'outlined'}
                iconSize={'2rem'}
                dropDownPlacement={'bottomRight'}
                noBorder={true}
                options={
                  [
                    { id: 1, text: "Today", icon: null, iconTheme: null },
                    { id: 2, text: "Last 7 Days", icon: null, iconTheme: null },
                    { id: 3, text: "Last 30 Days", icon: null, iconTheme: null },
                  ]
                }
              />
          </div>
          <Row className="flex-i align-items-center">
            <Col xs={12} className="flex-i justify-content-center">
              <div className="chart" style={{maxWidth: 220, maxHeight: 240}}>
              <Doughnut
                options={{
                  maintainAspectRatio: false,
                  legend: { display: false },
                }}
                data={this.data}
              />
              </div>
            </Col>
            <Col xs={12}>
            <div className="chart-labels flex-i flex-col align-items-center" style={{justifyContent: 'center', height: 240}}>
              <List
                itemLayout="horizontal"
                dataSource={labelsArr}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Tag color={item.color}> </Tag>}
                      title={item.label}
                      description={item.percent+ "%"}
                    />
                  </List.Item>
                )}
              />      
              </div>
            </Col>
          </Row>
        </div>
        <p className="widget-footer">{this.props.footerText}</p>
      </div>
    )
  }
}

export default PieChartWidget;
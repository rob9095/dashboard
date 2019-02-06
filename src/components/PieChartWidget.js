import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Tabs } from 'antd';
import IconDropDown from './IconDropDown';
const TabPane = Tabs.TabPane;
const Color = require('color');

class PieChartWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: {
        datasets: [
          {
            backgroundColor: [Color(props.accentColor).fade(.1).string(),Color(props.accentColor).fade(.25).string(),Color(props.accentColor).fade(.50).string()],
            data: [58.2, 27.5, 14.3],
          }
        ],
        labels: ['Desktop', 'Tablet', 'Mobile'],
      },
    }
  }

  updateData = () => {
      const newData = this.state.chart.labels.map(() => (Math.floor(Math.random() * 100)))

      const chart = {
        ...this.state.chart,
        datasets: [{...this.state.chart.datasets[0], data: newData}]
      };

      this.setState({
        chart,
      });
  }

  render() {
    return(
      <div className="stkd-widget stkd-content" style={{ height: 385 }}>
        <div className="pieChartWidget-wrapper">
          <div className="flex space-between align-items-center">
            <h2>{this.props.title}</h2>
            <IconDropDown
                icon={'ellipsis'}
                iconTheme={'outlined'}
                iconSize={'2rem'}
                dropDownPlacement={'bottomRight'}
                noBorder={true}
                buttonStyles={{ paddingRight: 0 }}
                options={
                  [
                    { id: 1, text: "Today", icon: null, iconTheme: null },
                    { id: 2, text: "Last 7 Days", icon: null, iconTheme: null },
                    { id: 3, text: "Last 30 Days", icon: null, iconTheme: null },
                  ]
                }
            />
          </div>
          <Tabs
            tabBarGutter={12}
            onChange={this.updateData}
            tabBarStyle={{display: 'flex', justifyContent: 'center', borderBottom: '0px'}}
            defaultActiveKey="1"
          >
            <TabPane tab="Today" key="1" />
            <TabPane tab="Week" key="2" />
            <TabPane tab="Month" key="3" />
            <TabPane tab="Year" key="4" />
          </Tabs>
          <div className="chart flex align-items-center justify-content-center half-pad" style={{minHeight: 200}}>
            <Doughnut
              options={{
                maintainAspectRatio: false,
                legend: {
                  position: 'bottom',
                  labels: {
                    boxWidth: 15,
                    padding: 20,
                    fontFamily: 'Roboto',
                    fontColor: 'rgba(121, 126, 152, 0.82)',
                  }
                },
              }}
              data={this.state.chart}
            />
          </div>
        </div>
        <p className="widget-footer">{this.props.footerText}</p>
      </div>
    )
  }
}

export default PieChartWidget;
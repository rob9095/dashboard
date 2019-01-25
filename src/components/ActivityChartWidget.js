import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Menu, Dropdown, Button, Icon, message } from "antd";



class ActivityChartWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.data = (canvas) => {
      const ctx = canvas.getContext("2d")
		  const gradient = ctx.createLinearGradient(154.000, 10.000, 146.000, 280.000);
      gradient.addColorStop(0.0, "rgba(54, 163, 247, 0.5)");
      gradient.addColorStop(0.8, "rgba(231, 244, 254, 0.1)");
      return {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday',],
        datasets: [
          {
            backgroundColor: gradient,
            borderColor: 'rgb(54, 163, 255)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(54, 163, 255, 0.322)',
            pointRadius: [0,4,4,4,4,4,4,4,0],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointBorderColor: "rgb(54, 163, 255)",
            data: [11495, 10985, 10402, 10809, 10232, 9760, 9847, 10422, 10668],
          }
        ]
      }
    };
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {this.props.dropDownOptions.map(item=>
          <Menu.Item key={item.id}>
            {item.icon && (
              <Icon type={item.icon} theme={item.iconTheme} />
            )}
            {item.text}
          </Menu.Item>
        )}
      </Menu>
    );
    return <div className="stkd-widget">
        <div className="activityChart-widget flex flex-col space-between">
          <div className="data-wrapper full-pad">
            <div className="header flex space-between align-items-center">
              <h2 className="no-margin">Daily Views</h2>
              <Icon 
                type={this.props.icon}
                theme={this.props.iconTheme}
                style={{
                  fontSize: '2rem',
                }}
              />
            </div>
            <div className="stat flex space-between align-items-center">
              <h1 className="no-margin">12,304</h1>
              <Dropdown overlay={menu}>
                <Button size="large" style={{ marginLeft: 8 }}>
                  <Icon type="calendar" theme="outlined" />
                  Last 7 Days
                  <Icon type="down" theme="outlined" />
                </Button>
              </Dropdown>
            </div>
          </div>
          <div style={{ marginLeft: "-10px" }} className="chart">
            <Line 
              data={this.data}
              height={230}
              labels={this.labels}
              options={{ 
                maintainAspectRatio: false,
                legend: { display: false },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display: false,
                      drawBorder: false
                    },
                    ticks: { display: false }
                  }],
                  yAxes: [{
                    gridLines: {
                      display: false,
                      drawBorder: false
                    },
                    ticks: {
                      display: false,
                      suggestedMin: 9000
                    }
                  }]
                }
              }} />
          </div>
        </div>
      </div>;
  }
}

export default ActivityChartWidget;
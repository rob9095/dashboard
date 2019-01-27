import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Icon } from "antd";
import IconDropDown from './IconDropDown';



class ActivityChartWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [4000, 5000, 4600, 3800, 5200, 4000, 4500, 4000, 4300, 5400, 4500, 5000, 6000, 5500, 7000, 6552],
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April"],
    }
    this.data = (canvas) => {
      const {data,labels} = this.state
      const ctx = canvas.getContext("2d")
		  const gradient = ctx.createLinearGradient(154.000, 10.000, 146.000, 280.000);
      gradient.addColorStop(0.0, "rgba(68, 124, 230, .7)");
      gradient.addColorStop(0.8, "rgba(231, 244, 254, 0.0)");
      return {
        labels,
        datasets: [
          {
            backgroundColor: gradient,
            borderColor: 'rgba(68, 124, 230, .7)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255,99,132,0.40)',
            hoverBorderColor: 'rgba(68, 124, 230, .7)',
            pointRadius: [0,4,4,4,4,4,4,4,0],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointBorderColor: "rgba(68, 124, 230, .7)",
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#ff8d38',
            pointHoverBorderWidth: 12,
            pointHoverBorderColor: 'rgba(0, 0, 0, 0.25)',
            data,
          }
        ]
      }
    };
  }

  getPercentChange = (data) => {
    const firstVal = data[0]
    const lastVal = data[data.length - 1]
    return (((lastVal - firstVal) / lastVal)*100).toFixed(2)
  }

  getNumWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const percentChange = this.getPercentChange(this.state.data)
    return <div className="stkd-widget stkd-content no-pad">
        <div className="activityChart-widget flex flex-col space-between">
          <div className="data-wrapper full-pad">
            <div className="header flex space-between align-items-center">
              <h2 className="no-margin">{this.props.title}</h2>
              <IconDropDown
                icon={'ellipsis'}
                iconTheme={'outlined'}
                iconSize={'2rem'}
                dropDownPlacement={'bottomRight'}
                options={
                  [
                    { id: 1, text: "Last 7 Days", icon: null, iconTheme: null },
                    { id: 2, text: "Last 2 Weeks", icon: null, iconTheme: null },
                    { id: 3, text: "Last Month", icon: null, iconTheme: null },
                  ]
                }
              />
            </div>
            <div className="stat flex space-between align-items-center">
              <h1 className="no-margin">
                {this.getNumWithCommas(this.state.data[this.state.data.length - 1])}
              </h1>
            </div>
          </div>
          <div style={{ marginLeft: "-10px" }} className="chart">
            <Line 
              data={this.data}
              height={230}
              labels={this.labels}
              options={{ 
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 5
                  }
                },
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
                      suggestedMin: 0,
                      //suggestedMax: 0,
                    }
                  }]
                }
              }} />
          </div>
          <div className="absolute bottom left full-pad">
            <div className="half-pad stkd-content flex align-items-center">
              {percentChange >= 0 ?
                <Icon type="plus-circle" theme={"twoTone"} twoToneColor="#18cb93" />
                :
                <Icon type="minus-circle" theme={"twoTone"} twoToneColor="#e64444" />
              }
              <h3 className="no-margin" style={{paddingLeft: '10px'}}>{percentChange}% {percentChange >= 0 ? 'Increase' : 'Decrease'}</h3>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default ActivityChartWidget;
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Icon } from "antd";
import IconDropDown from './IconDropDown';
const Color = require('color');



class ActivityChartWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [4000, 5000, 4600, 4300, 5200, 4400, 4500, 4000, 4300, 5400, 4500, 5130],
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",],
    }
    this.data = (canvas) => {
      const {data,labels} = this.state
      const ctx = canvas.getContext("2d")
      const gradient = ctx.createLinearGradient(0, 0, 0, 280);
      gradient.addColorStop(0, Color(props.accentColor));
      gradient.addColorStop(1, Color(props.accentColor).fade(.2));
      return {
        labels,
        datasets: [
          {
            backgroundColor: gradient,
            borderColor: Color(props.accentColor).darken(.5),
            borderWidth: 0,
            hoverBackgroundColor: '#fff',
            hoverBorderColor: '#333',
            pointRadius: data.map((n,i,a)=>i===0 || i === a.length - 1 ? 0 : 5 ),
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointBorderColor: Color(props.accentColor).darken(.5),
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
          <div style={{ marginLeft: -9, marginBottom: -11, marginTop: 'calc(100px - 40%)'}} className="chart">
            <Line 
              data={this.data}
              height={300}
              labels={this.labels}
              options={{
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 15
                  }
                },
                // elements: {
                //   line: {
                //     tension: 0,
                //   }
                // },
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
                      beginAtZero: true,
                    }
                  }]
                },
              }} />
          </div>
          <div className="absolute bottom left full-pad">
            <div className="half-pad stkd-content flex align-items-center">
              {percentChange >= 0 ?
                <Icon type="rise" style={{color: "#18cb93", fontSize: '1rem'}} />
                :
                <Icon type="fall" style={{color: "#e64444", fontSize: '1rem'}} />
              }
              <h3 className="no-margin" style={{paddingLeft: '10px'}}>{percentChange}% {percentChange >= 0 ? 'Increase' : 'Decrease'}</h3>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default ActivityChartWidget;
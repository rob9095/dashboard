import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


class ActivityChartWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.data = (canvas) => {
      const ctx = canvas.getContext("2d")
		  const gradient = ctx.createLinearGradient(154.000, 0.000, 146.000, 300.000);
      gradient.addColorStop(0.000, 'rgba(54, 163, 255, 0.322)');
      gradient.addColorStop(1.000, 'rgba(255, 255, 255, 0.000)');
      return {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday',],
        datasets: [
          {
            backgroundColor: gradient,
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [11495, 10985, 10402, 11009, 10232, 9760, 9847, 10422, 10668]
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="stkd-widget">
        <div className="activityChart-widget">
          <div className="header">
            <h2>Daily Views</h2>
            <span>icon</span>
          </div>
          <div className="stat">
            <span>12,304</span>
            <span>dropdown</span>
          </div>
          <div className="chart">
          <Line data={this.data} labels={this.labels} options={{
            maintainAspectRatio: true,
            legend: {
              display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                }]
                },
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityChartWidget;
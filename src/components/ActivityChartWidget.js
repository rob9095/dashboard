import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Menu, Dropdown, Button, Icon, message } from "antd";



class ActivityChartWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [10770, 10985, 10402, 10809, 10232, 9760, 9847, 10422, 10668],
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday',],
    }
    this.data = (canvas) => {
      const {data,labels} = this.state
      const ctx = canvas.getContext("2d")
		  const gradient = ctx.createLinearGradient(154.000, 10.000, 146.000, 280.000);
      gradient.addColorStop(0.0, "rgba(25, 144, 255, 0.5)");
      gradient.addColorStop(0.8, "rgba(231, 244, 254, 0.0)");
      return {
        labels,
        datasets: [
          {
            backgroundColor: gradient,
            borderColor: 'rgb(25, 144, 255)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255,99,132,0.40)',
            hoverBorderColor: 'rgba(25, 144, 255, 0.322)',
            pointRadius: [0,4,4,4,4,4,4,4,0],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointBorderColor: "rgb(25, 144, 255)",
            data,
          }
        ]
      }
    };
  }

  getPercentChange = (data) => {
    const percents = data.map((num,i,arr)=>{
      let val = data.length-1 !== i ? num - arr[i+1] : null
      if (val) {
        return (val/num) * 100
      }
    }).filter(n=>n!==undefined)
    return ((percents.reduce(( p, c ) => p+c, 0) / percents.length) * 100).toFixed(2);
  }

  getNumWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    const percentChange = this.getPercentChange(this.state.data)
    return <div className="stkd-widget stkd-content no-pad">
        <div className="activityChart-widget flex flex-col space-between">
          <div className="data-wrapper full-pad">
            <div className="header flex space-between align-items-center">
              <h2 className="no-margin">Daily Views</h2>
              <Dropdown overlay={menu}>
                <Icon 
                  type={this.props.icon}
                  theme={this.props.iconTheme}
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </Dropdown>
            </div>
            <div className="stat flex space-between align-items-center">
              <h1 className="no-margin" style={{color: this.props.accentColor}}>
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
                      suggestedMin: 9000,
                      suggestedMax: 11000,
                    }
                  }]
                }
              }} />
          </div>
          <div className="absolute bottom left full-pad">
            <div className="stkd-content flex align-items-center">
              {percentChange >= 0 ?
                <Icon type="plus-circle" theme={"twoTone"} twoToneColor="#34bfa3" />
                :
                <Icon type="minus-circle" theme={"twoTone"} twoTwoneColor="#f4516c" />
              }
              <h3 className="no-margin" style={{paddingLeft: '10px', color: 'rgba(0, 0, 0, 0.43)'}}>{percentChange}% {percentChange >= 0 ? 'Increase' : 'Decrease'}</h3>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default ActivityChartWidget;
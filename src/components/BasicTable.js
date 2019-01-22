import React, { Component } from 'react';
import { Table } from 'antd';

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {"key":1,"first_name":"Cleon","last_name":"Brave","email":"cbrave0@nhs.uk","location":"51699 Melvin Way"},
        {"key":2,"first_name":"Gwyneth","last_name":"Snell","email":"gsnell1@si.edu","location":"370 Village Green Center"},
        {"key":3,"first_name":"Laurel","last_name":"Sparwell","email":"lsparwell2@psu.edu","location":"66 Raven Alley"},
        {"key":4,"first_name":"Timmie","last_name":"Dumbar","email":"tdumbar3@about.me","location":"0912 Vera Drive"},
        {"key":5,"first_name":"Buiron","last_name":"Benadette","email":"bbenadette4@tmall.com","location":"64 Calypso Parkway"}
      ],
      columns: [{
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
      }, {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
      }, {
        title: 'Address',
        dataIndex: 'location',
        key: 'location',
      },{
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a title={record.email} href={"mailto:"+record.email}>Email</a>
          </span>
        ),
      }]
    }
  }
  render() {
    return(
      <Table
        pagination={this.props.pagination}
        columns={this.state.columns}
        dataSource={this.state.data}
      />
    )
  }
}

export default BasicTable;
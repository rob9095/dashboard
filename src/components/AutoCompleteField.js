import React, { Component } from 'react';
import { AutoComplete } from 'antd';
import { getAllModelDocuments } from '../store/actions/models';

function onSelect(value) {
  console.log('onSelect', value);
}

class AutoCompleteField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  handleSearch = (val) => {
    console.log(val)
    this.setState({data: this.state.data.filter(item=>item.toLowerCase().includes(val.toLowerCase()))})
  }

  handleChange = (value) => {
    this.props.onUpdate(value,this.props.key)
  }

  render() {
    const { data } = this.state;
    console.log(data)
    return (
      <AutoComplete
        dataSource={data}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default AutoCompleteField;
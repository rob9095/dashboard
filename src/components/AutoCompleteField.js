import React, { Component } from 'react';
import { AutoComplete, Avatar, Select, Spin } from 'antd';
const Option = Select.Option;

class AutoCompleteField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
    }
  }

  handleSearch = (val) => {
    this.setState({data: this.props.data.filter(item=>item[this.props.searchKey].toLowerCase().includes(val.toLowerCase()))})
  }

  onChange = (value,option) => {
    this.props.onUpdate({key: option.key, value:value, ...option.props.data },this.props.id)
  }

  render() {
    const children = this.state.data.map(item=>(
      <Option key={item.id} value={item[this.props.searchKey]} data={{...item}}>
        {item.avatar ? <Avatar src={item.avatar} /> : null}
        <span style={{marginLeft: 10}}>
          {item[this.props.searchKey]}
        </span>
      </Option>
    ))
    return (
      <Select
        showSearch
        value={this.props.selected.value}
        placeholder={this.props.placeholder}
        notFoundContent={this.props.notFound || null }
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.onChange}
        onSelect={this.onChange}
      >
        {children}
      </Select>
    );
  }
}

export default AutoCompleteField;
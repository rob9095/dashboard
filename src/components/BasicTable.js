import React, { Component } from 'react';
import { Button, Icon, Table, Input, InputNumber, Popconfirm, Form, Pagination } from "antd";
import IconDropDown from './IconDropDown';
import mockData from '../data/mockData';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}


class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      editingKey: '',
      searchText: '',
      sorter: {},
      data: mockData.tableData,
      columns: [{
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        sorter: true,
        width: 150,
        editable: true,
        ...this.getColumnSearchProps('first_name')
      }, {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        sorter: true,
        width: 50,
        editable: true,
        ...this.getColumnSearchProps('last_name')
      }, {
        title: 'Address',
        dataIndex: 'location',
        key: 'location',
        sorter: true,
        width: 200,
        editable: true,
        ...this.getColumnSearchProps('location')
      },{
        title: 'Action',
        key: 'action',
        width: 100,
        className: 'justify-content-center',
        render: (text, record) => (
          <div className="flex justify-content-center align-items-center">
            <EditableContext.Consumer>
            {form => (
                <IconDropDown
                  icon={'ellipsis'}
                  iconTheme={'outlined'}
                  dropDownPlacement={'bottomCenter'}
                  iconSize={'1rem'}
                  noBorder
                  options={
                    this.isEditing(record) ?
                      [
                        { id: 1, text: "Save", icon: 'check', iconTheme: 'outlined', rowKey: record.key },
                        { id: 2, text: "Cancel", icon: 'delete', iconTheme: 'outlined', rowKey: record.key },
                      ]
                      :
                      [
                        { id: 1, text: "Update", icon: 'reload', iconTheme: 'outlined', rowKey: record.key },
                        { id: 2, text: "Email", icon: 'mail', iconTheme: 'outlined', rowKey: record.key },
                        { id: 3, text: "Delete", icon: 'delete', iconTheme: 'outlined', rowKey: record.key },
                      ]
                  }
                  onSelect={(args)=> this.isEditing(record) ? this.handleSelect({...args, form}) : this.handleSelect(args)}
                />
            )}
            </EditableContext.Consumer>
          </div>
        ),
      }],
      pagination: {
        position: 'bottom',
        defaultPageSize: 5,
        pageSize: 5,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5','10','20','50','100','250'],
        size: 'small',
        onChange: (page, pageSize) => {
          this.updatePagination(page, pageSize)
        },
        onShowSizeChange: (page, pageSize) => {
          this.updatePagination(page, pageSize)
        },
      },
      rowSelection: {},
    }
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div className="stkd-content">
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${this.state.columns.find(c=>c.dataIndex === dataIndex).title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? this.props.accentColor : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <span>{text}</span>
    ),
  })

  toggle = (key) => this.setState({[key]: !this.state[key]})

  updatePagination = (page,pageSize) => {
    this.toggle('loading')
    this.setState({
      pagination: {
        current: page,
        pageSize,
      },
    })
    setTimeout(()=>{
      this.toggle('loading')
    }, 500)
  }

  handleSelect = ({text, id, rowKey, form}) => {
    switch(text) {
      case 'Update':
      this.edit(rowKey)
      break;
      case 'Save':
      this.save(form,rowKey)
      break;
      case 'Cancel':
      this.cancel()
      break;
      case 'Delete':
      this.delete(rowKey)
      break;
    }
  } 

  isEditing = record => record.key === this.state.editingKey;

  delete = (key) => {
    this.setState({data: this.state.data.filter(r=>r.key !== key)})
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleTableChange = async (pagination,filters,sorter) => {
    const { order, columnKey } = this.state.sorter
    if (!sorter.columnKey) {
      return
    }
    this.setState({
      sorter,
      data: this.state.data.sort((a,b)=>(
        sorter.order === 'descend' ? 
        (a[sorter.columnKey] < b[sorter.columnKey]) ? -1 : (a[sorter.columnKey] > b[sorter.columnKey]) ? 1 : 0
        :
        (a[sorter.columnKey] > b[sorter.columnKey]) ? -1 : (a[sorter.columnKey] < b[sorter.columnKey]) ? 1 : 0
      ))
    })
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.state.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataType === 'number' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return(
      <div className={this.props.contain ? 'stkd-content stkd-widget contain' : 'stkd-content stkd-widget'}>
        <div className="stkd-table contain">
          <Table
            scroll={{y:240 }}
            loading={this.state.loading}
            components={components}
            columns={columns}
            dataSource={this.state.data}
            rowClassName="editable-row"
            pagination={this.state.pagination}
            rowSelection={this.state.rowSelection}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

export default BasicTable;
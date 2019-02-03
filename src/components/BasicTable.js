import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Pagination } from "antd";
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
      data: mockData.tableData,
      columns: [{
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        width: '25%',
        editable: true,
      }, {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        width: '25%',
        editable: true,
      }, {
        title: 'Address',
        dataIndex: 'location',
        key: 'location',
        width: '30%',
        editable: true,
      },{
        title: 'Action',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <div>
            <EditableContext.Consumer>
            {form => (
                <IconDropDown
                  icon={'ellipsis'}
                  iconTheme={'outlined'}
                  dropDownPlacement={'bottomRight'}
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
        current: 1,
        total: 0,
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
    }
  }

  toggle = (key) => this.setState({[key]: !this.state[key]})

  updatePagination = (page,pageSize) => {
    console.log({
      page,
      pageSize,
    })
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
            scroll={{y:240}}
            loading={this.state.loading}
            components={components}
            columns={columns}
            dataSource={this.state.data}
            rowClassName="editable-row"
            pagination={this.state.pagination}
          />
        </div>
      </div>
    )
  }
}

export default BasicTable;
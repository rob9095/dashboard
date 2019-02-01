import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
import IconDropDown from './IconDropDown';

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
      editingKey: '',
      data: [
        {"key":1,"first_name":"Cleon","last_name":"Brave","email":"cbrave0@nhs.uk","location":"51699 Melvin Way"},
        {"key":2,"first_name":"Gwyneth","last_name":"Snell","email":"gsnell1@si.edu","location":"370 Village Green Center"},
        {"key":3,"first_name":"Laurel","last_name":"Sparwell","email":"lsparwell2@psu.edu","location":"66 Raven Alley"},
        {"key":4,"first_name":"Timmie","last_name":"Dumbar","email":"tdumbar3@about.me","location":"0912 Vera Drive"},
        {"key":5,"first_name":"Buiron","last_name":"Benadette","email":"bbenadette4@tmall.com","location":"64 Calypso Parkway"},
        {"key":6,"first_name":"John","last_name":"Turnwell","email":"jjturnwell23@tmailed.com","location":"186 Wayco Blvd"}
      ],
      columns: [{
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        editable: true,
      }, {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        editable: true,
      }, {
        title: 'Address',
        dataIndex: 'location',
        key: 'location',
        editable: true,
      },{
        title: 'Action',
        key: 'action',
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
      }]
    }
  }

  handleSelect = ({text, id, rowKey, form}) => {
    switch(text) {
      case 'Update':
      this.edit(rowKey)
      case 'Save':
      this.save(form,rowKey)
      case 'Cancel':
      this.cancel()
      case 'Delete':
      this.delete(rowKey)
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
        <Table
          components={components}
          pagination={this.props.pagination}
          columns={columns}
          dataSource={this.state.data}
          rowClassName="editable-row"
        />
      </div>
    )
  }
}

export default BasicTable;
import React, { Component } from 'react';
import 'quill/dist/quill.snow.css';
import Quill  from 'quill';
import { Input, Button, Form, Divider, Tooltip } from 'antd';

class SimpleMailComposer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputs: [
        { id: 1, text: 'To', required: true, },
        { id: 2, text: 'CC' },
        { id: 3, text: 'Subject' },
      ]
    }
  }
  componentDidMount() {
    const editor = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Your Message',
      theme: 'snow'  // or 'bubble'
    });
    const editorContent = this.props.forward ? 
      [
        { insert: '\n\n' },
        { insert: '============ Forwarded message ============\n'},
        { insert: `From: ${this.props.values.name} <${this.props.values.to}>\n` },
        { insert: `Date: ${this.props.values.date}\n` },
        { insert: `Subject: ${this.props.values.subject}\n` },
        { insert: '============ Forwarded message ============\n\n' },
        { insert: this.props.values.content },
      ]
    :
      [
        { insert: '\n\n' },
        { insert: `--- On ${this.props.values.date} ` },
        { insert: `${this.props.values.name} <${this.props.values.to}> `, attributes: { bold: true } },
        { insert: 'wrote ---' },
        { insert: '\n\n' },
        { insert: this.props.values.content },
      ]
    editor.setContents(editorContent);
    this.props.forward ? this.ToInput.focus() : editor.focus()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const values = {
      ...this.props.values,
      subject: this.props.forward ? 'Fwd: ' + this.props.values.subject : this.props.values.subject,  
    }
    return(
      <Form onSubmit={this.handleSubmit}>
        <div className="mail-composer" style={{ margin: '10px 0px' }}>
          {this.state.inputs.map(i => (
            <Form.Item 
              key={i.text}
            >
              {getFieldDecorator(i.text, {initialValue: this.props.forward && i.text !== "Subject" ? '' : values[i.text.toLowerCase()]},{
                rules: [{ required: i.required, message: `${i.text} is required` }],
              })(
                <Input prefix={i.text !== "Subject" ? <span style={{color: '#bfbfbf'}}>{i.text}</span> : ''} ref={node => { this[i.text+"Input"] = node; }} placeholder={i.text !== "Subject" ? '' : 'Subject'} />
              )}
            </Form.Item>
          ))}
          <div id="editor" style={{ height: 200 }} />
          <div className="flex space-between" style={{ margin: '10px 0px' }}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
            <div>
              <Tooltip title="Save Draft">
                <Button onClick={()=>this.props.onToggle('mailComposer')} className="no-border" icon="save" />
              </Tooltip>
              <Divider type="vertical" style={{ margin: 0, width: 2 }} />
              <Tooltip title="Delete Reply">
                <Button onClick={() => this.props.onToggle('mailComposer')} className="no-border" icon="delete" />
              </Tooltip>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

const MailComposer = Form.create({})(SimpleMailComposer);

export default MailComposer
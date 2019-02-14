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

  setEditorContent = (props) => {
    const editorContent = props.type === 'forward' ?
      [
        { insert: '\n\n' },
        { insert: '============ Forwarded message ============\n' },
        { insert: `From: ${props.values.name} <${props.values.to}>\n` },
        { insert: `Date: ${props.values.date}\n` },
        { insert: `Subject: ${props.values.subject}\n` },
        { insert: '============ Forwarded message ============\n\n' },
        { insert: props.values.content },
      ]
      :
      [
        { insert: '\n\n' },
        { insert: `--- On ${props.values.date} ` },
        { insert: `${props.values.name} <${props.values.to}> `, attributes: { bold: true } },
        { insert: 'wrote ---' },
        { insert: '\n\n' },
        { insert: props.values.content },
      ]
    this.editor.setContents(editorContent);
    props.type === 'reply' ? this.editor.focus() : this.ToInput.focus() 
  }

  componentDidMount() {
    this.editor = new Quill('#editor', {
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
    this.props.mailId !== 'new' && this.setEditorContent(this.props)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.mailId !== this.props.mailId || newProps.type !== this.props.type) {
      this.setEditorContent(newProps)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          ...values,
          editor: this.editor.getContents(),
        }
        console.log('Received values of form: ', values);
        this.props.onMailAction({text: 'Send'},null)
        this.props.onToggle({})
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
              {getFieldDecorator(i.text, {initialValue: this.props.type === 'forward' && i.text !== "Subject" ? '' : values[i.text.toLowerCase()]},{
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
                <Button onClick={()=>this.props.onToggle({})} className="no-border" icon="save" />
              </Tooltip>
              <Divider type="vertical" style={{ margin: 0, width: 2 }} />
              <Tooltip title="Delete Reply">
                <Button onClick={() => this.props.onToggle({})} className="no-border" icon="delete" />
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
import React, { Component } from "react";
import theme from "../theme";
import mockData from "../data/mockData";
import MailList from "../components/MailList";
import MailContent from "../components/MailContent";
import MailNav from "../components/MailNav";
import { message } from 'antd';

const showMessage = (config) => {
  const { string, type } = config
  message[type](string);
};

class MailApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakpoint: 992,
      mobileBreakpoint: 480,
      currentNavItem: {},
      mailComposer: {},
      data: mockData.mailData.map(m => ({
        ...m,
        color: theme.colors[Object.keys(theme.colors)[Math.floor(Math.random() * Object.keys(theme.colors).length)]]
      })),
      navList: [
        { id: '1', text: "Inbox", icon: "inbox"},
        { id: '2', text: "Drafts", icon: "save" },
        { id: '3', text: "Important", icon: "star"},
        { id: '4', text: "Sent", icon: "export" },
        { id: '5', text: "Spam", icon: "warning" },
        { id: '6', text: "Deleted", icon: "delete" },
        { id: '7', text: "Personal", color: theme.colors.main, isLabel: true },
        { id: '8', text: "Family", color: theme.colors.purple, isLabel: true },
        { id: '9', text: "Friends", color: theme.colors.orange, isLabel: true },
        { id: '10', text: "Work", color: theme.colors.green, isLabel: true }
      ],
    };
  }

  componentDidMount() {
    this.handleMailNavMenuClick(this.state.navList[0])
  }

  toggleBreakpoint = () => {
    const breakpoint = this.state.breakpoint > 992 ? 992 : 9999
    this.setState({breakpoint})
  }

  handleMailNavMenuClick = (currentNavItem) => {
    currentNavItem = {
      ...currentNavItem,
      text: currentNavItem.text.toLowerCase(),
      prop: currentNavItem.isLabel ? 'label' : 'folder',
    }
    this.setState({currentNavItem})
    this.props.clientWidth < this.state.breakpoint && this.setCurrentMail(null)
  }
  
  setMailComposer = async (mailComposer) => {
    await this.setState({mailComposer})
  }

  setCurrentMail = (id) => {
    this.setState({currentMailId: id, mailComposer: {}})
  }

  handleMailUpdate = (id,key,value,) => {
    return new Promise(async(resolve,reject) => {
      const data = this.state.data.map(m => m.id === id ? {...m, [key]: value} : m)
      await this.setState({
        data,
      })
      resolve()
    })
  }

  handleDropdownSelect = async (val,id) => {
    switch (val.text) {
      case 'Mark Unread':
        this.handleMailUpdate(id, "unread", true);
        break;
      case 'Mark Read':
        this.handleMailUpdate(id, "unread", false);
        break;
      case 'Reply':
        this.setCurrentMail(id)
        this.handleMailUpdate(id, "unread", false);
        this.setMailComposer({type: 'reply'})
        break;
      case 'Forward':
        this.setCurrentMail(id)
        this.handleMailUpdate(id, "unread", false);
        this.setMailComposer({type: 'forward'})
        break;  
      case 'Print':
        window.print()
        break;
      case 'Delete':
        this.handleMailUpdate(id, "folder", "deleted");
        this.setCurrentMail(null)
        showMessage({
          string: 'Message Deleted',
          type: 'error',
        })
        break;
      case 'Send':
        showMessage({
          string: 'Message Sent',
          type: 'success',
        })
        this.setCurrentMail(null)
        break;
    }

    if (this.state.navList.find(l => l.text.toLowerCase() === val.text.toLowerCase() && l.isLabel)) {
      this.handleMailUpdate(id, "label", val.text.toLowerCase());
      showMessage({
        string: 'Message labeled as ' + val.text,
        type: 'success',
      })
    } else if (this.state.navList.find(l => l.text.toLowerCase() === val.text.toLowerCase())) {
      this.handleMailUpdate(id, "folder", val.text.toLowerCase());
      showMessage({
        string: 'Message moved to ' + val.text,
        type: 'success',
      })
    }
  }

  handleNewLabel = (text,color) => {
    this.setState({
      navList: [...this.state.navList, {id: text, color, text, isLabel: true}]
    })
  }
  
  render() {
    const mailItem = this.state.data.find(item => item.id === this.state.currentMailId);
    return (
      <div className="stkd-widget" style={{ width: "100%" }}>
        <div
          className="mail-app flex"
          style={{ height: "100%", background: "#fff", width: "100%" }}
        >
          <div className="flex" style={{
            flexDirection: this.props.clientWidth > this.state.mobileBreakpoint ? 'row' : 'column',
            height: "100%",
            width: "100%",
          }}>
            <div
              style={{
                borderRight: "2px solid #eee",
                borderLeft: "2px solid #eee",
                minHeight: 60,
                minWidth:
                  this.props.clientWidth < this.state.breakpoint ? 50 : 250
              }}
              className="mail-nav contain"
            >
              <MailNav
                data={this.state.data}
                labelList={this.state.navList.filter(m => m.isLabel)}
                navList={this.state.navList.filter(m => !m.isLabel)}
                onMenuClick={this.handleMailNavMenuClick}
                currentNavItem={this.state.currentNavItem}
                showDrawer={this.props.clientWidth < this.state.breakpoint}
                clientWidth={this.props.clientWidth}
                onSetCurrentMail={this.setCurrentMail}
                mailItem={mailItem}
                onSetMailComposer={this.setMailComposer}
                onNewLabel={this.handleNewLabel}
                mobileBreakpoint={this.state.mobileBreakpoint}
              />
            </div>
            <div
              style={{
                borderRight: "2px solid #eee",
                borderLeft: "2px solid #eee",
                display:
                  this.props.clientWidth < this.state.breakpoint && mailItem || this.props.clientWidth < this.state.breakpoint && this.state.mailComposer.type === 'new'
                    ? "none"
                    : "inherit",
                width: mailItem ? "60%" : "100%",
                height: '100%',
              }}
              className="mail-list"
            >
              <MailList
                mailItem={mailItem}
                onMailUpdate={this.handleMailUpdate}
                onSetCurrentMail={this.setCurrentMail}
                data={this.state.data.filter(item => item[this.state.currentNavItem.prop] === this.state.currentNavItem.text).filter(m=>(this.state.currentNavItem.prop !== 'label' || m.folder !== 'deleted'))}
                labelList={this.state.navList.filter(l => l.isLabel)}
                onDropdownSelect={this.handleDropdownSelect}
                currentNavItem={this.state.currentNavItem}
              />
            </div>
            {mailItem || this.state.mailComposer.type === 'new' ? (
              <div
                style={{
                  borderLeft: "2px solid #eee",
                  borderRight: "2px solid #eee",
                  width: "100%"
                }}
                className="mail-content contain"
              >
                <MailContent
                  mailItem={mailItem}
                  labelList={this.state.navList.filter(l => l.isLabel)}
                  navList={this.state.navList.filter(l => !l.isLabel)}
                  data={this.state.data.filter(item =>item[this.state.currentNavItem.prop] ===this.state.currentNavItem.text)}
                  onMailUpdate={this.handleMailUpdate}
                  onSetCurrentMail={this.setCurrentMail}
                  onDropdownSelect={this.handleDropdownSelect}
                  onToggleBreakpoint={this.toggleBreakpoint}
                  showExpand={this.props.clientWidth > 992}
                  mailComposer={this.state.mailComposer}
                  onSetMailComposer={this.setMailComposer}
                />
              </div>
            ): null}
          </div>
        </div>
      </div>
    );
  }
}

export default MailApp;

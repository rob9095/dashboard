import React, { Component } from 'react';
import { Button, Icon, Avatar, Tag, Tooltip } from "antd";
import IconDropDown from "../components/IconDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from "../theme";
import {
  faReply,
  faReplyAll,
  faAngleDown,
  faLongArrowAltRight
} from "@fortawesome/free-solid-svg-icons";

const ButtonGroup = Button.Group;
const moment = require("moment");

class MailContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="mail-content half-pad contain">
        <div
          className="mail-content-header flex space-between align-items-center"
          style={{ minHeight: 40 }}
        >
          <div>
            <ButtonGroup>
              <Tooltip title={"Important"}>
                <Button>
                  <Icon type="star" />
                </Button>
              </Tooltip>
              <Tooltip title={"Report Spam"}>
                <Button>
                  <Icon type="warning" />
                </Button>
              </Tooltip>
              <IconDropDown
                icon={"folder-open"}
                iconTheme={"outlined"}
                iconSize={"16px"}
                options={[
                  {
                    id: 5,
                    text: "Move to",
                    icon: "folder-add",
                    iconTheme: null,
                    subMenuOptions: [
                      { id: 2, text: "Important", icon: "star" },
                      { id: 3, text: "Spam", icon: "warning" }
                    ]
                  },
                  {
                    id: 6,
                    text: "Label as",
                    icon: "plus-circle",
                    iconTheme: null,
                    subMenuOptions: this.props.labelList
                  }
                ]}
              />
            </ButtonGroup>
          </div>
          <Tag color={theme.colors.main}>Inbox</Tag>
          <div className="flex align-items-center">
            {/* <ButtonGroup>
                    <Button>
                      <FontAwesomeIcon icon={faReply} />
                    </Button>
                    <Button>
                      <FontAwesomeIcon icon={faReplyAll} />
                    </Button>
                    <Button>
                      <FontAwesomeIcon icon={faLongArrowAltRight} />
                    </Button>
                    <Button>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </Button>
                  </ButtonGroup> */}
            <ButtonGroup>
              <Tooltip title={"Older"}>
                <Button>
                  <Icon type="left" />
                </Button>
              </Tooltip>
              <Tooltip title={"Newer"}>
                <Button>
                  <Icon type="right" />
                </Button>
              </Tooltip>
              <IconDropDown
                icon={"down"}
                iconTheme={"outlined"}
                iconSize={"16px"}
                dropDownPlacement={"bottomRight"}
                options={[
                  {
                    id: 1,
                    text: "Reply",
                    icon: "vertical-right",
                    iconTheme: null
                  },
                  {
                    id: 2,
                    text: "Reply All",
                    icon: "double-left",
                    iconTheme: null
                  },
                  {
                    id: 3,
                    text: "Foward",
                    icon: "arrow-right",
                    iconTheme: null
                  },
                  {
                    id: 4,
                    text: "Mark Unread",
                    icon: "eye",
                    iconTheme: null
                  },
                  {
                    id: 5,
                    text: "Print",
                    icon: "printer",
                    iconTheme: null
                  },
                  {
                    id: 6,
                    text: "Delete",
                    icon: "delete",
                    iconTheme: null
                  }
                ]}
              />
            </ButtonGroup>
          </div>
        </div>
        <div
          className="flex align-items-center space-between"
          style={{ marginTop: 10 }}
        >
          <span style={{ fontSize: 12 }}>
            {moment(new Date(this.props.mailItem.date)).format(
              "dddd, MMMM Do YYYY, h:mm A"
            )}
          </span>
        </div>
        <div className="mail-from flex align-items-center">
          <div className="mail-from-avatar">
            {this.props.mailItem.avatar ?
              <Avatar src={this.props.mailItem.avatar} />
            :
              <Avatar
                style={{background: theme.colors[Object.keys(theme.colors)[Math.floor(Math.random() * Object.keys(theme.colors).length)]]}}
              >
              {this.props.mailItem.first_name[0]+this.props.mailItem.last_name[0]}
              </Avatar>
            }
          </div>
          <div className="half-pad">
            <div className="mail-from-details flex flex-col">
              <span className="mail-from-contact flex">
                <h4>
                  {this.props.mailItem.first_name +
                    " " +
                    this.props.mailItem.last_name}
                </h4>
                <span style={{ marginLeft: 10 }}>
                  {"<"}
                  {this.props.mailItem.email_address}
                  {">"}
                </span>
              </span>
              <span className="mail-to-contact">
                to
                <strong> me </strong>
                <FontAwesomeIcon size={"xs"} icon={faAngleDown} />
              </span>
            </div>
          </div>
        </div>
        <h1 style={{ textTransform: "capitalize" }}>
          {this.props.mailItem.subject}
        </h1>
        <p style={{ margin: "24px 0px 34px 0px", lineHeight: "25px" }}>
          {this.props.mailItem.content}
        </p>
        {this.props.mailItem.attachments && (
          <div className="flex">
            {this.props.mailItem.attachments.map(a=>(
              <div
                key={a.name + this.props.mailItem.id}
                className="flex align-items-center"
                style={{
                  padding: "0px 10px 0px 10px",
                  borderRadius: 5,
                  border: "1px solid #d9d9d9",
                  marginRight: 10,
                  minWidth: "150px"
                }}
              >
                <div>
                  <Icon type="paper-clip" style={{ fontSize: "2rem" }} />
                </div>
                <div className="half-pad">
                  <div className="file-info flex flex-col">
                    <h4 className="file-name">{a.name}</h4>
                    <span className="file-size" style={{ fontSize: 12 }}>
                      {parseFloat(a.size * 0.001).toFixed(0) + ' KB'}
                    </span>
                  </div>
                  <div className="file-options" style={{ marginTop: ".5em" }}>
                    <Button
                      className="no-border"
                      style={{ fontSize: "1rem", padding: 5, marginRight: 5 }}
                    >
                      <Icon type="download" />
                    </Button>
                    <Button
                      className="no-border"
                      style={{ fontSize: "1rem", padding: 5, marginRight: 5 }}
                    >
                      <Icon type="eye" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex align-items center" style={{ marginTop: 24 }}>
          <Button
            type="primary"
            size="large"
            style={{ fontWeight: 600, marginRight: 10 }}
          >
            <FontAwesomeIcon icon={faReply} /> Reply
          </Button>
          <Button size="large" style={{ fontWeight: "bold" }}>
            <FontAwesomeIcon icon={faLongArrowAltRight} /> Foward
          </Button>
        </div>
      </div>
    );
  }
}

export default MailContent;
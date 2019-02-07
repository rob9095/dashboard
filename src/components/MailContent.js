import React, { Component } from 'react';
import { Button, Icon, Avatar, Tag, Tooltip, Divider } from "antd";
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

const ReplySvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 512">
  <g>
    <g>
      <path d="M171.154,312.882L45.846,187.142c-7.799-7.798-7.799-20.486-0.032-28.252L171.098,34.174
        c7.828-7.793,7.856-20.456,0.063-28.284c-7.792-7.829-20.455-7.856-28.284-0.064L17.56,130.574
        c-23.393,23.394-23.393,61.458-0.023,84.828l125.284,125.716c3.907,3.921,9.036,5.882,14.166,5.882
        c5.107,0,10.215-1.944,14.119-5.834C178.929,333.369,178.952,320.706,171.154,312.882z"/>
    </g>
  </g>
  <g>
    <g>
      <path d="M332.487,153h-213.5c-11.046,0-20,8.954-20,20s8.954,20,20,20h213.5c76.921,0,139.5,62.58,139.5,139.5
        S409.408,472,332.487,472c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20c98.977,0,179.5-80.523,179.5-179.5
        S431.464,153,332.487,153z"/>
    </g>
  </g>
</svg>
)

const ReplyAllSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 512">
    <g>
      <g>
        <path
          d="M282.154,312.882l-125.308-125.74c-7.799-7.798-7.799-20.486-0.032-28.252L282.098,34.174
			c7.828-7.793,7.856-20.456,0.063-28.284c-7.793-7.829-20.456-7.856-28.284-0.064L128.56,130.574
			c-23.393,23.394-23.393,61.458-0.023,84.828l125.284,125.716c3.907,3.921,9.036,5.882,14.166,5.882
			c5.107,0,10.215-1.944,14.119-5.834C289.929,333.369,289.952,320.706,282.154,312.882z"
        />
      </g>
    </g>
    <g>
      <g>
        <path
          d="M171.154,312.882L45.846,187.142c-7.799-7.798-7.799-20.486-0.032-28.252L171.098,34.174
			c7.828-7.793,7.856-20.456,0.063-28.284c-7.792-7.829-20.455-7.856-28.284-0.064L17.56,130.574
			c-23.393,23.394-23.393,61.458-0.023,84.828l125.284,125.716c3.907,3.921,9.036,5.882,14.166,5.882
			c5.107,0,10.215-1.944,14.119-5.834C178.929,333.369,178.952,320.706,171.154,312.882z"
        />
      </g>
    </g>
    <g>
      <g>
        <path
          d="M332.487,153h-101.5c-11.046,0-20,8.954-20,20s8.954,20,20,20h101.5c76.921,0,139.5,62.58,139.5,139.5
			S409.408,472,332.487,472c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20c98.977,0,179.5-80.523,179.5-179.5
			S431.464,153,332.487,153z"
        />
      </g>
    </g>
  </svg>
);

const ReplyAllIcon = props => <Icon component={ReplyAllSvg} {...props} />;
const ReplyIcon = props => <Icon component={ReplySvg} {...props} />;

class MailContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    const mailLabel = this.props.labelList.find(l=>l.text.toLowerCase() === this.props.mailItem.label)
    return (
      <div className="mail-content half-pad contain" style={{paddingTop: 0}}>
        <div
          className="flex space-between align-items-center"
          style={{ minHeight: 60, borderBottom: '2px solid #eee' }}
        >
          <h2 style={{ textTransform: "capitalize", fontSize: 18 }} className="no-margin">
            {this.props.mailItem.subject}
          </h2>
          <div className="flex align-items-center">
            <Tooltip title={"Older"}>
              <Button className="no-border">
                <Icon type="up" />
              </Button>
            </Tooltip>
            <Tooltip title={"Newer"}>
              <Button className="no-border">
                <Icon type="down" />
              </Button>
            </Tooltip>
            <Tooltip title={"Expand"}>
              <Button className="no-border">
                <Icon type="arrow-up" style={{ transform: 'rotate(45deg)' }} />
              </Button>
            </Tooltip>
            <Tooltip title={"Close"}>
              <Button className="no-border">
                <Icon type="close" />
              </Button>
            </Tooltip>             
          </div>
        </div>
        <div className="flex space-between align-items-center" style={{height: 40}}>
          {/* <div>
            <Tooltip title={"Important"}>
              <Button className="no-border">
                <Icon type="star" />
              </Button>
            </Tooltip>
            <Divider type="vertical" style={{ margin: 0, width: 2 }} />
            <Tooltip title={"Report Spam"}>
              <Button className="no-border">
                <Icon type="warning" />
              </Button>
            </Tooltip>
            <Divider type="vertical" style={{ margin: 0, width: 2 }} />
            <IconDropDown
              icon={"folder-open"}
              iconTheme={"outlined"}
              iconSize={"16px"}
              noBorder
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
          </div> */}
          <div style={{ fontSize: 12 }}>
            {moment(new Date(this.props.mailItem.date)).format(
              "dddd, MMMM Do YYYY, h:mm A"
            )}
          </div>
          <div className="flex align-items-center">
            <Tooltip title={"Reply"} placement="bottom">
              <Button className="no-border">
                <ReplyIcon />
              </Button>
            </Tooltip>
            <Divider type="vertical" style={{ margin: 0, width: 2 }} />
            <Tooltip title={"Reply All"} placement="bottom">
              <Button className="no-border">
                <ReplyAllIcon />
              </Button>
            </Tooltip>
            <Divider type="vertical" style={{margin: 0, width: 2}} />
            <IconDropDown
              icon={"down"}
              iconTheme={"outlined"}
              iconSize={"16px"}
              dropDownPlacement={"bottomRight"}
              noBorder
              options={[
                {
                  id: 1,
                  text: "Mark Unread",
                  icon: "eye",
                  iconTheme: null
                },
                {
                  id: 2,
                  text: "Forward",
                  icon: "arrow-right",
                  iconTheme: null
                },
                {
                  id: 3,
                  text: "Print",
                  icon: "printer",
                  iconTheme: null
                },
                {
                  id: 4,
                  text: "Move to",
                  icon: "folder-add",
                  iconTheme: null,
                  subMenuOptions: [
                    { id: 2, text: "Important", icon: "star" },
                    { id: 3, text: "Spam", icon: "warning" }
                  ]
                },
                {
                  id: 5,
                  text: "Label as",
                  icon: "plus-circle",
                  iconTheme: null,
                  subMenuOptions: this.props.labelList
                },
                {
                  id: 6,
                  text: "Delete",
                  icon: "delete",
                  iconTheme: null
                }
              ]}
            />
          </div>
        </div>
        <div className="flex align-items-center">
          <div className="mail-content-tags">
            <Tag color={theme.colors.main}>Inbox</Tag>
            {mailLabel && (
              <Tag color={mailLabel.color} closable>{mailLabel.text}</Tag>
            )}
            <Divider type="vertical" style={{ margin: 0, width: 2 }} />
            <Tooltip title={"Add Label"} placement="bottom">
              <Button className="no-border" style={{ padding: '0px 8px' }}>
                <Icon type="plus-circle" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="mail-from flex align-items-center">
          <div className="mail-from-avatar">
            {this.props.mailItem.avatar ? (
              <Avatar src={this.props.mailItem.avatar} />
            ) : (
              <Avatar
                style={{
                  // background:
                  //   theme.colors[
                  //     Object.keys(theme.colors)[
                  //       Math.floor(
                  //         Math.random() * Object.keys(theme.colors).length
                  //       )
                  //     ]
                  //   ]
                  background: mailLabel && mailLabel.color,
                }}
              >
                {this.props.mailItem.first_name[0] +
                  this.props.mailItem.last_name[0]}
              </Avatar>
            )}
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
                {/* <FontAwesomeIcon size={"xs"} icon={faAngleDown} /> */}
                <Icon type="down" style={{fontSize: '.65rem'}} />
              </span>
            </div>
          </div>
        </div>
        <p style={{ margin: "12px 0px 34px 0px", lineHeight: "25px" }}>
          {this.props.mailItem.content}
        </p>
        {this.props.mailItem.attachments && (
          <div className="flex">
            {this.props.mailItem.attachments.map(a => (
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
                      {parseFloat(a.size * 0.001).toFixed(0) + " KB"}
                    </span>
                  </div>
                  <div
                    className="file-options"
                    style={{ marginTop: ".5em" }}
                  >
                    <Button
                      className="no-border"
                      style={{
                        fontSize: "1rem",
                        padding: 5,
                        marginRight: 5
                      }}
                    >
                      <Icon type="download" />
                    </Button>
                    <Button
                      className="no-border"
                      style={{
                        fontSize: "1rem",
                        padding: 5,
                        marginRight: 5
                      }}
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
            style={{ fontWeight: 600, marginRight: 10 }}
          >
            <ReplyIcon />
            <span style={{marginLeft: 5}}>Reply</span>
          </Button>
          <Button style={{ fontWeight: 600 }}>
            <span>Foward</span>
            <Icon type="arrow-right" style={{ marginLeft: 5 }} />
          </Button>
        </div>
      </div>
    );
  }
}

export default MailContent;
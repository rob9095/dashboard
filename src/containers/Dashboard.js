import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Layout, Menu, Icon, Breadcrumb, Row, Col } from 'antd';
import Navbar from './Navbar';
import NavbarMobile from './NavbarMobile';
import NotFound from '../components/NotFound';
import ProductTable from '../components/ProductTable';
import PurchaseOrderTable from '../components/PurchaseOrderTable';
import PoProductTable from '../components/PoProductTable';
import ProductTableLegacy from '../components/ProductTableLegacy';
import ProgressWidget from '../components/ProgressWidget';
import BasicTable from '../components/BasicTable';
import IconStat from '../components/IconStat';
import IconWidget from '../components/IconWidget';
import ActivityChartWidget from '../components/ActivityChartWidget'
import PieChartWidget from '../components/PieChartWidget';
import TodoWidget from '../components/TodoWidget';
import TicketListWidget from "../components/TicketListWidget";
import TimeLineWidget from "../components/TimeLineWidget";
import BasicWidget from './BasicWidget';
import IconDropDown from '../components/IconDropDown'
import theme from '../theme';
import MailApp from './MailApp';
import ChatApp from './ChatApp';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Color = require('color');

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      clientWidth: 0,
      loginRedirect: false,
      activeMenuItems: [],
    }
  }

  setActiveMenuItem = async (pathname) => {
    let pathArr = pathname.split('/');
    let activeMenuItems = pathArr.map(arg=>{
      if (arg === 'app' && pathArr.length === 2) {
        return arg + 'Home';
      } else {
        return arg
      }
    })
    await this.setState({
      activeMenuItems,
    })
  }

  componentDidMount() {
    if(!this.props.currentUser.isAuthenticated) {
      this.setState({
        loginRedirect: true,
        redirectPath: '/signin',
      })
    }
    this.setState({
      clientWidth: document.documentElement.clientWidth,
    })
    if (this.props.history.location.pathname){
      this.setActiveMenuItem(this.props.location.pathname)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setActiveMenuItem(nextProps.location.pathname)
    }
    if (!nextProps.currentUser.isAuthenticated){
      this.setState({
        loginRedirect: true,
        redirectPath: '/signin',
      })      
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleWindowResize = () => {
    const clientWidth = document.documentElement.clientWidth;
    this.setState({
      clientWidth,
      collapsed: clientWidth <= 1200 ? true : this.state.collapsed,
    })
  }

  handleMenuClick = ({ item, key, keyPath }) => {
    if (key === 'appHome') {
      this.props.history.push(`/app`)
      return
    }
    this.props.history.push(`/app/${key}`)
  }

  render() {
    window.onresize = (e) => {
      this.handleWindowResize();
    }
    if (this.state.loginRedirect){
      return (
        <Redirect to={this.state.redirectPath} />
      )
    }
    return (
      <div className="app-dashboard">
        <div id="app-sidebar" className="app-column">
          <Sider
            width="255"
            collapsedWidth={this.state.clientWidth >= 1000 ? '80' : '0'}
            className="stkd-sidebar"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo">
              {/* {this.state.collapsed ? <h3>logo</h3> : <h3>logo</h3> } */}
            </div>
            <Menu onClick={this.handleMenuClick} theme="dark" mode="inline" selectedKeys={this.state.activeMenuItems}>
              <Menu.Item className="stkd-dark menu-item" key="appHome">
                <Icon type="appstore" theme="outlined" />
                <span>Dashboard</span>
              </Menu.Item>
              <Menu.Item className="stkd-dark menu-item" key="mail-app">
                <Icon type="mail" theme="outlined" />
                <span>Email</span>
              </Menu.Item>
              <Menu.Item className="stkd-dark menu-item" key="chat-app">
                <Icon type="message" theme="outlined" />
                <span>Chat</span>
              </Menu.Item>
              <SubMenu
                className="stkd-dark menu-item"
                key="orders"
                title={<span><Icon type="shopping-cart" theme="outlined" /><span>Orders</span></span>}
              >
                <Menu.Item className="stkd-dark sub-menu-item" key="orders">Open Orders</Menu.Item>
                <Menu.Item className="stkd-dark sub-menu-item" key="order-history">Order History</Menu.Item>
                <Menu.Item className="stkd-dark sub-menu-item" key="add-order">Add Order</Menu.Item>
              </SubMenu>
              <SubMenu
                className="stkd-dark menu-item"
                key="products"
                title={<span><Icon type="tags" theme="outlined" /><span>Inventory</span></span>}
              >
                <Menu.Item className="stkd-dark sub-menu-item" key="products">Manage Products</Menu.Item>
                <Menu.Item className="stkd-dark sub-menu-item" key="purchase-orders">Update Quantity</Menu.Item>
                <Menu.Item className="stkd-dark sub-menu-item" key="scanner">Scanner</Menu.Item>
              </SubMenu>
              <Menu.Item className="stkd-dark menu-item" key="purchase-orders">
                <Icon type="file-done" theme="outlined" />
                <span>Purchase Orders</span>
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
        <div id="app-content" className="app-column">
          <div className="top">
            {this.state.clientWidth >= 1000 ?
              <Navbar
                onSiderToggle={this.toggle}
                collapsed={this.state.collapsed}
                clientWidth={this.state.clientWidth}
                currentUser={this.props.currentUser}
              />
              :
              <NavbarMobile
                onSiderToggle={this.toggle}
                collapsed={this.state.collapsed}
                clientWidth={this.state.clientWidth}
                currentUser={this.props.currentUser}
              />
            }
          </div>
          <div className="app-body">
            <Switch>
              <Route exact path="/app/po-products" render={props => (
                <PoProductTable showHeader {...props} />
              )} />
              <Route exact path="/app/purchase-orders" render={props => (
                <PurchaseOrderTable {...props} />
              )} />
              <Route exact path="/app/products" render={props => (
                <ProductTable {...props} />
              )} />
              <Route exact path="/app/mail-app" render={props => (
                <MailApp clientWidth={this.state.clientWidth} {...props} />
              )} /> 
              <Route exact path="/app/chat-app" render={props => (
                <ChatApp clientWidth={this.state.clientWidth} {...props} />
              )} />              
              <Route exact path="/app" render={props => (
                <div className="full-pad">
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={8}>
                      <BasicWidget
                        title={'Page Views'}
                        actions={(
                          <IconDropDown
                            icon={"ellipsis"}
                            iconTheme={"outlined"}
                            iconSize={"2rem"}
                            dropDownPlacement={"bottomRight"}
                            noBorder={true}
                            buttonStyles={{paddingRight: 0}}
                            options={[
                              { id: 1, text: "Last 7 Days", icon: null, iconTheme: null },
                              { id: 2, text: "Last 2 Weeks", icon: null, iconTheme: null },
                              { id: 3, text: "Last Month", icon: null, iconTheme: null }
                            ]}
                          />
                        )}
                        content={'hi'}
                        footer={'footer'}
                      />
                    </Col>                    
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={8}>
                      <ActivityChartWidget
                        title={'Page Views'}
                        accentColor={theme.colors.main}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <ProgressWidget
                        title={'Project Progress'}
                        footerText={'Lorem ipsum dolor sit amet, wisi decore timeam et vis. Vituperata neglegentur definitionem vim in.'}
                        height={385}
                        icon={null}
                        iconTheme={null}
                        iconColor={null}
                        data={
                          [
                            { id: 1, text: 'UI Design', progress: 75, color: theme.colors.main, showInfo: true, status: 'active' },
                            { id: 2, text: 'API Development', progress: 85, color: Color(theme.colors.main).fade(.2).string(), showInfo: true, status: 'active' },
                            { id: 3, text: 'Sales Analysis', progress: 45, color: Color(theme.colors.main).fade(.4).string(), showInfo: true, status: 'active' },
                            { id: 4, text: 'A/B Testing', progress: 65, color: Color(theme.colors.main).fade(.6).string(), showInfo: true, status: 'active' },
                          ]
                        }
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <PieChartWidget
                        accentColor={theme.colors.main}
                        title={'User Trends'}
                        footerText={'Lorem ipsum dolor sit amet, wisi decore timeam et vis.'}
                      />
                    </Col>
                  </Row>
                  <Row>
                      <Col xs={24} sm={12} md={12} lg={6}>
                          <IconStat
                            icon={'message'}
                            iconTheme={'filled'}
                            title={'Unread Messages'}
                            stat={19}
                            color={theme.colors.main}
                            filled={false}
                          />
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={6}>
                          <IconStat
                            icon={'alert'}
                            iconTheme={'filled'}
                            title={'New Alerts'}
                            stat={16}
                            color={theme.colors.orange}
                            filled={false}
                          />
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={6}>
                          <IconStat
                            icon={'like'}
                            iconTheme={'filled'}
                            title={'Recent Likes'}
                            stat={41}
                            color={theme.colors.green}
                            filled={false}
                          />
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={6}>
                          <IconStat
                            icon={'idcard'}
                            iconTheme={'filled'}
                            title={'New Users'}
                            stat={13}
                            color={theme.colors.purple}
                            filled={false}
                          />
                      </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={12} md={12} lg={6}>
                      <div className="stkd-widget stkd-content">
                        <IconWidget
                          title={'Sales'}
                          stat={'$1300'}
                          text={'Lorem ipsum dolor sit amet, wisi decore timeam et vis. Vituperata neglegentur definitionem vim in.'}
                          accentColor={theme.colors.green}
                          icon={null}
                          iconTheme={null}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6}>
                      <div className="stkd-widget stkd-content">
                        <IconWidget
                          title={'Sales'}
                          stat={'$1300'}
                          text={'Lorem ipsum dolor sit amet, wisi decore timeam et vis. Vituperata neglegentur definitionem vim in.'}
                          accentColor={theme.colors.green}
                          icon={null}
                          iconTheme={null}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6}>
                      <div className="stkd-widget stkd-content">
                        <IconWidget
                          title={'Sales'}
                          stat={'$1300'}
                          text={'Lorem ipsum dolor sit amet, wisi decore timeam et vis. Vituperata neglegentur definitionem vim in.'}
                          accentColor={theme.colors.green}
                          icon={null}
                          iconTheme={null}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6}>
                      <div className="stkd-widget stkd-content">
                        <IconWidget
                          title={'Sales'}
                          stat={'$1300'}
                          text={'Lorem ipsum dolor sit amet, wisi decore timeam et vis. Vituperata neglegentur definitionem vim in.'}
                          accentColor={theme.colors.green}
                          icon={null}
                          iconTheme={null}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                  <Col xs={24} sm={12} md={12} lg={6}>
                        <IconStat
                          icon={'idcard'}
                          iconTheme={'filled'}
                          title={'New Users'}
                          stat={13}
                          //hex format color
                          color={theme.colors.main}
                        />
                        <IconStat
                          icon={'message'}
                          iconTheme={'filled'}
                          title={'Unread Messages'}
                          stat={28}
                          //hex format color
                          color={theme.colors.purple}
                        />
                        <IconStat
                          icon={'like'}
                          iconTheme={'filled'}
                          title={'Recent Likes'}
                          stat={23}
                          //hex format color
                          color={theme.colors.green}
                        />                        
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6}>
                        <ProgressWidget
                          title={'Bugs Fixed'}
                          footerText={null}
                          icon={'trophy'}
                          iconColor={theme.colors.main}
                          iconTheme={"filled"}
                          data={
                            [
                              { id: 1, text: null, progress: 60, color: theme.colors.main, showInfo: false, status: 'active' },
                            ]
                          }
                        />
                        <ProgressWidget
                          title={'Feedback'}
                          footerText={null}
                          icon={'smile'}
                          iconColor={theme.colors.green}
                          iconTheme={"filled"}
                          data={
                            [
                              { id: 1, text: '90% Positive Reviews', progress: 90, color: theme.colors.green, showInfo: false, status: 'active' },
                            ]
                          }
                        />
                        <ProgressWidget
                          title={'Tickets'}
                          footerText={null}
                          icon={'question-circle'}
                          iconColor={theme.colors.orange}
                          iconTheme={"filled"}
                          data={
                            [
                              { id: 1, text: '60% Tickets Answered', progress: 60, color: theme.colors.orange, showInfo: false, status: 'active' },
                            ]
                          }
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <BasicTable
                        pagination={false}
                        contain
                        accentColor={theme.colors.main}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <TodoWidget
                          title={"Current Tasks"}
                          data={
                            [
                              { id: 1, title: 'UI Design', description: 'By Ron', color: theme.colors.main },
                              { id: 2, title: 'API Development', description: 'By Susan', color: theme.colors.orange },
                              { id: 3, title: 'Sales Analysis', description: 'By Allen', color: theme.colors.green },
                              { id: 4, title: 'A/B Testing', description: 'By Elsie', color: theme.colors.purple },    
                              { id: 5, title: 'User Survey', description: 'By Karen', color: theme.colors.main },
                              { id: 6, title: 'Check Logs', description: 'By John', color: theme.colors.orange },                         
                            ]
                          }
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <TicketListWidget
                          title={"Support Tickets"}
                          data={
                            [
                              { id: 1, title: 'UI Design', description: 'Eu eum volutpat repudiare, ius exerci soleat malorum at. Cibo corpora intellegat eu sea. Veri exerci et sea. Illud aliquip an mei, an civibus dolores contentiones vix, eirmod integre mei at.', date: 'Today', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', color: theme.colors.main, status: 'pending' },
                              { id: 2, title: 'API Development', description: 'Ferri labores adversarium ad duo, sed prima soleat et, quo ut facilisi inciderint. Pro ut aliquid suscipit, sit at dicat recusabo. Munere suscipiantur te vix, qui in reque dolore admodum. No civibus facilisis pri.', date: '1 day ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', color: theme.colors.orange, status: 'open' },
                              { id: 3, title: 'Sales Analysis', description: 'Duo cetero fastidii placerat cu, in quo nostro referrentur. Te erant invidunt est, per tantas essent te. Et pro dicat delenit. No error vocibus adipisci has, velit appetere has te.', date: '2 weeks ago', avatar: 'https://randomuser.me/api/portraits/men/86.jpg', color: theme.colors.green, status: 'complete' },
                            ]
                          }
                        />
                    </Col>                    
                  </Row>
                  <Row>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <TimeLineWidget
                        title={"Timeline"}
                        data={
                          [
                            { id: 1, description: 'Lorem ipsum dolor sit amet, wisi decore timeam et vis', color: theme.colors.main, time: '07:00'},
                            { id: 2, description: (<span>Lorem ipsum dolor sit amet, <a href="#">wisi decore</a> timeam et vis. Duo cetero fastidii placerat cu, in quo nostro referrentur.</span>), color: theme.colors.orange, time: '09:00' },
                            { id: 3, description: (
                              <span className="flex align-items-center flex-wrap">
                                <h3 style={{ marginRight: 10 }}>Meeting with</h3>
                                <Avatar src="https://randomuser.me/api/portraits/men/81.jpg" />
                                <Avatar src="https://randomuser.me/api/portraits/women/21.jpg" />
                                <Avatar src="https://randomuser.me/api/portraits/women/50.jpg" />
                              </span>
                            ), color: theme.colors.green, time: '11:00', icon: 'schedule' },
                            { id: 5, description: 'Duo cetero fastidii placerat cu, in quo nostro referrentur. Te erant invidunt est, per tantas essent te. Et pro dicat delenit. No error vocibus adipisci has, velit appetere has te.', color: theme.colors.purple, time: '03:00' },
                            { id: 6, description: (<span>Bug Reported, <a href="#">click here</a> to view detailed report</span>), color: 'red', time: '05:00', icon: 'alert' },
                          ]
                        }
                      />
                    </Col>
                  </Row>
                </div>
              )} />
              <Route render={props => <NotFound currentUser={this.props.currentUser} {...props} />} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, {})(Dashboard));

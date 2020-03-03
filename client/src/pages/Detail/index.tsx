import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Layout, Tabs, Button, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { StickyContainer, Sticky } from 'react-sticky';

import Content from '@/components/Content';

import projectDetail from '@/utils/projectDetail';

import InfoShow from './components/infoShow';
import ImgShow from './components/imgShow';
import PdfShow from './components/pdfShow';
import VideoShow from './components/videoShow';

import $ from 'jquery';
import axios from 'axios';
import config from '@/utils/config';

import './styles/tabs.css';
import './styles/breadcrumb.css';
import './styles/index.css';

const TabPane = Tabs.TabPane;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        style={{ ...style, zIndex: 1, background: '#fff', marginBottom: '0px' }}
      />
    )}
  </Sticky>
);
const queryString = require('query-string');

interface IDetails {}

class details extends Component<IDetails & RouteComponentProps> {
  state = {
    data: {},
    classifyName: '',
    title: ''
  };

  componentDidMount = () => {
    const { classify, title } = queryString.parse(this.props.location.search);
    axios.get(config.INFO_API).then(res => {
      this.setState({
        data: res.data,
        classifyName: res.data.navbarInfo
          .map(item => {
            if (item.index === parseFloat(classify)) {
              return item;
            } else {
              return null;
            }
          })
          .filter(item => item !== null)[0].text,
        title: title
      });
    });
  };

  renderBackBtn = () => (
    <Button
      className="backBtn"
      onClick={() => {
        this.props.history.push('/');
      }}>
      返回
    </Button>
  );

  renderBreadcrumb = () => {
    return (
      <Breadcrumb className="my-breadcrumb">
        <Breadcrumb.Item
          onClick={() => {
            this.props.history.push('/');
          }}>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.classifyName}</Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  renderTabs = () => {
    let parsed = queryString.parse(this.props.location.search);
    if (this.state.data['classify' + parsed.classify]) {
      const { info, pic, video, pdf } = projectDetail(
        this.state.data['classify' + parsed.classify],
        parsed.title
      );
      return (
        <StickyContainer>
          <Tabs
            defaultActiveKey="1"
            renderTabBar={renderTabBar}
            onChange={() => {
              if ($('video').length > 0) {
                ($('video')[0] as HTMLMediaElement).pause();
              }
            }}>
            <TabPane tab="基本介绍" key="1">
              <InfoShow
                pic={info.pic}
                title={info.title}
                description={info.description}
              />
            </TabPane>
            <TabPane tab="图片展示" key="2">
              <ImgShow pic={pic} />
            </TabPane>
            <TabPane tab="视频演示" key="3">
              <VideoShow video={video} />
            </TabPane>
            <TabPane tab="演示文稿" key="4">
              <PdfShow pdf={pdf} />
            </TabPane>
          </Tabs>
        </StickyContainer>
      );
    }
    return null;
  };

  render() {
    return (
      <div id="detail">
        <Layout>
          <Content>
            {this.renderBackBtn()}
            {this.renderBreadcrumb()}
            {this.renderTabs()}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(details);

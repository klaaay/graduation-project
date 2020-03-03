import React, { Component } from 'react';
import {
  Layout,
  Menu,
  Pagination,
  Carousel,
  Input,
  AutoComplete
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import Head from '@/components/Head';
import Content from '@/components/Content';

import Card from './components/Card';

import $ from 'jquery';
import axios from 'axios';
import config from '@/utils/config';

import './styles/index.css';
import './styles/head.css';
import './styles/homeCarousel.css';

let data;

export default class main extends Component {
  cardInfoAnimation = () => {
    var $carImg;
    var $carInfo;
    $('.my-card').hover(
      function(event) {
        $carImg = $(event.target);
        $carInfo = $($(event.target).siblings()[0]);
        $carInfo.css('display', 'block');
        $carImg.animate({
          width: '120%'
        });
        $carInfo.animate({
          opacity: 1
        });
      },
      function(event) {
        $carInfo.css('display', 'none');
        $carImg.animate({
          width: '100%'
        });
        $carInfo.animate({
          opacity: 0
        });
      }
    );
  };

  componentDidMount = () => {
    document.body.addEventListener('touchstart', function() {});
    // $(window).resize(e => {
    //   window.location.reload();
    // });

    axios.get(config.INFO_API).then(res => {
      data = res.data;
      let allProjects = [];
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (Object.keys(data)[i] !== 'navbarInfo') {
          allProjects = allProjects.concat(data[Object.keys(data)[i]]);
        }
      }
      let dataSource = allProjects.map(item => {
        return item.info.title;
      });
      dataSource.unshift('未搜索');
      this.setState({
        allInfo: data,
        allProjects: allProjects,
        selectedClassifyProjects: data.classify0,
        navbarInfo: data.navbarInfo,
        dataSource: dataSource,
        filterDataSource: dataSource
      });
    });

    if ($(window).width() >= 450) {
      $('.my-card').css('height', Math.floor(($(window).height() - 470) / 2));
      $('.card-info').css(
        'top',
        Math.floor(($(window).height() - 470) / 2) * -1 + 'px'
      );
      this.cardInfoAnimation();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if ($(window).width() >= 450) {
      $('.my-card').css('height', Math.floor(($(window).height() - 470) / 2));
      $('.card-info').css(
        'top',
        Math.floor(($(window).height() - 470) / 2) * -1 + 'px'
      );
      this.cardInfoAnimation();
    }
  };

  state = {
    allInfo: {},
    navbarInfo: [],
    allProjects: [],
    selectedClassifyProjects: [],
    showedProjects: [],
    page: 1,
    filter: false,
    classify: 0,
    dataSource: [],
    filterDataSource: []
  };

  handleSearch = value => {
    this.setState({
      filterDataSource: this.state.dataSource.filter(item => {
        return item.search(value) !== -1;
      })
    });
  };

  onSearch = value => {
    if (value !== '未搜索') {
      this.setState({
        filterDataSource: [],
        selectedClassifyProjects: this.state.allProjects.filter(
          item => item.info.title === value
        )
      });
    } else {
      this.setState({
        selectedClassifyProjects: this.state.allInfo[
          'classify' + this.state.classify
        ]
      });
    }
  };

  renderNavbar = () => {
    const { filterDataSource } = this.state;
    return (
      <Head>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          onSelect={({ key }) => {
            this.setState({
              classify: key,
              selectedClassifyProjects: data['classify' + key],
              page: 1
            });
          }}>
          {this.state.navbarInfo.map((item, index) => (
            <Menu.Item key={index}>
              <img
                alt=""
                src={item.icon}
                style={{ paddingRight: '5px', width: '20px', height: '16px' }}
              />
              {item.text}
            </Menu.Item>
          ))}
          <React.Fragment>
            <AutoComplete
              dataSource={filterDataSource}
              className="head-search"
              style={{ width: 200 }}
              onSelect={this.onSearch}
              onChange={value => {
                this.setState({
                  filterDataSource: this.state.dataSource.filter(item => {
                    return item.search(value) !== -1;
                  })
                });
              }}
              onBlur={() => {}}
              placeholder="输入想要查找的项目">
              <Input suffix={<SearchOutlined />} />
            </AutoComplete>
          </React.Fragment>
        </Menu>
      </Head>
    );
  };

  renderCarousel = () => (
    <Carousel autoplay>
      {this.state.allProjects
        .sort((a, b) => b.info.birthtime - a.info.birthtime)
        .concat()
        .splice(0, 4)
        .map((item, index) => {
          return (
            <div className="homeCarousel" key={index}>
              <Link
                to={`/detail?title=${item.info.title}&classify=${item.info.classify}`}
                style={{ width: '100%' }}>
                <img src={item.info.pic} alt="" className="homeCarousel-img" />
              </Link>
            </div>
          );
        })}
    </Carousel>
  );

  renderItem = selectedClassifyProjects => {
    return selectedClassifyProjects
      .filter(item => item.info.page === this.state.page)
      .map((item, key) => (
        <Link
          className="project-item"
          key={item.info.title}
          to={`/detail?title=${item.info.title}&classify=${item.info.classify}`}>
          <Card
            title={item.info.title}
            pic={item.info.pic}
            description={item.info.description}
          />
        </Link>
      ));
  };

  render() {
    return (
      <div id="home">
        <Layout>
          {this.renderNavbar()}
          <Content>
            <div>{this.renderCarousel()}</div>
            <div className="projects">
              {this.renderItem(this.state.selectedClassifyProjects)}
            </div>
            <Pagination
              defaultCurrent={this.state.page}
              pageSize={8}
              total={this.state.selectedClassifyProjects.length}
              hideOnSinglePage={true}
              className="home-pagination"
              onChange={value => {
                this.setState({
                  page: value
                });
              }}
            />
          </Content>
        </Layout>
      </div>
    );
  }
}

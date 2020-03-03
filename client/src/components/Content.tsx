import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default class content extends Component {
  render() {
    return <Content>{this.props.children}</Content>;
  }
}

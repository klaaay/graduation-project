import React, { Component } from 'react';

import { Layout } from 'antd';

const { Header } = Layout;

export default class head extends Component {
  render() {
    return <Header>{this.props.children}</Header>;
  }
}

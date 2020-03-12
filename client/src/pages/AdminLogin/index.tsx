import React, { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import Bread from '@/components/Breadcrumb';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { useAuth } from '@/context/authContext';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Layout } from 'antd';
import './styles/index.css';
const { Content, Footer } = Layout;

const AdminLogin = ({ history }) => {
  const { state, login, logout, dispatch } = useAuth();

  const [mode, setMode] = useState('login');

  const handleModeChange = () => {
    if (mode === 'login') {
      setMode('sigup');
    } else {
      setMode('login');
    }
  };

  const renderModeBtn = () => {
    const result =
      mode === 'login' ? (
        <span style={{ float: 'right' }}>
          没有账号
          <a onClick={handleModeChange}>前往注册</a>
        </span>
      ) : (
        <span style={{ float: 'right', marginRight: '70px' }}>
          已有账号
          <a onClick={handleModeChange}>前往登录</a>
        </span>
      );
    return result;
  };

  return (
    <div id="admin-login">
      <Layout className="layout">
        <AdminNavbar />
        <Content className="admin-login__main" style={{ padding: '0 50px' }}>
          <div className="form-content">
            {mode === 'login' ? <LoginForm login={login} /> : <SignUpForm />}
            {renderModeBtn()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Media ©2020 Created by klay
        </Footer>
      </Layout>
    </div>
  );
};

export default withRouter(AdminLogin);

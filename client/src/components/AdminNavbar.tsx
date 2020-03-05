import React, { useEffect, useState, FC, useRef } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { tokenLogin } from '@/service';
import './styles/AdminNavbar.css';

const { Header } = Layout;
type IAdminNavbarProps = {};

const AdminNavbar: FC<IAdminNavbarProps & RouteComponentProps> = ({
  history,
  location
}) => {
  const { state, login, logout, dispatch } = useAuth();
  const { hasLogin, isLogin, name } = state;

  const selectedKeys = useRef([location.pathname]);

  useEffect(() => {
    if (hasLogin) {
      if (location.pathname === '/admin/login') {
        history.push('/admin/home');
      }
    } else {
      tokenLogin().then(res => {
        const { data, isError } = res;
        if (!isError) {
          const { name } = data;
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              name
            }
          });
        }
        history.push('/admin/login');
      });
    }
  }, [hasLogin]);

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={logout}>注销</a>
      </Menu.Item>
    </Menu>
  );

  console.log(selectedKeys);

  return (
    <Header className="admin-navbar">
      <span
        className="logo"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          history.push('/');
        }}>
        Media
      </span>
      <Menu
        theme="dark"
        mode="horizontal"
        // selectedKeys={selectedKeys.current}
        defaultSelectedKeys={selectedKeys.current}
        style={{ lineHeight: '64px' }}>
        {hasLogin && (
          <Menu.Item
            key="/admin/home"
            onClick={() => {
              history.push('/admin/home');
            }}>
            项目管理
          </Menu.Item>
        )}
        {hasLogin && (
          <Menu.Item
            key="/admin/covert"
            onClick={() => {
              history.push('/admin/covert');
            }}>
            媒体工具
          </Menu.Item>
        )}
      </Menu>
      <div className="blank" />
      {hasLogin && (
        <Dropdown overlay={menu}>
          <div className="login-info-btn">{name}</div>
        </Dropdown>
      )}
    </Header>
  );
};

export default withRouter(AdminNavbar);

import React, { useEffect, FC } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { tokenLogin } from '@/service';
import './styles/AdminNavbar.css';

const { Header } = Layout;
type IAdminNavbarProps = {};

const AdminNavbar: FC<IAdminNavbarProps & RouteComponentProps> = ({
  history
}) => {
  const { state, login, logout, dispatch } = useAuth();
  const { hasLogin, isLogin, name } = state;

  useEffect(() => {
    if (hasLogin) {
      history.push('/admin/home');
    } else {
      tokenLogin().then(res => {
        console.log('res', res);
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

  useEffect(() => {}, []);

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={logout}>注销</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="admin-navbar">
      <span className="logo">Media</span>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}>
        {hasLogin && <Menu.Item key="1">项目管理</Menu.Item>}
        {hasLogin && <Menu.Item key="2">媒体工具</Menu.Item>}
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

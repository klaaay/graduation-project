import React from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import Title from '@/components/Title';
import { Layout } from 'antd';

const { Content } = Layout;

const AdminLayout = ({ id, title, children }) => {
  return (
    <div id={id}>
      <Layout className="layout">
        <AdminNavbar />
        <Content className={`${id}__content`} style={{ padding: '0 50px' }}>
          <Title title={title} />
          <div className="main-content">{children}</div>
        </Content>
      </Layout>
    </div>
  );
};

export default AdminLayout;

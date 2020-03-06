import React, { FC } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import Title from '@/components/Title';
import Breadcrumb from '@/components/Breadcrumb';
import { Layout } from 'antd';
import './styles/AdminLayout.css';

const { Content } = Layout;

type IAdminLayoutProps = {
  id: string;
  title?: string;
  showBread?: boolean;
};

const AdminLayout: FC<IAdminLayoutProps> = ({
  id,
  title,
  children,
  showBread
}) => {
  return (
    <div id={id} className="admin-layout">
      <Layout className="layout">
        <AdminNavbar />
        <Content className={`${id}__content`} style={{ padding: '0 50px' }}>
          <div className="head-content">
            {title && <Title title={title} />}
            {showBread && <Breadcrumb />}
          </div>
          <div className="main-content">{children}</div>
        </Content>
      </Layout>
    </div>
  );
};

export default AdminLayout;

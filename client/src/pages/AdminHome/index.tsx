import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import Bread from '@/components/Breadcrumb';
import Title from '@/components/Title';
import HeadToolBar from '@/components/HeadToolBar';
import { Layout } from 'antd';
import ProjectTable from './components/ProjectTable';
import CreateProjectModal from './components/CreateProjectModal';
import './styles/index.css';

const { Content, Footer } = Layout;

const AdminHome = () => {
  return (
    <div id="admin-home">
      <Layout className="layout">
        <AdminNavbar />
        <Content className="admin-home__content" style={{ padding: '0 50px' }}>
          <Title title="项目管理" />
          <div className="main-content">
            <HeadToolBar leftChild={null} rightChild={<CreateProjectModal />} />
            <ProjectTable />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default AdminHome;

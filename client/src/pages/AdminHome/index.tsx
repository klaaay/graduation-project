import React, { useState, useEffect } from 'react';
import HeadToolBar from '@/components/HeadToolBar';
import ProjectTable from './components/ProjectTable';
import CreateProjectModal from './components/CreateProjectModal';
import AdminLayout from '@/components/AdminLayout';
import './styles/index.css';

const AdminHome = () => {
  return (
    <AdminLayout id="admin-home" title="项目管理">
      <HeadToolBar leftChild={null} rightChild={<CreateProjectModal />} />
      <ProjectTable />
    </AdminLayout>
  );
};

export default AdminHome;

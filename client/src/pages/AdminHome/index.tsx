import React, { useState, useEffect } from 'react';
import HeadToolBar from '@/components/HeadToolBar';
import ProjectTable from './components/ProjectTable';
import CreateProjectModal from './components/ProjectModal';
import AdminLayout from '@/components/AdminLayout';
import { useRequest } from '@umijs/hooks';
import { getProjects } from '@/service';
import './styles/index.css';

const AdminHome = () => {
  const { data, loading, run } = useRequest(getProjects);

  return (
    <AdminLayout id="admin-home" title="项目管理">
      <HeadToolBar
        leftChild={null}
        rightChild={
          <CreateProjectModal modalMode="create" handleGetProjects={run} />
        }
      />
      <ProjectTable projectsData={data} handleGetProjects={run} />
    </AdminLayout>
  );
};

export default AdminHome;

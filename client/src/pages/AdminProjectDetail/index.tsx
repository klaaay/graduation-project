import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import ProjectsTabs from './components/ProjectsTabs';
import queryString from 'query-string';
import './styles/index.css';
import HeadToolBar from '@/components/HeadToolBar';
import UploadModal from './components/UploadModal';

type IAdminCovertProps = {};

const AdminCovert: FC<IAdminCovertProps & RouteComponentProps> = ({
  location
}) => {
  const projectName = queryString.parse(location.search).name;

  return (
    <AdminLayout id="admin-project-detail" showBread={true}>
      <ProjectsTabs />
    </AdminLayout>
  );
};

export default withRouter(AdminCovert);

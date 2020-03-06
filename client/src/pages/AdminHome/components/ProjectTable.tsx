import React, { FC } from 'react';
import { Table, Divider, message } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import CreateProjectModal from './ProjectModal';
import { deleteProject } from '@/service';
import queryString from 'query-string';

// const fakeData = [
//   {
//     _id: '5e4caf4cea11e04a38309608',
//     name: '新型冠状病毒2222',
//     description: 'wo de test2222',
//     type: 'life',
//     user: '5e4bfa4e19aaac416c8acbf4',
//     date: '2020-02-19T03:45:16.186Z',
//     __v: 0
//   }
// ];

type IProjectTable = {
  projectsData: any;
  handleGetProjects: any;
};

const ProjectTable: FC<IProjectTable & RouteComponentProps> = ({
  projectsData,
  handleGetProjects,
  history
}) => {
  const handleDeleteProject = id => {
    deleteProject({
      id
    }).then(res => {
      const { isError, msg } = res;
      if (!isError) {
        message.success(msg);
        handleGetProjects();
      }
    });
  };

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              history.push(
                `/admin/home/projectDetail?${queryString.stringify({
                  name: text,
                  projectId: record._id
                })}`
              );
            }}>
            {text}
          </a>
        );
      }
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
      render: text => text.slice(1)
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{ display: 'flex' }}>
          <CreateProjectModal
            modalMode="edit"
            record={record}
            handleGetProjects={handleGetProjects}
          />
          <Divider type="vertical" />
          <a
            style={{ color: '#f50' }}
            onClick={() => {
              handleDeleteProject(record._id);
            }}>
            删除
          </a>
        </span>
      )
    }
  ];

  return (
    <Table
      rowKey={'name'}
      columns={columns}
      dataSource={(projectsData && projectsData.data) || []}
      // dataSource={fakeData}
    />
  );
};

export default withRouter(ProjectTable);

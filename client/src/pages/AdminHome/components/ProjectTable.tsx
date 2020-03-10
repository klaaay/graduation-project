import React, { FC } from 'react';
import { Table, Divider, message, Popconfirm } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import CreateProjectModal from './ProjectModal';
import { deleteProject } from '@/service';
import queryString from 'query-string';

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

  function confirm(e, id) {
    handleDeleteProject(id);
  }

  function cancel(e) {}

  const columns = [
    {
      title: '项目封面',
      dataIndex: 'cover',
      key: 'cover',
      width: '10%',
      render: cover => {
        return (
          <img
            style={{ width: '70px', height: '70px' }}
            src={cover.remotePath}></img>
        );
      }
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      width: '15%',
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
      width: '5%',
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
      width: '15%',
      render: (text, record) => (
        <span style={{ display: 'flex' }}>
          <CreateProjectModal
            modalMode="edit"
            record={record}
            handleGetProjects={handleGetProjects}
          />
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除该项目吗?"
            onConfirm={e => {
              confirm(e, record._id);
            }}
            onCancel={cancel}
            okText="确定"
            cancelText="取消">
            <a style={{ color: '#f50' }}>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <Table
      rowKey={'name'}
      columns={columns}
      dataSource={(projectsData && projectsData.data) || []}
    />
  );
};

export default withRouter(ProjectTable);

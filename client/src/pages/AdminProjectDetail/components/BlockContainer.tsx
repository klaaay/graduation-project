import React, { useState, FC, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { message, Table, Popconfirm } from 'antd';
import { getProjectMedias, deleteProjectMedia } from '@/service';
import queryString from 'query-string';
import './styles/BlockContainer.css';
import dayjs from 'dayjs';

export type IFile = {
  _id: string;
  name: string;
  remotePath: string;
  localPath: string;
  date: string;
};

export type IBlockItem = {
  _id: string;
  project: string;
  thumb: IFile;
  detail: IFile;
  type: 'pic' | 'video' | 'pdf';
};

type IBlockContainerProps = {
  mode: string;
  handleGetProjectMedias: any;
  blockList: IBlockItem[];
};

const BlockContainer: FC<IBlockContainerProps & RouteComponentProps> = ({
  location,
  mode,
  handleGetProjectMedias,
  blockList
}) => {
  const { projectId } = queryString.parse(location.search);

  const [filterBlockList, setFilterBlockList] = useState<IBlockItem[]>([]);

  useEffect(() => {
    handleGetProjectMedias(projectId);
  }, [projectId]);

  useEffect(() => {
    setFilterBlockList(blockList.filter(item => item.type === mode));
  }, [JSON.stringify(blockList), mode]);

  const confirm = (e, id) => {
    deleteProjectMedia({ id }).then(res => {
      const { isError, msg } = res;
      if (!isError) {
        message.success(msg);
        handleGetProjectMedias(projectId);
      }
    });
  };

  const columns = [
    {
      title: '缩略图',
      dataIndex: 'thumb',
      key: 'thumb',
      render: (thumb, record) => {
        return (
          <img
            onClick={() => {
              window.open(record.detail.remotePath, '_blank');
            }}
            style={{ width: '70px', height: '70px', cursor: 'pointer' }}
            src={thumb.remotePath}></img>
        );
      }
    },
    {
      title: '文件名称',
      dataIndex: 'detail',
      key: 'detail',
      render: detail => {
        return detail.name;
      }
    },
    {
      title: '上传日期',
      dataIndex: 'date',
      key: 'date',
      render: date => {
        return dayjs(date).format(`YYYY年MM月DD日 HH:mm:ss`);
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span style={{ display: 'flex' }}>
          <Popconfirm
            title="你确定要删除该文件吗?"
            onConfirm={e => {
              confirm(e, record._id);
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消">
            <a style={{ color: '#f50' }}>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div className="block-container">
      <Table
        rowKey={'name'}
        columns={columns}
        dataSource={filterBlockList || []}
      />
    </div>
  );
};

export default withRouter(BlockContainer);

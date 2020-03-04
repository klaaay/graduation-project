import React from 'react';
import { useRequest } from '@umijs/hooks';
import { getProjects } from '@/service';
import { Table, Divider } from 'antd';

const fakeData = [
  {
    _id: '5e4caf4cea11e04a38309608',
    name: '新型冠状病毒2222',
    description: 'wo de test2222',
    type: 'life',
    user: '5e4bfa4e19aaac416c8acbf4',
    date: '2020-02-19T03:45:16.186Z',
    __v: 0
  }
];

const ProjectTable = props => {
  const { data, loading, run } = useRequest(getProjects);

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '列别',
      dataIndex: 'type',
      key: 'age'
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
        <span>
          <a>编辑</a>
          <Divider type="vertical" />
          <a style={{ color: '#f50' }}>删除</a>
        </span>
      )
    }
  ];

  return (
    <Table
      loading={loading}
      rowKey={'name'}
      columns={columns}
      dataSource={(data && data.data) || []}
      // dataSource={fakeData}
    />
  );
};

export default ProjectTable;

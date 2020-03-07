import React from 'react';
import { Form, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const UploadCoverForm = ({ projectId, handleCancel, handleGetProjects }) => {
  return (
    <Upload
      style={{ width: '100%' }}
      action="http://localhost:3030/api/upload/cover"
      data={{ projectId: projectId }}
      headers={{
        ['x-auth-token']: Cookies.get('token')
      }}
      onChange={e => {
        if (e.file.status === 'done') {
          message.success('封面上传成功');
          handleGetProjects();
          handleCancel();
        }
      }}
      listType="picture">
      <Button>
        <UploadOutlined /> 点击上传项目封面
      </Button>
    </Upload>
  );
};

export default UploadCoverForm;

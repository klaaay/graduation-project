import React from 'react';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const formItemLayout = {
  wrapperCol: { span: 16, offset: 4 }
};

const UploadCoverForm = ({ coverPath }) => {
  return (
    <Upload
      style={{ width: '100%' }}
      action="http://localhost:3030/api/upload/cover"
      data={{ projectCoverPath: coverPath }}
      listType="picture">
      <Button>
        <UploadOutlined /> 点击上传项目封面
      </Button>
    </Upload>
  );
};

export default UploadCoverForm;

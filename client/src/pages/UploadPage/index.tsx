import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadPage = () => {
  return (
    <Upload
      action="http://localhost:3030/api/files/5e4cad181616c54c781cc405"
      directory>
      <Button>
        <UploadOutlined /> Upload Directory
      </Button>
    </Upload>
  );
};

export default UploadPage;

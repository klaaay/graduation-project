import React, { useState, FC } from 'react';
import { Upload, message } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import './styles/FileGroupUpload.css';

const { Dragger } = Upload;

const modeMap = {
  pic: {
    accept: '.jpg,.png,.gif',
    text: `图片(.jpg, .png, .gif)`
  },
  video: {
    accept: '.mp4',
    text: `视频(.mp4)`
  },
  pdf: {
    accept: '.pdf',
    text: `演示文稿(.pdf)`
  }
};

type IFileGroupUploadProps = {
  uploadMode: string;
  handleGetProjectMedias: any;
};

const FileGroupUpload: FC<IFileGroupUploadProps & RouteComponentProps> = ({
  uploadMode,
  location,
  handleGetProjectMedias
}) => {
  const [fileList, setFileList] = useState([]);

  const { projectId } = queryString.parse(location.search);

  const props = {
    accept: modeMap[uploadMode]['accept'],
    name: 'file',
    multiple: true,
    action: `http://localhost:3030/api/upload/${uploadMode}/${projectId}`,
    beforeUpload: (file, fileList) => {
      if (uploadMode === 'pic') {
      } else if (uploadMode === 'video') {
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功.`);
        handleGetProjectMedias(projectId);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    }
  };

  return (
    <div className="file-group-upload">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          点击或者拖拽该区域上传
          <span style={{ color: '#40A9FF' }}>
            {modeMap[uploadMode]['text']}
          </span>
          文件
        </p>
        <p className="ant-upload-hint">支持单个或者多个文件</p>
      </Dragger>
    </div>
  );
};

export default withRouter(FileGroupUpload);

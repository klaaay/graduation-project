import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './styles/FileGroupUpload.css';

const { Dragger } = Upload;

const acceptMap = {
  pic: '.jpg',
  video: '.mp4',
  pdf: '.pdf,.jpg'
};

const FileGroupUpload = ({ mode }) => {
  const [fileList, setFileList] = useState([]);

  const props = {
    accept: acceptMap[mode],
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // fileList: fileList,
    beforeUpload: (file, fileList) => {
      if (mode === 'pic') {
        if (fileList.some(item => item.type !== 'image/jpeg')) {
          message.warning('请上传格式为jpg的图片');
          return false;
        } else {
          return true;
        }
      } else if (mode === 'video') {
        console.log(fileList.filter(item => item.type === 'image/jpeg'));
        console.log(fileList.filter(item => item.type === 'video/mp4'));
        if (
          fileList.filter(item => item.type === 'image/jpeg').length !==
          fileList.filter(item => item.type === 'video/mp4').length
        ) {
          message.warning('请上传匹配视频和视频封面');
          return false;
        } else {
          setFileList([
            {
              uid: '1',
              name: 'xxx.png',
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: 'http://www.baidu.com/xxx.png'
            }
          ]);
          return true;
        }
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      console.log(status);
      // setFileList([
      //   {
      //     uid: '1',
      //     name: 'xxx.png',
      //     status: 'uploading',
      //     response: 'Server Error 500', // custom error message to show
      //     url: 'http://www.baidu.com/xxx.png'
      //   }
      // ]);
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
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
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  );
};

export default FileGroupUpload;

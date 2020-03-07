import React, { useState, FC } from 'react';
import { Modal, Button, Radio } from 'antd';
import FileGroupUpload from './FileGroupUpload';

const UploadModal = () => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('pic');

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  return (
    <div className="upload-file-btn">
      <Button type="primary" onClick={showModal}>
        上传
      </Button>
      <Modal
        maskClosable={false}
        title={'上传文件'}
        footer={null}
        visible={visible}
        onOk={handleCancel}
        onCancel={handleCancel}>
        <Radio.Group
          value={mode}
          buttonStyle="solid"
          onChange={e => {
            setMode(e.target.value);
          }}>
          <Radio.Button value="pic">图片</Radio.Button>
          <Radio.Button value="video">视频</Radio.Button>
          <Radio.Button value="pdf">演示文稿</Radio.Button>
        </Radio.Group>
        <FileGroupUpload mode={mode} />
      </Modal>
    </div>
  );
};

export default UploadModal;

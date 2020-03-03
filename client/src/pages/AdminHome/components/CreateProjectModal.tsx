import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ProjectForm from './ProjectForm';
import UploadCoverForm from './UploadCoverForm';

const CreateProjectModal = () => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('basic');

  const showModal = () => {
    setMode('basic');
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const getModalName = mode => {
    switch (mode) {
      case 'basic':
        return '填写项目基本信息';
      case 'upload':
        return '上传项目封面';
      default:
        break;
    }
  };

  return (
    <div className="creat-project-btn">
      <Button type="primary" onClick={showModal}>
        创建项目
      </Button>
      <Modal
        maskClosable={false}
        title={getModalName(mode)}
        footer={null}
        visible={visible}
        onOk={handleCancel}
        onCancel={handleCancel}>
        {mode === 'basic' && <ProjectForm setMode={setMode} />}
        {mode === 'upload' && <UploadCoverForm />}
      </Modal>
    </div>
  );
};

export default CreateProjectModal;

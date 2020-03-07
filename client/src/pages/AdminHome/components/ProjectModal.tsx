import React, { useState, FC } from 'react';
import { Modal, Button } from 'antd';
import ProjectForm from './ProjectForm';
import UploadCoverForm from './UploadCoverForm';

type ICreateProjectModal = {
  record?: {
    name: string;
    type: string;
    description: string;
    _id: string;
  };
  modalMode: string;
  handleGetProjects: any;
};

const CreateProjectModal: FC<ICreateProjectModal> = ({
  modalMode,
  record,
  handleGetProjects
}) => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('basic');
  const [projectId, setProjectId] = useState('');

  const showModal = () => {
    modalMode === 'create' && setMode('basic');
    setVisible(true);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const getModalName = mode => {
    if (modalMode === 'edit') {
      return '修改项目信息';
    } else {
      switch (mode) {
        case 'basic':
          return '填写项目基本信息';
        case 'upload':
          return '上传项目封面';
        default:
          break;
      }
    }
  };

  return (
    <div className="creat-project-btn">
      {modalMode === 'create' && (
        <Button type="primary" onClick={showModal}>
          创建项目
        </Button>
      )}
      {modalMode === 'edit' && <a onClick={showModal}>编辑</a>}
      <Modal
        maskClosable={false}
        title={getModalName(mode)}
        footer={null}
        visible={visible}
        onOk={handleCancel}
        onCancel={handleCancel}>
        {mode === 'basic' && (
          <ProjectForm
            setMode={setMode}
            setProjectId={setProjectId}
            modalMode={modalMode}
            record={record}
            handleGetProjects={handleGetProjects}
            handleCancel={handleCancel}
          />
        )}
        {mode === 'upload' && (
          <UploadCoverForm
            projectId={projectId}
            handleCancel={handleCancel}
            handleGetProjects={handleGetProjects}
          />
        )}
      </Modal>
    </div>
  );
};

export default CreateProjectModal;

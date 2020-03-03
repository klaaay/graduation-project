import React from 'react';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const formItemLayout = {
  wrapperCol: { span: 16, offset: 4 }
};

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UploadCoverForm = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{}}>
      <Form.Item
        name="upload"
        label=""
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="">
        <Upload
          style={{ width: '100%' }}
          name="logo"
          action="/upload.do"
          listType="picture">
          <Button>
            <UploadOutlined /> 点击上传项目封面
          </Button>
        </Upload>
      </Form.Item>

      {/* <Form.Item wrapperCol={{ span: 4, offset: 16 }}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default UploadCoverForm;

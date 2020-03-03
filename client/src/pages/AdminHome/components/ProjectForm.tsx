import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 17, span: 4 }
};

const ProjectForm = ({ setMode }) => {
  const onFinish = values => {
    console.log('Success:', values);
    setMode('upload');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Form.Item
        label="类别"
        name="type"
        rules={[{ required: true, message: '请选择类别' }]}>
        <Select defaultValue="lucy" style={{ width: '100%' }}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="项目名称"
        name="name"
        rules={[{ required: true, message: '请输入项目名称' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="项目描述"
        name="description"
        rules={[{ required: true, message: '请输入项目描述' }]}>
        <TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;

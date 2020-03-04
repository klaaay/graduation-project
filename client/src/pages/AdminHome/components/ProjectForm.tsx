import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { getTypes, createProject } from '@/service';
import { IWrappedAxiosResult } from '@/service/wrappedAxios';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 17, span: 4 }
};

export type ITypeListDataItem = {
  icon: string;
  index: number;
  text: string;
};

const ProjectForm = ({ setMode }) => {
  const onFinish = values => {
    console.log('Success:', values);
    createProject(values).then(res => {
      const { isError, msg } = res;
      if (!isError) {
        message.success(msg);
      }
    });
    // setMode('upload');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const [typeList, setTypeList] = useState<ITypeListDataItem[]>([]);

  const handleGetTypes = () => {
    getTypes().then(res => {
      const { isError, data } = res;
      if (!isError) {
        console.log(data);
        setTypeList(data);
      }
    });
  };

  useEffect(() => {
    handleGetTypes();
  }, []);

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
        <Select style={{ width: '100%' }}>
          {typeList.map(({ index, text }) => {
            return (
              <Option key={text} value={`${index}${text}`}>
                {text}
              </Option>
            );
          })}
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

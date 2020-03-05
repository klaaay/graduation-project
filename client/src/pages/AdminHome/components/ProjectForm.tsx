import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Upload } from 'antd';
import { getTypes, createProject } from '@/service';
import { IWrappedAxiosResult } from '@/service/wrappedAxios';
import { UploadOutlined } from '@ant-design/icons';

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

const ProjectForm = ({ setMode, setCoverPath }) => {
  const onFinish = values => {
    console.log('Success:', values);
    createProject(values).then(res => {
      const { isError, msg, data } = res;
      if (!isError) {
        const { cover } = data;
        message.success(msg);
        setMode('upload');
        setCoverPath(cover);
      }
    });
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

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
      {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="">
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </Form.Item> */}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;

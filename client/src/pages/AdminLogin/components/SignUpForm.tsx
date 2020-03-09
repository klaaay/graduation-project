import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { signUp } from '@/service';
import Cookies from 'js-cookie';

interface IRegistrationForm {}

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 16
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    span: 4,
    offset: 18
  }
};

const RegistrationForm: FC<IRegistrationForm & RouteComponentProps> = ({
  history
}) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    signUp(values).then(res => {
      const { isError, msg, data } = res;
      if (!isError) {
        Cookies.set('token', data);
        message.success(msg);
        window.location.reload();
      }
    });
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{}}
      scrollToFirstError>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '这不是一个合法的邮箱'
          },
          {
            required: true,
            message: '请输入邮箱!'
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码!'
          }
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入确认密码!'
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次输入的密码不同!');
            }
          })
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="名称"
        rules={[
          {
            required: true,
            message: '请输入你的名称',
            whitespace: true
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withRouter(RegistrationForm);

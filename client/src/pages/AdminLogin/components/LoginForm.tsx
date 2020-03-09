import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface ILoginFormProps {
  login: (email: string, password: string) => void;
}

const LoginForm = ({ login }) => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
    const { email, password } = values;
    login(email, password);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: '请输入邮箱!' }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="邮箱"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ float: 'right' }}
          type="primary"
          htmlType="submit"
          className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedLoginForm = LoginForm;
export default WrappedLoginForm;

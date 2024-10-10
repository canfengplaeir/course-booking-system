import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const onFinish = async (values: { phoneNumber: string; password: string }) => {
    try {
      const response = await login(values.phoneNumber, values.password);
      authLogin(response.data.user);
      message.success('登录成功');
      navigate('/');
    } catch (err) {
      message.error('手机号或密码错误');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>登录</h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="手机号码" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
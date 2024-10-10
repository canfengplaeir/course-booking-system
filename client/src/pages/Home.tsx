import React from 'react';
import { Typography, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <Title level={2}>欢迎来到课程预约系统</Title>
      {user ? (
        <div>
          <Paragraph>
            您好，{user.name || user.phoneNumber}！
          </Paragraph>
          <Button type="primary" size="large">
            <Link to="/courses">浏览课程</Link>
          </Button>
        </div>
      ) : (
        <div>
          <Paragraph>
            请登录或注册以开始使用系统。
          </Paragraph>
          <Space size="middle">
            <Button type="primary" size="large">
              <Link to="/login">登录</Link>
            </Button>
            <Button size="large">
              <Link to="/register">注册</Link>
            </Button>
          </Space>
        </div>
      )}
    </div>
  );
};

export default Home;
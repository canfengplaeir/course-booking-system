import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, BookOutlined, LoginOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CourseSelection from './pages/CourseSelection';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';

const { Header, Content, Footer } = Layout;

const AppHeader: React.FC = () => {
  const { user, logout } = useAuth();

  const menuItems = user
    ? [
        { key: 'home', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
        { key: 'courses', icon: <BookOutlined />, label: <Link to="/courses">课程</Link> },
        { key: 'profile', icon: <UserOutlined />, label: <Link to="/profile">个人资料</Link> },
        ...(user.role === 'teacher' ? [{ key: 'teacher', icon: <DashboardOutlined />, label: <Link to="/teacher">教师仪表板</Link> }] : []),
        ...(user.role === 'admin' ? [{ key: 'admin', icon: <DashboardOutlined />, label: <Link to="/admin">管理员仪表板</Link> }] : []),
        { key: 'logout', icon: <LogoutOutlined />, label: '登出', onClick: logout },
      ]
    : [
        { key: 'home', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
        { key: 'login', icon: <LoginOutlined />, label: <Link to="/login">登录</Link> },
        { key: 'register', icon: <UserOutlined />, label: <Link to="/register">注册</Link> },
      ];

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" items={menuItems} />
    </Header>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout className="layout" style={{ minHeight: '100vh' }}>
          <AppHeader />
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/courses" element={<CourseSelection />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>课程预约系统 ©2023 Created by Your Company</Footer>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
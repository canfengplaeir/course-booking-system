import React, { useState } from 'react';
import { Tabs } from 'antd';
import SubjectManagement from '../components/SubjectManagement';
import GradeManagement from '../components/GradeManagement';
import ClassManagement from '../components/ClassManagement';
import UserManagement from '../components/UserManagement';

const { TabPane } = Tabs;

const AdminDashboard: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div>
      <h2>管理员仪表板</h2>
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        <TabPane tab="科目管理" key="1">
          <SubjectManagement />
        </TabPane>
        <TabPane tab="年级管理" key="2">
          <GradeManagement />
        </TabPane>
        <TabPane tab="课程管理" key="3">
          <ClassManagement />
        </TabPane>
        <TabPane tab="用户管理" key="4">
          <UserManagement />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
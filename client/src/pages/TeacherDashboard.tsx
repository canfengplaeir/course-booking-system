import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { getTeacherClasses, getClassStudents } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const TeacherDashboard: React.FC = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchTeacherClasses();
  }, []);

  const fetchTeacherClasses = async () => {
    try {
      const response = await getTeacherClasses(user.id);
      setClasses(response.data);
    } catch (error) {
      message.error('获取课程列表失败');
    }
  };

  const fetchClassStudents = async (classId) => {
    try {
      const response = await getClassStudents(classId);
      setStudents(response.data);
    } catch (error) {
      message.error('获取学生列表失败');
    }
  };

  const classColumns = [
    { title: '课程名称', dataIndex: 'name', key: 'name' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '地点', dataIndex: 'location', key: 'location' },
    { title: '已选人数', dataIndex: 'enrolledCount', key: 'enrolledCount' },
    { title: '总容量', dataIndex: 'totalCapacity', key: 'totalCapacity' },
  ];

  const studentColumns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '手机号', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  ];

  return (
    <div>
      <h2>我的课程</h2>
      <Table
        columns={classColumns}
        dataSource={classes}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            setSelectedClass(record);
            fetchClassStudents(record.id);
          },
        })}
      />
      {selectedClass && (
        <div>
          <h3>{selectedClass.name} - 学生列表</h3>
          <Table columns={studentColumns} dataSource={students} rowKey="id" />
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
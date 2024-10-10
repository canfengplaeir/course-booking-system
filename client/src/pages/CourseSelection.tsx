import React, { useState, useEffect } from 'react';
import { Select, Table, Button, message } from 'antd';
import { getSubjects, getGrades, getTeachers, getClasses, enrollInClass } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const { Option } = Select;

const CourseSelection: React.FC = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchSubjects();
    fetchGrades();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      message.error('获取科目列表失败');
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await getGrades();
      setGrades(response.data);
    } catch (error) {
      message.error('获取年级列表失败');
    }
  };

  const fetchTeachers = async () => {
    if (selectedSubject && selectedGrade) {
      try {
        const response = await getTeachers(selectedSubject, selectedGrade);
        setTeachers(response.data);
      } catch (error) {
        message.error('获取教师列表失败');
      }
    }
  };

  const fetchClasses = async () => {
    if (selectedTeacher) {
      try {
        const response = await getClasses(selectedTeacher);
        setClasses(response.data);
      } catch (error) {
        message.error('获取课程列表失败');
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [selectedSubject, selectedGrade]);

  useEffect(() => {
    fetchClasses();
  }, [selectedTeacher]);

  const handleEnroll = async (classId: number) => {
    try {
      await enrollInClass(classId);
      message.success('选课成功');
      fetchClasses(); // 刷新课程列表
    } catch (error) {
      message.error('选课失败');
    }
  };

  const columns = [
    { title: '课程名称', dataIndex: 'name', key: 'name' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '地点', dataIndex: 'location', key: 'location' },
    { title: '可用名额', dataIndex: 'availableSpots', key: 'availableSpots' },
    { title: '标签', dataIndex: 'tags', key: 'tags' },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleEnroll(record.id)} disabled={user?.role !== 'student'}>
          选课
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>课程选择</h2>
      <div style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 120, marginRight: 8 }}
          placeholder="选择科目"
          onChange={(value) => setSelectedSubject(value)}
        >
          {subjects.map((subject) => (
            <Option key={subject.id} value={subject.id}>{subject.name}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120, marginRight: 8 }}
          placeholder="选择年级"
          onChange={(value) => setSelectedGrade(value)}
        >
          {grades.map((grade) => (
            <Option key={grade.id} value={grade.id}>{grade.name}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          placeholder="选择教师"
          onChange={(value) => setSelectedTeacher(value)}
        >
          {teachers.map((teacher) => (
            <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>
          ))}
        </Select>
      </div>
      <Table columns={columns} dataSource={classes} rowKey="id" />
    </div>
  );
};

export default CourseSelection;
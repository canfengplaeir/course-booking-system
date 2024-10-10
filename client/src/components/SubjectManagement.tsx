import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../services/api';

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      message.error('获取科目列表失败');
    }
  };

  const showModal = (subject = null) => {
    setEditingSubject(subject);
    form.setFieldsValue(subject || {});
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingSubject) {
          await updateSubject(editingSubject.id, values.name);
        } else {
          await createSubject(values.name);
        }
        setIsModalVisible(false);
        form.resetFields();
        fetchSubjects();
        message.success(`${editingSubject ? '更新' : '创建'}科目成功`);
      } catch (error) {
        message.error(`${editingSubject ? '更新' : '创建'}科目失败`);
      }
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
      fetchSubjects();
      message.success('删除科目成功');
    } catch (error) {
      message.error('删除科目失败');
    }
  };

  const columns = [
    { title: '科目名称', dataIndex: 'name', key: 'name' },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>编辑</Button>
          <Button onClick={() => handleDelete(record.id)} danger>删除</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        添加科目
      </Button>
      <Table columns={columns} dataSource={subjects} rowKey="id" />
      <Modal
        title={editingSubject ? '编辑科目' : '添加科目'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="科目名称"
            rules={[{ required: true, message: '请输入科目名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubjectManagement;
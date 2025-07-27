import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Modal, Form, Input, Select, Tag, Progress, message } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  reward: {
    experience: number;
    spiritStones: number;
    items?: string[];
  };
  deadline: string;
  progress: number;
  assignedTo?: string;
}

const Tasks: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  // 任务数据
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '每日修炼',
      description: '完成每日的基础修炼任务，提升修为',
      type: 'daily',
      priority: 'medium',
      status: 'in_progress',
      reward: {
        experience: 100,
        spiritStones: 50,
      },
      deadline: '2024-01-20',
      progress: 75,
      assignedTo: '全体弟子',
    },
    {
      id: '2',
      title: '收集灵草',
      description: '前往后山收集100株灵草用于炼丹',
      type: 'weekly',
      priority: 'high',
      status: 'pending',
      reward: {
        experience: 500,
        spiritStones: 200,
        items: ['炼丹炉', '灵草种子'],
      },
      deadline: '2024-01-25',
      progress: 0,
      assignedTo: '外门弟子',
    },
    {
      id: '3',
      title: '宗门大比准备',
      description: '为即将到来的宗门大比做准备，提升弟子实力',
      type: 'special',
      priority: 'urgent',
      status: 'in_progress',
      reward: {
        experience: 2000,
        spiritStones: 1000,
        items: ['法宝', '功法秘籍'],
      },
      deadline: '2024-02-01',
      progress: 30,
      assignedTo: '内门弟子',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'processing';
      case 'pending': return 'default';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'blue';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'cyan';
      case 'weekly': return 'geekblue';
      case 'monthly': return 'purple';
      case 'special': return 'gold';
      default: return 'default';
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
    setIsModalVisible(true);
  };

  const handleDeleteTask = (taskId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个任务吗？',
      onOk: () => {
        setTasks(tasks.filter(task => task.id !== taskId));
        message.success('任务删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingTask) {
        // 编辑任务
        setTasks(tasks.map(task => 
          task.id === editingTask.id 
            ? { ...task, ...values }
            : task
        ));
        message.success('任务更新成功');
      } else {
        // 新增任务
        const newTask: Task = {
          id: Date.now().toString(),
          ...values,
          status: 'pending',
          progress: 0,
        };
        setTasks([...tasks, newTask]);
        message.success('任务创建成功');
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Task) => (
        <div>
          <div style={{ fontWeight: 600, color: '#8b7355' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            {record.description}
          </div>
        </div>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {type === 'daily' ? '每日' : 
           type === 'weekly' ? '每周' : 
           type === 'monthly' ? '每月' : '特殊'}
        </Tag>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>
          {priority === 'urgent' ? '紧急' : 
           priority === 'high' ? '高' : 
           priority === 'medium' ? '中' : '低'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status === 'completed' ? '已完成' : 
           status === 'in_progress' ? '进行中' : 
           status === 'pending' ? '待开始' : '已失败'}
        </Tag>
      ),
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress 
          percent={progress} 
          size="small"
          strokeColor={{
            '0%': '#d4a574',
            '100%': '#f0c896',
          }}
          trailColor="#e8e2d8"
        />
      ),
    },
    {
      title: '截止日期',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Task) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditTask(record)}
            style={{ color: '#d4a574' }}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteTask(record.id)}
            style={{ color: '#ff4d4f' }}
          />
        </div>
      ),
    },
  ];

  // 统计数据
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  return (
    <div className="tasks-page" style={{ padding: '24px', background: '#f8f6f0', minHeight: '100vh' }}>
      <div className="tasks-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 className="tasks-title" style={{ color: '#8b7355', fontSize: '28px', fontWeight: 600, margin: 0 }}>宗门任务</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddTask}
          style={{ background: '#d4a574', borderColor: '#d4a574' }}
        >
          新增任务
        </Button>
      </div>

      {/* 任务统计 */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card style={{ background: '#ffffff', border: '1px solid #e8e2d8', borderRadius: '8px', textAlign: 'center' }}>
            <div className="stat-content">
              <div className="stat-number" style={{ fontSize: '32px', fontWeight: 600, color: '#8b7355' }}>{taskStats.total}</div>
              <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>总任务</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ background: '#ffffff', border: '1px solid #e8e2d8', borderRadius: '8px', textAlign: 'center' }}>
            <div className="stat-content">
              <div className="stat-number" style={{ fontSize: '32px', fontWeight: 600, color: '#52c41a' }}>{taskStats.completed}</div>
              <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>已完成</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ background: '#ffffff', border: '1px solid #e8e2d8', borderRadius: '8px', textAlign: 'center' }}>
            <div className="stat-content">
              <div className="stat-number" style={{ fontSize: '32px', fontWeight: 600, color: '#1890ff' }}>{taskStats.inProgress}</div>
              <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>进行中</div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ background: '#ffffff', border: '1px solid #e8e2d8', borderRadius: '8px', textAlign: 'center' }}>
            <div className="stat-content">
              <div className="stat-number" style={{ fontSize: '32px', fontWeight: 600, color: '#faad14' }}>{taskStats.pending}</div>
              <div className="stat-label" style={{ color: '#666', fontSize: '14px' }}>待开始</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 任务列表 */}
      <Card 
        title="任务列表"
        style={{ 
          background: '#ffffff', 
          border: '1px solid #e8e2d8', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(139, 115, 85, 0.1)'
        }}
        headStyle={{
          background: '#faf9f7',
          borderBottom: '1px solid #e8e2d8',
          color: '#8b7355',
          fontWeight: 600
        }}
      >
        <Table 
          columns={columns} 
          dataSource={tasks} 
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
        />
      </Card>

      {/* 新增/编辑任务模态框 */}
      <Modal
        title={editingTask ? '编辑任务' : '新增任务'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        okButtonProps={{
          style: { background: '#d4a574', borderColor: '#d4a574' }
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="任务描述"
            rules={[{ required: true, message: '请输入任务描述' }]}
          >
            <TextArea rows={3} placeholder="请输入任务描述" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="任务类型"
                rules={[{ required: true, message: '请选择任务类型' }]}
              >
                <Select placeholder="请选择任务类型">
                  <Option value="daily">每日任务</Option>
                  <Option value="weekly">每周任务</Option>
                  <Option value="monthly">每月任务</Option>
                  <Option value="special">特殊任务</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="优先级"
                rules={[{ required: true, message: '请选择优先级' }]}
              >
                <Select placeholder="请选择优先级">
                  <Option value="low">低</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">高</Option>
                  <Option value="urgent">紧急</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="deadline"
                label="截止日期"
                rules={[{ required: true, message: '请选择截止日期' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="assignedTo"
                label="分配给"
              >
                <Input placeholder="分配给谁（可选）" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item label="任务奖励">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={['reward', 'experience']}
                  label="经验值"
                >
                  <Input type="number" placeholder="经验值" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['reward', 'spiritStones']}
                  label="灵石"
                >
                  <Input type="number" placeholder="灵石数量" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['reward', 'items']}
                  label="物品奖励"
                >
                  <Input placeholder="物品名称（逗号分隔）" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
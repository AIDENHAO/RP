import React from 'react';
import { Card, Table, Tag, Space, Button, Avatar } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Disciple {
  key: string;
  name: string;
  level: string;
  cultivation: string;
  contribution: number;
  status: 'active' | 'retreat' | 'mission';
  avatar?: string;
}

const Users: React.FC = () => {
  const disciples: Disciple[] = [
    {
      key: '1',
      name: '张三丰',
      level: '金丹期',
      cultivation: '太极心法',
      contribution: 1250,
      status: 'active',
    },
    {
      key: '2',
      name: '李逍遥',
      level: '元婴期',
      cultivation: '御剑术',
      contribution: 2100,
      status: 'mission',
    },
    {
      key: '3',
      name: '赵灵儿',
      level: '化神期',
      cultivation: '女娲心法',
      contribution: 3200,
      status: 'retreat',
    },
  ];

  const columns: ColumnsType<Disciple> = [
    {
      title: '弟子',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span style={{ color: '#ffffff' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '修为等级',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color="gold" style={{ background: 'rgba(212, 165, 116, 0.2)', border: '1px solid #d4a574' }}>
          {level}
        </Tag>
      ),
    },
    {
      title: '修炼功法',
      dataIndex: 'cultivation',
      key: 'cultivation',
      render: (text) => <span style={{ color: '#8c9196' }}>{text}</span>,
    },
    {
      title: '贡献值',
      dataIndex: 'contribution',
      key: 'contribution',
      render: (value) => <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{value}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          active: { color: 'green', text: '在宗' },
          retreat: { color: 'blue', text: '闭关' },
          mission: { color: 'orange', text: '任务中' },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} style={{ color: '#d4a574' }}>
            编辑
          </Button>
          <Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={<span style={{ color: '#ffffff', fontSize: '18px' }}>弟子管理</span>}
        style={{
          background: 'linear-gradient(135deg, #1a2332, #2a3441)',
          border: '1px solid #3a4451',
          borderRadius: '16px',
        }}
        headStyle={{
          background: 'transparent',
          borderBottom: '1px solid #3a4451',
        }}
        bodyStyle={{ background: 'transparent' }}
      >
        <Table
          columns={columns}
          dataSource={disciples}
          style={{
            background: 'transparent',
          }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};

export default Users;
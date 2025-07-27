import React from 'react';
import { Card, List, Tag, Button, Space } from 'antd';
import { FileTextOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';

const Documents: React.FC = () => {
  const documents = [
    {
      id: 1,
      title: '太极心法修炼指南',
      type: '功法秘籍',
      level: '高级',
      author: '张三丰',
      updateTime: '2024-01-15',
      description: '详细介绍太极心法的修炼要诀和注意事项',
    },
    {
      id: 2,
      title: '宗门管理制度',
      type: '管理文档',
      level: '重要',
      author: '掌门',
      updateTime: '2024-01-10',
      description: '宗门内部管理制度和规章条例',
    },
    {
      id: 3,
      title: '炼丹术基础教程',
      type: '技能指南',
      level: '中级',
      author: '炼丹长老',
      updateTime: '2024-01-08',
      description: '从入门到精通的炼丹术完整教程',
    },
    {
      id: 4,
      title: '灵兽驯养手册',
      type: '专业指南',
      level: '高级',
      author: '兽王',
      updateTime: '2024-01-05',
      description: '各种灵兽的习性和驯养方法详解',
    },
  ];

  const getLevelColor = (level: string) => {
    const colors = {
      '基础': '#8c8c8c',
      '中级': '#1890ff',
      '高级': '#52c41a',
      '重要': '#faad14',
      '机密': '#f759ab',
    };
    return colors[level as keyof typeof colors] || '#8c8c8c';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      '功法秘籍': '#722ed1',
      '管理文档': '#1890ff',
      '技能指南': '#52c41a',
      '专业指南': '#faad14',
    };
    return colors[type as keyof typeof colors] || '#8c8c8c';
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#ffffff', margin: 0 }}>修炼体系文档</h2>
        <p style={{ color: '#8c9196', marginTop: '8px' }}>宗门内部功法秘籍和修炼指南</p>
      </div>
      
      <Card
        style={{
          background: 'linear-gradient(135deg, #1a2332, #2a3441)',
          border: '1px solid #3a4451',
          borderRadius: '16px',
        }}
        bodyStyle={{ background: 'transparent', padding: '16px' }}
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={documents}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{
                background: 'rgba(42, 52, 65, 0.3)',
                border: '1px solid #3a4451',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}
              actions={[
                <Button 
                  key="view" 
                  type="text" 
                  icon={<EyeOutlined />}
                  style={{ color: '#d4a574' }}
                >
                  查看
                </Button>,
                <Button 
                  key="download" 
                  type="text" 
                  icon={<DownloadOutlined />}
                  style={{ color: '#52c41a' }}
                >
                  下载
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #d4a574, #f0c896)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileTextOutlined style={{ fontSize: '24px', color: '#1a2332' }} />
                  </div>
                }
                title={
                  <div>
                    <h3 style={{ color: '#ffffff', margin: '0 0 8px 0' }}>{item.title}</h3>
                    <Space>
                      <Tag color={getTypeColor(item.type)}>{item.type}</Tag>
                      <Tag color={getLevelColor(item.level)}>{item.level}</Tag>
                    </Space>
                  </div>
                }
                description={
                  <div style={{ marginTop: '12px' }}>
                    <p style={{ color: '#8c9196', margin: '0 0 8px 0' }}>{item.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                      <span>作者：{item.author}</span>
                      <span>更新时间：{item.updateTime}</span>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Documents;
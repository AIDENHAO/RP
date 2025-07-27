import React from 'react';
import { Card, Form, Input, Select, Switch, Button, Divider, Space } from 'antd';
import { SettingOutlined, SaveOutlined } from '@ant-design/icons';

const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Settings saved:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#ffffff', margin: 0 }}>宗门设置</h2>
        <p style={{ color: '#8c9196', marginTop: '8px' }}>管理宗门的基本配置和系统设置</p>
      </div>
      
      <Card
        style={{
          background: 'linear-gradient(135deg, #1a2332, #2a3441)',
          border: '1px solid #3a4451',
          borderRadius: '16px',
        }}
        bodyStyle={{ background: 'transparent' }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            sectName: '逍遥宗',
            sectLevel: '2600',
            sectWeight: '260nm',
            autoAccept: true,
            notifications: true,
            theme: 'dark',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: '#d4a574', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <SettingOutlined style={{ marginRight: '8px' }} />
              基本信息
            </h3>
            
            <Form.Item
              label={<span style={{ color: '#8c9196' }}>宗门名称</span>}
              name="sectName"
              rules={[{ required: true, message: '请输入宗门名称' }]}
            >
              <Input 
                style={{
                  background: 'rgba(42, 52, 65, 0.5)',
                  border: '1px solid #3a4451',
                  borderRadius: '8px',
                  color: '#ffffff',
                }}
              />
            </Form.Item>
            
            <Form.Item
              label={<span style={{ color: '#8c9196' }}>宗门等级</span>}
              name="sectLevel"
            >
              <Input 
                style={{
                  background: 'rgba(42, 52, 65, 0.5)',
                  border: '1px solid #3a4451',
                  borderRadius: '8px',
                  color: '#ffffff',
                }}
              />
            </Form.Item>
            
            <Form.Item
              label={<span style={{ color: '#8c9196' }}>宗门重度</span>}
              name="sectWeight"
            >
              <Input 
                style={{
                  background: 'rgba(42, 52, 65, 0.5)',
                  border: '1px solid #3a4451',
                  borderRadius: '8px',
                  color: '#ffffff',
                }}
              />
            </Form.Item>
          </div>
          
          <Divider style={{ borderColor: '#3a4451' }} />
          
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: '#d4a574', marginBottom: '16px' }}>系统设置</h3>
            
            <Form.Item
              label={<span style={{ color: '#8c9196' }}>主题模式</span>}
              name="theme"
            >
              <Select
                style={{ width: '200px' }}
                dropdownStyle={{
                  background: '#1a2332',
                  border: '1px solid #3a4451',
                }}
              >
                <Option value="dark">深色模式</Option>
                <Option value="light">浅色模式</Option>
                <Option value="auto">自动切换</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              label={<span style={{ color: '#8c9196' }}>自动接收弟子申请</span>}
              name="autoAccept"
              valuePropName="checked"
            >
              <Switch 
                style={{
                  background: '#3a4451',
                }}
              />
            </Form.Item>
            
            <Form.Item
              label={<span style={{ color: '#8c9196' }}>系统通知</span>}
              name="notifications"
              valuePropName="checked"
            >
              <Switch 
                style={{
                  background: '#3a4451',
                }}
              />
            </Form.Item>
          </div>
          
          <Divider style={{ borderColor: '#3a4451' }} />
          
          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #d4a574, #f0c896)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#1a2332',
                  fontWeight: 'bold',
                }}
              >
                保存设置
              </Button>
              <Button 
                style={{
                  background: 'transparent',
                  border: '1px solid #3a4451',
                  borderRadius: '8px',
                  color: '#8c9196',
                }}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
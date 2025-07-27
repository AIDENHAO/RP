import React, { useState } from 'react';
import { Form, Input, Button, Card, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const success = await login(values.username, values.password);
      if (success) {
        message.success('登录成功！');
        navigate('/');
      } else {
        message.error('用户名或密码错误！');
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-elements">
          <div className="floating-element">⚡</div>
          <div className="floating-element">🔥</div>
          <div className="floating-element">💎</div>
          <div className="floating-element">⭐</div>
          <div className="floating-element">🏛️</div>
          <div className="floating-element">🌪</div>
          <div className="floating-element">🌠</div>
          <div className="floating-element">🌌</div>
          <div className="floating-element">🗡</div>
          <div className="floating-element">🍃</div>
        </div>
      </div>
      
      <Card className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">宗</div>
          </div>
          <h1 className="login-title">宗门管理系统</h1>
          <p className="login-subtitle">欢迎回到修仙世界</p>
        </div>
        
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#8c9196' }} />}
              placeholder="用户名"
              className="login-input"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#8c9196' }} />}
              placeholder="密码"
              className="login-input"
            />
          </Form.Item>
          
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox">
              记住我
            </Checkbox>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-button"
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        
        <div className="login-footer">
          <p>还没有账号？<a href="#" className="register-link">立即注册</a></p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
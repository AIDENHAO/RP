import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button, message } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  ShopOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CrownOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '宗门概览',
    },
    {
      key: '/master',
      icon: <CrownOutlined />,
      label: '宗门掌门',
    },
    {
      key: '/tasks',
      icon: <CheckSquareOutlined />,
      label: '任务栏',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: '弟子管理',
    },
    {
      key: '/products',
      icon: <ShopOutlined />,
      label: '资源管理',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: '资源统计',
    },
    {
      key: '/documents',
      icon: <FileTextOutlined />,
      label: '修炼体系',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '宗门设置',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
      message.success('已退出登录');
      navigate('/login');
    }
  };

  return (
    <Layout className="main-layout">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="sidebar"
        width={240}
      >
        <div className="logo">
          <div className="logo-icon">宗</div>
          {!collapsed && <span className="logo-text">宗门管理</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="sidebar-menu"
        />
      </Sider>
      <Layout>
        <Header className="header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="collapse-btn"
            />
            <span className="page-title">宗门管理系统</span>
          </div>
          <div className="header-right">
            <div className="sect-info">
              <span className="sect-level">重度：2600</span>
              <span className="sect-weight">重度：260nm</span>
            </div>
            <Badge count={5} className="notification-badge">
              <BellOutlined className="notification-icon" />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
            >
              <div className="user-info">
                <Avatar size={32} icon={<UserOutlined />} />
                <span className="username">{user?.name || 'EA1A2'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
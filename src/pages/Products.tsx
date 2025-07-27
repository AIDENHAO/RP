import React from 'react';
import { Card, Row, Col, Button, Tag, Progress } from 'antd';
import { ShopOutlined, PlusOutlined } from '@ant-design/icons';
import './Products.css';

const Products: React.FC = () => {
  const resources = [
    {
      id: 1,
      name: '筑基丹',
      type: '丹药',
      quantity: 280,
      maxQuantity: 500,
      quality: '上品',
      description: '助力弟子突破筑基期的珍贵丹药',
    },
    {
      id: 2,
      name: '灵石矿',
      type: '矿物',
      quantity: 1240,
      maxQuantity: 2000,
      quality: '极品',
      description: '蕴含丰富灵气的珍贵矿石',
    },
    {
      id: 3,
      name: '法器胚胎',
      type: '法器',
      quantity: 45,
      maxQuantity: 100,
      quality: '中品',
      description: '可炼制各种法器的基础材料',
    },
  ];

  const getQualityColor = (quality: string) => {
    const colors = {
      '下品': '#8c8c8c',
      '中品': '#1890ff',
      '上品': '#52c41a',
      '极品': '#faad14',
      '神品': '#f759ab',
    };
    return colors[quality as keyof typeof colors] || '#8c8c8c';
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h2 className="products-title">资源管理</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          className="add-resource-btn"
        >
          添加资源
        </Button>
      </div>
      
      <Row gutter={[24, 24]}>
        {resources.map((resource) => (
          <Col xs={24} sm={12} lg={8} key={resource.id}>
            <Card
              className="resource-card"
              hoverable
            >
              <div className="resource-header">
                <div className="resource-title-row">
                  <ShopOutlined className="resource-icon" />
                  <h3 className="resource-name">{resource.name}</h3>
                </div>
                <div className="resource-tags">
                  <Tag color="blue">{resource.type}</Tag>
                  <Tag color={getQualityColor(resource.quality)}>{resource.quality}</Tag>
                </div>
              </div>
              
              <div className="resource-inventory">
                <div className="inventory-row">
                  <span className="inventory-label">库存数量</span>
                  <span className="inventory-value">
                    {resource.quantity} / {resource.maxQuantity}
                  </span>
                </div>
                <Progress 
                  percent={(resource.quantity / resource.maxQuantity) * 100}
                  strokeColor={{
                    '0%': '#d4a574',
                    '100%': '#f0c896',
                  }}
                  trailColor="#e8e2d8"
                  showInfo={false}
                />
              </div>
              
              <p className="resource-description">
                {resource.description}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
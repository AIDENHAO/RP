import React from 'react';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import SectBuilding from '../components/SectBuilding';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const resourceData = [
    { name: '1月', value: 124, growth: 12.6 },
    { name: '2月', value: 132, growth: 15.2 },
    { name: '3月', value: 145, growth: 18.7 },
    { name: '4月', value: 158, growth: 22.1 },
    { name: '5月', value: 172, growth: 25.8 },
  ];

  const cultivationData = [
    { name: '筑基', value: 280 },
    { name: '金丹', value: 124 },
    { name: '元婴', value: 280 },
    { name: '化神', value: 280 },
  ];

  const sectGrowthData = [
    { month: '1月', disciples: 45, resources: 120 },
    { month: '2月', disciples: 52, resources: 135 },
    { month: '3月', disciples: 48, resources: 142 },
    { month: '4月', disciples: 61, resources: 158 },
    { month: '5月', disciples: 55, resources: 172 },
    { month: '6月', disciples: 67, resources: 185 },
  ];

  return (
    <div className="dashboard">
      <Row gutter={[24, 24]}>
        {/* 左侧统计卡片 */}
        <Col span={6}>
          <div className="stats-column">
            <Card className="stat-card spirit-stone">
              <div className="stat-header">
                <div className="stat-icon">💎</div>
                <span className="stat-title">灵石池</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">280</div>
                <div className="stat-unit">万枚</div>
                <div className="stat-detail">
                  <span className="stat-total">总计9387万枚</span>
                  <span className="stat-growth positive">+8.01% ↗</span>
                </div>
              </div>
            </Card>

            <Card className="stat-card contribution">
              <div className="stat-header">
                <div className="stat-icon">🏆</div>
                <span className="stat-title">贡献统计</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">280</div>
                <div className="stat-unit">万点</div>
                <div className="stat-detail">
                  <span className="stat-total">总计9387万点</span>
                  <span className="stat-growth positive">+8.01% ↗</span>
                </div>
              </div>
            </Card>

            <Card className="stat-card sect-reputation">
              <div className="stat-header">
                <div className="stat-icon">⭐</div>
                <span className="stat-title">宗誉值</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">280</div>
                <div className="stat-unit">万点</div>
                <div className="stat-detail">
                  <span className="stat-total">总计9387万点</span>
                  <span className="stat-growth positive">+8.01% ↗</span>
                </div>
              </div>
            </Card>
          </div>
        </Col>

        {/* 中间宗门建筑 */}
        <Col span={12}>
          <div className="sect-building-container">
            <SectBuilding />
          </div>
        </Col>

        {/* 右侧统计卡片和图表 */}
        <Col span={6}>
          <div className="stats-column">
            <Card className="stat-card disciples">
              <div className="stat-header">
                <div className="stat-icon">👥</div>
                <span className="stat-title">弟子数</span>
                <div className="stat-badge">+10</div>
              </div>
              <div className="stat-content">
                <div className="stat-number">124</div>
                <div className="stat-unit">人</div>
                <div className="stat-detail">
                  <span className="stat-total">总计8272人</span>
                  <span className="stat-growth positive">+4.01% ↗</span>
                </div>
              </div>
            </Card>

            <Card className="chart-card disciples-trend">
              <div className="chart-header">
                <span className="chart-title">弟子修为趋势</span>
                <div className="chart-badge">+5.6% ↗</div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={resourceData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#52c41a" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="chart-card sect-growth">
              <div className="chart-header">
                <span className="chart-title">宗门建设增长率</span>
                <div className="chart-badge positive">+9.2% ↗</div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={sectGrowthData}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1890ff" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="disciples" 
                      stroke="#1890ff" 
                      fillOpacity={1} 
                      fill="url(#colorGrowth)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* 底部扣子空间生成 */}
      <div className="bottom-section">
        <div className="space-generation">
          <span className="generation-text">扣子空间生成</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
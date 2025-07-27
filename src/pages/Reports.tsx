import React from 'react';
import { Card, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Reports: React.FC = () => {
  const monthlyData = [
    { month: '1月', disciples: 45, resources: 120, contribution: 890 },
    { month: '2月', disciples: 52, resources: 135, contribution: 950 },
    { month: '3月', disciples: 48, resources: 142, contribution: 1020 },
    { month: '4月', disciples: 61, resources: 158, contribution: 1150 },
    { month: '5月', disciples: 55, resources: 172, contribution: 1280 },
    { month: '6月', disciples: 67, resources: 185, contribution: 1420 },
  ];

  const cultivationData = [
    { name: '筑基期', value: 45, color: '#8c8c8c' },
    { name: '金丹期', value: 28, color: '#1890ff' },
    { name: '元婴期', value: 15, color: '#52c41a' },
    { name: '化神期', value: 8, color: '#faad14' },
    { name: '合体期', value: 3, color: '#f759ab' },
  ];

  const resourceTrend = [
    { month: '1月', 灵石: 1200, 丹药: 450, 法器: 280 },
    { month: '2月', 灵石: 1350, 丹药: 520, 法器: 320 },
    { month: '3月', 灵石: 1420, 丹药: 580, 法器: 350 },
    { month: '4月', 灵石: 1580, 丹药: 640, 法器: 380 },
    { month: '5月', 灵石: 1720, 丹药: 720, 法器: 420 },
    { month: '6月', 灵石: 1850, 丹药: 800, 法器: 450 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: '#ffffff', marginBottom: '24px' }}>资源统计报告</h2>
      
      <Row gutter={[24, 24]}>
        {/* 月度弟子增长 */}
        <Col xs={24} lg={12}>
          <Card
            title={<span style={{ color: '#ffffff' }}>月度弟子增长趋势</span>}
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4451" />
                <XAxis dataKey="month" stroke="#8c9196" />
                <YAxis stroke="#8c9196" />
                <Tooltip 
                  contentStyle={{
                    background: '#1a2332',
                    border: '1px solid #3a4451',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Bar dataKey="disciples" fill="#d4a574" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* 修为分布 */}
        <Col xs={24} lg={12}>
          <Card
            title={<span style={{ color: '#ffffff' }}>弟子修为分布</span>}
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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cultivationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cultivationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: '#1a2332',
                    border: '1px solid #3a4451',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* 资源增长趋势 */}
        <Col xs={24}>
          <Card
            title={<span style={{ color: '#ffffff' }}>资源增长趋势</span>}
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
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={resourceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4451" />
                <XAxis dataKey="month" stroke="#8c9196" />
                <YAxis stroke="#8c9196" />
                <Tooltip 
                  contentStyle={{
                    background: '#1a2332',
                    border: '1px solid #3a4451',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Line type="monotone" dataKey="灵石" stroke="#1890ff" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="丹药" stroke="#52c41a" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="法器" stroke="#faad14" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
import React from 'react';
import { Card, Row, Col, Avatar, Progress, Tag, Statistic, Divider } from 'antd';
import { CrownOutlined, ThunderboltOutlined, HeartOutlined, EyeOutlined, FireOutlined } from '@ant-design/icons';
import './Master.css';

const Master: React.FC = () => {
  // 掌门数据
  const masterData = {
    name: '凌霄真人',
    title: '天玄宗掌门',
    level: '化神期',
    cultivation: 8500,
    maxCultivation: 10000,
    age: 156,
    experience: 75,
    avatar: null,
    stats: {
      strength: 95,
      agility: 88,
      intelligence: 92,
      constitution: 90,
      luck: 85,
    },
    skills: [
      { name: '九天雷诀', level: 9, type: '攻击' },
      { name: '太虚剑法', level: 8, type: '剑法' },
      { name: '凌波微步', level: 7, type: '身法' },
      { name: '紫霞神功', level: 9, type: '内功' },
      { name: '天眼通', level: 6, type: '神通' },
    ],
    achievements: [
      { name: '宗门建立者', description: '创建天玄宗', rarity: 'legendary' },
      { name: '化神突破', description: '成功突破化神期', rarity: 'epic' },
      { name: '千年修行', description: '修行超过百年', rarity: 'rare' },
      { name: '弟子满门', description: '培养弟子超过100名', rarity: 'common' },
    ],
    resources: {
      spiritStones: 50000,
      contribution: 9999,
      reputation: 8500,
    }
  };

  const getSkillIcon = (type: string) => {
    switch (type) {
      case '攻击': return <ThunderboltOutlined />;
      case '剑法': return <FireOutlined />;
      case '身法': return <EyeOutlined />;
      case '内功': return <HeartOutlined />;
      case '神通': return <CrownOutlined />;
      default: return <ThunderboltOutlined />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#ff6b35';
      case 'epic': return '#9b59b6';
      case 'rare': return '#3498db';
      case 'common': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="master-page">
      <div className="master-header">
        <h2 className="master-title">宗门掌门</h2>
      </div>

      {/* 掌门基本信息 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card className="master-info-card" title="掌门信息">
            <div className="master-profile">
              <Avatar size={80} icon={<CrownOutlined />} className="master-avatar" />
              <div className="master-details">
                <h3 className="master-name">{masterData.name}</h3>
                <p className="master-title-text">{masterData.title}</p>
                <Tag color="gold" className="master-level">{masterData.level}</Tag>
                <p className="master-age">年龄：{masterData.age}岁</p>
              </div>
            </div>
            
            <Divider />
            
            <div className="cultivation-progress">
              <div className="progress-header">
                <span>修为进度</span>
                <span>{masterData.cultivation}/{masterData.maxCultivation}</span>
              </div>
              <Progress 
                percent={(masterData.cultivation / masterData.maxCultivation) * 100}
                strokeColor={{
                  '0%': '#d4a574',
                  '100%': '#f0c896',
                }}
                trailColor="#e8e2d8"
                showInfo={false}
              />
            </div>
            
            <div className="experience-progress">
              <div className="progress-header">
                <span>经验值</span>
                <span>{masterData.experience}%</span>
              </div>
              <Progress 
                percent={masterData.experience}
                strokeColor={{
                  '0%': '#74a5d4',
                  '100%': '#96c8f0',
                }}
                trailColor="#e8e2d8"
                showInfo={false}
              />
            </div>
          </Card>
        </Col>

        {/* 属性面板 */}
        <Col xs={24} lg={8}>
          <Card className="master-stats-card" title="属性面板">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">力量</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.stats.strength} 
                    strokeColor="#e74c3c"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.stats.strength}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">敏捷</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.stats.agility} 
                    strokeColor="#2ecc71"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.stats.agility}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">智力</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.stats.intelligence} 
                    strokeColor="#3498db"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.stats.intelligence}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">体质</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.stats.constitution} 
                    strokeColor="#f39c12"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.stats.constitution}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">幸运</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.stats.luck} 
                    strokeColor="#9b59b6"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.stats.luck}</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 资源统计 */}
        <Col xs={24} lg={8}>
          <Card className="master-resources-card" title="资源统计">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Statistic
                  title="灵石"
                  value={masterData.resources.spiritStones}
                  valueStyle={{ color: '#d4a574' }}
                  prefix={<ThunderboltOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="贡献度"
                  value={masterData.resources.contribution}
                  valueStyle={{ color: '#74a5d4' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="声望"
                  value={masterData.resources.reputation}
                  valueStyle={{ color: '#a574d4' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 技能和成就 */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card className="master-skills-card" title="掌门技能">
            <div className="skills-list">
              {masterData.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{getSkillIcon(skill.type)}</span>
                    <span className="skill-name">{skill.name}</span>
                    <Tag color="blue" className="skill-type">{skill.type}</Tag>
                  </div>
                  <div className="skill-level">
                    <span>等级 {skill.level}</span>
                    <Progress 
                      percent={(skill.level / 10) * 100}
                      strokeColor={{
                        '0%': '#d4a574',
                        '100%': '#f0c896',
                      }}
                      trailColor="#e8e2d8"
                      showInfo={false}
                      size="small"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="master-achievements-card" title="成就系统">
            <div className="achievements-list">
              {masterData.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-header">
                    <span className="achievement-name">{achievement.name}</span>
                    <Tag 
                      color={getRarityColor(achievement.rarity)}
                      className="achievement-rarity"
                    >
                      {achievement.rarity}
                    </Tag>
                  </div>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Master;
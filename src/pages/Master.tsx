import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Progress, Tag, Statistic, Divider, Button, Modal, message } from 'antd';
import { 
  CrownOutlined, 
  ThunderboltOutlined, 
  HeartOutlined, 
  EyeOutlined, 
  FireOutlined,
  StarOutlined,
  BulbOutlined,
  TrophyOutlined,
  GoldOutlined
} from '@ant-design/icons';
import './Master.css';

const Master: React.FC = () => {
  const [isBreakthroughModalVisible, setIsBreakthroughModalVisible] = useState(false);
  
  // 掌门数据 - 基于人物属性设计文档
  const masterData = {
    name: '凌霄真人',
    title: '天玄宗掌门',
    // 等级境界系统
    realm: {
      stage: '修士阶段',
      level: '化神期',
      subLevel: '化神中期',
      cultivation: 850000,
      maxCultivation: 1000000,
      breakthroughThreshold: 900000, // 90%阈值触发顿悟
    },
    age: 156,
    
    // 五行亲和度 (0-100)
    fiveElements: {
      metal: 85,
      wood: 72,
      water: 90,
      fire: 78,
      earth: 68,
    },
    
    // 基础属性
    baseStats: {
      soulStrength: 92, // 灵魂强度
      constitution: 88, // 体质属性
      lifeForce: 95,   // 生命力
    },
    
    // 三力系统
    threePowers: {
      bloodPower: { current: 8500, max: 10000 }, // 血量
      spiritPower: { current: 9200, max: 12000 }, // 灵力
      mentalPower: { current: 8800, max: 11000 }, // 精神力
    },
    
    // 战力属性
    combatStats: {
      attack: 950,
      defense: 880,
      speed: 920,
      criticalRate: 25,
      combatPower: 15680,
    },
    
    // 顿悟状态
    enlightenment: {
      isActive: true,
      remainingTime: 18, // 小时
      speedBonus: 50, // 修炼速度+50%
    },
    
    // 势力归属
    affiliation: {
      region: '东域',
      country: '大乾王朝',
      sect: '天玄宗',
      position: '宗主',
    },
    
    // 声望系统
    reputation: {
      fame: 8500, // 名誉值 (-10000 到 +10000)
      sectRelations: {
        '青云门': 85,
        '万剑宗': 72,
        '天音寺': 90,
        '鬼王宗': -45,
        '血炼堂': -80,
      }
    },
    
    // 货币系统
    currency: {
      copper: 50000,
      silver: 8000,
      gold: 1200,
      spiritStones: {
        lower: 50000,
        middle: 8000,
        upper: 1200,
        supreme: 50,
      },
      contribution: 9999,
      worldFame: 5680,
    },
    
    // 功法装备
    techniques: {
      heartMethod: { name: '太上忘情诀', level: 9, type: '心法' },
      skills: [
        { name: '九天雷诀', level: 9, type: '功法', element: 'fire' },
        { name: '水月神通', level: 8, type: '功法', element: 'water' },
      ],
      martialArts: [
        { name: '太虚剑法', level: 8, type: '武技', weapon: '剑' },
        { name: '凌波微步', level: 7, type: '武技', weapon: '身法' },
        { name: '千手如来掌', level: 6, type: '武技', weapon: '掌法' },
      ],
      secrets: [
        { name: '天眼通', level: 6, type: '秘术', cost: '精神力' },
      ],
    },
    
    // 特殊体质
    specialConstitution: {
      name: '先天道体',
      description: '修炼速度+30%，五行亲和度+10',
      rarity: 'legendary',
    },
    
    achievements: [
      { name: '宗门建立者', description: '创建天玄宗', rarity: 'legendary' },
      { name: '化神突破', description: '成功突破化神期', rarity: 'epic' },
      { name: '千年修行', description: '修行超过百年', rarity: 'rare' },
      { name: '弟子满门', description: '培养弟子超过100名', rarity: 'common' },
      { name: '五行通达', description: '五行亲和度均超过70', rarity: 'epic' },
    ],
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
                <Tag color="gold" className="master-level">{masterData.realm.level}</Tag>
                <Tag color="blue" className="master-sublevel">{masterData.realm.subLevel}</Tag>
                <p className="master-age">年龄：{masterData.age}岁</p>
              </div>
            </div>
            
            <Divider />
            
            <div className="cultivation-progress">
              <div className="progress-header">
                <span>修为进度</span>
                <span>{(masterData.realm.cultivation / 10000).toFixed(1)}万/{(masterData.realm.maxCultivation / 10000).toFixed(1)}万</span>
              </div>
              <Progress 
                percent={(masterData.realm.cultivation / masterData.realm.maxCultivation) * 100}
                strokeColor={{
                  '0%': '#d4a574',
                  '100%': '#f0c896',
                }}
                trailColor="#e8e2d8"
                showInfo={false}
              />
            </div>
            
            {/* 顿悟状态 */}
            <div className={`enlightenment-status ${masterData.enlightenment.isActive ? 'enlightenment-active' : ''}`}>
              <p className="enlightenment-text">
                {masterData.enlightenment.isActive 
                  ? `顿悟状态：修炼速度+${masterData.enlightenment.speedBonus}% (剩余${masterData.enlightenment.remainingTime}小时)`
                  : '未处于顿悟状态'
                }
              </p>
            </div>
            
            {/* 特殊体质 */}
            <div style={{ marginTop: 16 }}>
              <div className="progress-header">
                <span>特殊体质</span>
                <Tag color={masterData.specialConstitution.rarity === 'legendary' ? 'gold' : 'blue'}>
                  {masterData.specialConstitution.name}
                </Tag>
              </div>
              <p style={{ color: '#a0522d', fontSize: '13px', margin: '4px 0 0 0' }}>
                {masterData.specialConstitution.description}
              </p>
            </div>
          </Card>
        </Col>

        {/* 基础属性面板 */}
        <Col xs={24} lg={8}>
          <Card className="master-stats-card" title="基础属性">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">灵魂强度</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.baseStats.soulStrength} 
                    strokeColor="#9b59b6"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.baseStats.soulStrength}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">体质属性</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.baseStats.constitution} 
                    strokeColor="#f39c12"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.baseStats.constitution}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">生命力</span>
                <div className="stat-bar">
                  <Progress 
                    percent={masterData.baseStats.lifeForce} 
                    strokeColor="#e74c3c"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.baseStats.lifeForce}</span>
                </div>
              </div>
            </div>
            
            <Divider style={{ margin: '16px 0' }} />
            
            {/* 三力系统 */}
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">血量</span>
                <div className="stat-bar">
                  <Progress 
                    percent={(masterData.threePowers.bloodPower.current / masterData.threePowers.bloodPower.max) * 100} 
                    strokeColor="#dc143c"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.threePowers.bloodPower.current}/{masterData.threePowers.bloodPower.max}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">灵力</span>
                <div className="stat-bar">
                  <Progress 
                    percent={(masterData.threePowers.spiritPower.current / masterData.threePowers.spiritPower.max) * 100} 
                    strokeColor="#4169e1"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.threePowers.spiritPower.current}/{masterData.threePowers.spiritPower.max}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">精神力</span>
                <div className="stat-bar">
                  <Progress 
                    percent={(masterData.threePowers.mentalPower.current / masterData.threePowers.mentalPower.max) * 100} 
                    strokeColor="#9370db"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="stat-value">{masterData.threePowers.mentalPower.current}/{masterData.threePowers.mentalPower.max}</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 货币与声望 */}
        <Col xs={24} lg={8}>
          <Card className="master-resources-card" title="货币与声望">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="上品灵石"
                  value={masterData.currency.spiritStones.upper}
                  valueStyle={{ color: '#d4a574' }}
                  prefix={<GoldOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="极品灵石"
                  value={masterData.currency.spiritStones.supreme}
                  valueStyle={{ color: '#ff6b35' }}
                  prefix={<StarOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="贡献点"
                  value={masterData.currency.contribution}
                  valueStyle={{ color: '#74a5d4' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="名誉值"
                  value={masterData.reputation.fame}
                  valueStyle={{ color: '#a574d4' }}
                />
              </Col>
              <Col span={24}>
                <Statistic
                  title="战力"
                  value={masterData.combatStats.combatPower}
                  valueStyle={{ color: '#e74c3c', fontSize: '20px' }}
                  prefix={<TrophyOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 五行亲和度和功法装备 */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card className="five-elements-card" title="五行亲和度">
            <div className="elements-grid">
              <div className="element-item">
                <div className="element-icon element-metal">金</div>
                <span className="element-name">金</span>
                <div className="element-progress">
                  <Progress 
                    percent={masterData.fiveElements.metal}
                    strokeColor="#c0c0c0"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="element-value">{masterData.fiveElements.metal}</span>
                </div>
              </div>
              
              <div className="element-item">
                <div className="element-icon element-wood">木</div>
                <span className="element-name">木</span>
                <div className="element-progress">
                  <Progress 
                    percent={masterData.fiveElements.wood}
                    strokeColor="#228b22"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="element-value">{masterData.fiveElements.wood}</span>
                </div>
              </div>
              
              <div className="element-item">
                <div className="element-icon element-water">水</div>
                <span className="element-name">水</span>
                <div className="element-progress">
                  <Progress 
                    percent={masterData.fiveElements.water}
                    strokeColor="#4169e1"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="element-value">{masterData.fiveElements.water}</span>
                </div>
              </div>
              
              <div className="element-item">
                <div className="element-icon element-fire">火</div>
                <span className="element-name">火</span>
                <div className="element-progress">
                  <Progress 
                    percent={masterData.fiveElements.fire}
                    strokeColor="#dc143c"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="element-value">{masterData.fiveElements.fire}</span>
                </div>
              </div>
              
              <div className="element-item">
                <div className="element-icon element-earth">土</div>
                <span className="element-name">土</span>
                <div className="element-progress">
                  <Progress 
                    percent={masterData.fiveElements.earth}
                    strokeColor="#daa520"
                    trailColor="#e8e2d8"
                    showInfo={false}
                    size="small"
                  />
                  <span className="element-value">{masterData.fiveElements.earth}</span>
                </div>
              </div>
            </div>
            
            <Divider style={{ margin: '16px 0' }} />
            
            {/* 功法装备 */}
            <div className="skills-list">
              <div className="skill-item">
                <div className="skill-header">
                  <span className="skill-icon"><HeartOutlined /></span>
                  <span className="skill-name">{masterData.techniques.heartMethod.name}</span>
                  <Tag color="gold" className="skill-type">{masterData.techniques.heartMethod.type}</Tag>
                </div>
                <div className="skill-level">
                  <span>等级 {masterData.techniques.heartMethod.level}</span>
                  <Progress 
                    percent={(masterData.techniques.heartMethod.level / 10) * 100}
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
              
              {masterData.techniques.skills.map((skill: any, index: number) => (
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
          <Card className="breakthrough-card" title="境界突破">
            <div className="breakthrough-info">
              <div className="current-realm">
                <div className="realm-name">{masterData.realm.level}</div>
                <div className="realm-stage">{masterData.realm.subLevel}</div>
                <div className="breakthrough-progress">
                  <div className="progress-header">
                    <span>突破进度</span>
                    <span>{((masterData.realm.cultivation / masterData.realm.breakthroughThreshold) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    percent={(masterData.realm.cultivation / masterData.realm.breakthroughThreshold) * 100}
                    strokeColor={{
                      '0%': '#74a5d4',
                      '100%': '#96c8f0',
                    }}
                    trailColor="#e8e2d8"
                    showInfo={false}
                  />
                </div>
              </div>
              
              <Button 
                type="primary" 
                size="large" 
                block
                disabled={masterData.realm.cultivation < masterData.realm.breakthroughThreshold}
                onClick={() => setIsBreakthroughModalVisible(true)}
                style={{ 
                  background: masterData.realm.cultivation >= masterData.realm.breakthroughThreshold ? '#d4a574' : undefined,
                  borderColor: masterData.realm.cultivation >= masterData.realm.breakthroughThreshold ? '#d4a574' : undefined
                }}
              >
                {masterData.realm.cultivation >= masterData.realm.breakthroughThreshold ? '尝试突破' : '修为不足'}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* 门派关系和成就 */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card className="master-achievements-card" title="门派关系">
            <div className="achievements-list">
              {Object.entries(masterData.reputation.sectRelations).map(([sect, relation]: [string, number], index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-header">
                    <span className="achievement-name">{sect}</span>
                    <Tag 
                      color={relation > 70 ? 'green' : relation > 30 ? 'blue' : relation > 0 ? 'orange' : 'red'}
                      className="achievement-rarity"
                    >
                      {relation > 0 ? `+${relation}` : relation}
                    </Tag>
                  </div>
                  <p className="achievement-description">
                    {relation > 70 ? '友好' : relation > 30 ? '中立' : relation > 0 ? '冷淡' : '敌对'}
                  </p>
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
      
      {/* 突破确认模态框 */}
      <Modal
        title="境界突破"
        open={isBreakthroughModalVisible}
        onCancel={() => setIsBreakthroughModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsBreakthroughModalVisible(false)}>
            取消
          </Button>,
          <Button 
            key="confirm" 
            type="primary" 
            style={{ background: '#d4a574', borderColor: '#d4a574' }}
            onClick={() => {
              // 突破逻辑
              const success = Math.random() > 0.3; // 70%成功率
              if (success) {
                message.success('突破成功！境界提升！');
              } else {
                message.error('突破失败，修为受损...');
              }
              setIsBreakthroughModalVisible(false);
            }}
          >
            确认突破
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ fontSize: '16px', marginBottom: '16px' }}>当前境界：{masterData.realm.level} {masterData.realm.subLevel}</p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>突破成功率：70%</p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>灵魂强度：{masterData.baseStats.soulStrength}（影响突破成功率）</p>
          <p style={{ fontSize: '14px', color: '#ff4d4f' }}>警告：突破失败将损失部分修为！</p>
        </div>
      </Modal>
    </div>
  );
};

export default Master;
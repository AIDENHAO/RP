import React, { useState, useEffect, useCallback } from 'react';
import { 
  Card, Row, Col, Avatar, Progress, Tag, Statistic, Button, 
  Modal, message, Tabs, Badge, Space, Typography, Alert,
  Descriptions, List
} from 'antd';
import { 
  CrownOutlined, ThunderboltOutlined, HeartOutlined, 
  StarOutlined, BulbOutlined, TrophyOutlined, GoldOutlined,
  UserOutlined, TeamOutlined, SyncOutlined, 
  RiseOutlined, BookOutlined,
  DashboardOutlined, BankOutlined, GlobalOutlined
} from '@ant-design/icons';
import CharacterPanel from '../components/CharacterPanel';
import { sampleCharacter } from '../data/sampleCharacter';
import { Character } from '../types/character';
import './Master.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 基于人物属性设计文档的完整接口定义
interface RealmInfo {
  stage: '凡人阶段' | '修士阶段' | '仙神阶段';
  majorLevel: '黄级' | '玄级' | '地级' | '天级' | '帝级' | '仙级' | '神级';
  minorLevel: string;
  cultivation: number;
  maxCultivation: number;
  breakthroughThreshold: number;
  breakthroughRate: number;
}

interface FiveElements {
  metal: number; // 金 (0-100)
  wood: number;  // 木 (0-100)
  water: number; // 水 (0-100)
  fire: number;  // 火 (0-100)
  earth: number; // 土 (0-100)
}

interface BaseStats {
  soulStrength: number;  // 灵魂强度 (1-1000)
  constitution: number;  // 体质属性 (1-1000)
  lifeForce: number;     // 生命力 (1-100000)
}

interface ThreePowers {
  bloodPower: { current: number; max: number };   // 血量
  spiritPower: { current: number; max: number };  // 灵力
  mentalPower: { current: number; max: number };  // 精神力
}

interface CombatStats {
  combatPower: number;    // 战力属性 (1-10000000)
  attack: number;
  defense: number;
  speed: number;
  criticalRate: number;
}

interface Currency {
  copper: number;
  silver: number;
  gold: number;
  spiritStones: {
    lower: number;   // 下品灵石
    middle: number;  // 中品灵石
    upper: number;   // 上品灵石
    supreme: number; // 极品灵石
  };
  contribution: number;  // 宗门贡献点
  worldFame: number;     // 世界声望币
}

interface Technique {
  name: string;
  level: number;
  type: '心法' | '功法' | '武技' | '秘术' | '禁术';
  element?: '金' | '木' | '水' | '火' | '土';
  weapon?: string;
  rarity: '黄级' | '玄级' | '地级' | '天级' | '帝级' | '仙级' | '神级';
  description: string;
  effects: string[];
}

interface SectInfo {
  name: string;
  level: number;           // 宗门等级 (1-10)
  memberCount: number;     // 成员数量
  activeMemberCount: number; // 活跃人数
  resources: number;       // 资源储备
  reputation: number;      // 声望值
  defenseStrength: number; // 护宗大阵强度
  territoryArea: number;   // 领地面积
  buildings: {
    recruitmentHall: number;  // 招新广场等级
    resourceWarehouse: number; // 资源仓库等级
    cultivationHall: number;   // 修炼场等级
    affairsHall: number;      // 事务阁等级
    weaponVault: number;      // 兵器库等级
    protectionArray: number;  // 护宗阵等级
  };
}

interface MasterData {
  // 基础信息
  name: string;
  title: string;
  age: number;
  
  // 核心属性
  realm: RealmInfo;
  fiveElements: FiveElements;
  baseStats: BaseStats;
  threePowers: ThreePowers;
  combatStats: CombatStats;
  
  // 状态系统
  enlightenment: {
    isActive: boolean;
    remainingTime: number;
    speedBonus: number;
  };
  
  // 势力归属
  affiliation: {
    region: string;
    country: string;
    sect: string;
    position: string;
  };
  
  // 声望系统
  reputation: {
    fame: number; // 名誉值 (-10000 到 +10000)
    sectRelations: Record<string, number>; // 各门派友好度 (-1000 到 +1000)
  };
  
  // 货币系统
  currency: Currency;
  
  // 功法系统
  techniques: {
    heartMethod: Technique | null;  // 心法 (1个)
    skills: Technique[];            // 功法 (2个)
    martialArts: Technique[];       // 武技 (3个)
    secrets: Technique[];           // 秘术/禁术 (4个，禁术最多2个)
  };
  
  // 特殊体质
  specialConstitution: {
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';
    effects: string[];
  };
  
  // 成就系统
  achievements: Array<{
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlocked: boolean;
    progress?: number;
    maxProgress?: number;
  }>;
  
  // 宗门信息
  sectInfo: SectInfo;
}

const Master: React.FC = () => {
  // 状态管理
  const [isBreakthroughModalVisible, setIsBreakthroughModalVisible] = useState(false);
  const [isCultivating, setIsCultivating] = useState(false);
  const [cultivationTimer, setCultivationTimer] = useState<number | null>(null);
  const [currentCultivation, setCurrentCultivation] = useState(77987);
  const [isCharacterPanelVisible, setIsCharacterPanelVisible] = useState(false);
  const [character, setCharacter] = useState<Character>(sampleCharacter);
  const [activeTab, setActiveTab] = useState('overview');
  
  // 掌门数据 - 完全基于人物属性设计文档
  const masterData: MasterData = {
    name: '云逸仙',
    title: '天玄宗宗主',
    age: 156,
    
    // 等级境界系统 - 地级金丹期
    realm: {
      stage: '修士阶段',
      majorLevel: '地级',
      minorLevel: '金丹期',
      cultivation: currentCultivation,
      maxCultivation: 143862,
      breakthroughThreshold: 129476, // 90%阈值触发顿悟
      breakthroughRate: 0.7,
    },
    
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
      soulStrength: 650, // 灵魂强度 - 满足金丹期要求(600)
      constitution: 580, // 体质属性
      lifeForce: 8500,   // 生命力
    },
    
    // 三力系统
    threePowers: {
      bloodPower: { 
        current: 66000, 
        max: 70000 // 体质×100+等级×50
      },
      spiritPower: { 
        current: 52000, 
        max: 58000 // 精神×80+等级×40
      },
      mentalPower: { 
        current: 6250, 
        max: 7000 // 灵魂强度×5+等级×20
      },
    },
    
    // 战力属性
    combatStats: {
      combatPower: 156800, // 综合战力
      attack: 950,
      defense: 880,
      speed: 920,
      criticalRate: 25,
    },
    
    // 顿悟状态
    enlightenment: {
      isActive: true,
      remainingTime: 18, // 小时
      speedBonus: 50, // 修炼速度+50%
    },
    
    // 势力归属
    affiliation: {
      region: '东域青岚山脉',
      country: '大乾王朝',
      sect: '天玄宗',
      position: '宗主',
    },
    
    // 声望系统
    reputation: {
      fame: 8500, // 名誉值 (传奇级别)
      sectRelations: {
        '青云门': 850,
        '万剑宗': 720,
        '天音寺': 900,
        '鬼王宗': -450,
        '血炼堂': -800,
        '太虚宫': 650,
        '五行门': 780,
      }
    },
    
    // 货币系统
    currency: {
      copper: 500000,
      silver: 80000,
      gold: 12000,
      spiritStones: {
        lower: 500000,
        middle: 80000,
        upper: 12000,
        supreme: 500,
      },
      contribution: 99999,
      worldFame: 56800,
    },
    
    // 功法系统
    techniques: {
      heartMethod: {
        name: '太上忘情诀',
        level: 9,
        type: '心法',
        rarity: '天级',
        description: '太上道统心法，修炼可提升灵魂强度和修炼速度',
        effects: ['灵魂强度+50', '修炼速度+30%', '心境稳固+20%']
      },
      skills: [
        {
          name: '九天雷诀',
          level: 9,
          type: '功法',
          element: '火',
          rarity: '地级',
          description: '雷系攻击功法，威力巨大',
          effects: ['雷系伤害+80%', '麻痹效果', '范围攻击']
        },
        {
          name: '水月神通',
          level: 8,
          type: '功法',
          element: '水',
          rarity: '地级',
          description: '水系防御功法，可形成护盾',
          effects: ['水系防御+70%', '治疗效果', '净化负面状态']
        }
      ],
      martialArts: [
        {
          name: '太虚剑法',
          level: 8,
          type: '武技',
          weapon: '剑',
          rarity: '天级',
          description: '太虚宗传承剑法，剑意凌厉',
          effects: ['剑系伤害+90%', '剑意加成', '连击效果']
        },
        {
          name: '凌波微步',
          level: 7,
          type: '武技',
          weapon: '身法',
          rarity: '地级',
          description: '轻功身法，速度极快',
          effects: ['移动速度+60%', '闪避率+30%', '残影效果']
        },
        {
          name: '千手如来掌',
          level: 6,
          type: '武技',
          weapon: '掌法',
          rarity: '玄级',
          description: '佛门掌法，掌影重重',
          effects: ['掌法伤害+50%', '多重攻击', '震慑效果']
        }
      ],
      secrets: [
        {
          name: '天眼通',
          level: 6,
          type: '秘术',
          rarity: '地级',
          description: '神通秘术，可洞察万物',
          effects: ['洞察能力', '破除幻象', '预知危险']
        },
        {
          name: '分身术',
          level: 5,
          type: '秘术',
          rarity: '玄级',
          description: '分化身形，迷惑敌人',
          effects: ['创造分身', '分散伤害', '混淆视听']
        }
      ],
    },
    
    // 特殊体质
    specialConstitution: {
      name: '先天道体',
      description: '天生道韵，修炼天赋极佳',
      rarity: 'legendary',
      effects: [
        '修炼速度+30%',
        '五行亲和度+10',
        '突破成功率+15%',
        '功法领悟速度+50%'
      ]
    },
    
    // 成就系统
    achievements: [
      { name: '宗门建立者', description: '创建天玄宗', rarity: 'legendary', unlocked: true },
      { name: '金丹大成', description: '成功突破金丹期', rarity: 'epic', unlocked: true },
      { name: '百年修行', description: '修行超过百年', rarity: 'rare', unlocked: true },
      { name: '弟子满门', description: '培养弟子超过100名', rarity: 'common', unlocked: true },
      { name: '五行通达', description: '五行亲和度均超过70', rarity: 'epic', unlocked: true },
      { name: '元婴之路', description: '突破元婴期', rarity: 'legendary', unlocked: false, progress: 78, maxProgress: 100 },
    ],
    
    // 宗门信息
    sectInfo: {
      name: '天玄宗',
      level: 5,
      memberCount: 486,
      activeMemberCount: 389,
      resources: 5680000,
      reputation: 8500,
      defenseStrength: 2500,
      territoryArea: 5000, // 平方公里
      buildings: {
        recruitmentHall: 5,
        resourceWarehouse: 6,
        cultivationHall: 5,
        affairsHall: 4,
        weaponVault: 4,
        protectionArray: 5,
      }
    }
  };
  
  // 修炼增益计算函数
  const calculateCultivationGain = useCallback((): number => {
    const baseGain = 50; // 基础修炼增益
    const enlightenmentBonus = masterData.enlightenment.isActive ? masterData.enlightenment.speedBonus / 100 : 0;
    const constitutionBonus = masterData.specialConstitution.name === '先天道体' ? 0.3 : 0;
    const sectBonus = masterData.sectInfo.level >= 3 ? 0.1 : 0;
    const heartMethodBonus = masterData.techniques.heartMethod ? 0.3 : 0;
    
    return baseGain * (1 + enlightenmentBonus + constitutionBonus + sectBonus + heartMethodBonus);
  }, [masterData]);
  
  // 境界突破成功率计算
  const calculateBreakthroughRate = useCallback((): number => {
    const baseSoulStrength = masterData.baseStats.soulStrength;
    const requiredSoulStrength = getRequiredSoulStrength(masterData.realm.minorLevel);
    const constitutionBonus = masterData.specialConstitution.name === '先天道体' ? 0.15 : 0;
    
    let baseRate = 0.7; // 基础成功率70%
    
    if (baseSoulStrength < requiredSoulStrength) {
      baseRate -= 0.3; // 灵魂强度不足，成功率降低30%
    }
    
    return Math.min(0.95, Math.max(0.1, baseRate + constitutionBonus));
  }, [masterData]);
  
  // 根据境界获取所需灵魂强度
  const getRequiredSoulStrength = (realmLevel: string): number => {
    const requirements: Record<string, number> = {
      '练气期': 100, '筑基期': 200, '开光期': 300, '融合期': 400, '心动期': 500,
      '金丹期': 600, '元婴期': 700, '出窍期': 800, '分神期': 850, '合体期': 900,
      '洞虚期': 950, '大乘期': 1000, '渡劫期': 1000
    };
    return requirements[realmLevel] || 600;
  };
  
  // 修炼功能
  const startCultivation = () => {
    if (isCultivating) return;
    
    setIsCultivating(true);
    message.success('开始修炼！');
    
    const timer = setInterval(() => {
      setCurrentCultivation(prev => {
        const totalGain = calculateCultivationGain();
        const newValue = prev + totalGain;
        
        // 检查是否达到突破阈值
        if (newValue >= masterData.realm.breakthroughThreshold && prev < masterData.realm.breakthroughThreshold) {
          message.info('修为已达突破阈值，可尝试境界突破！');
        }
        
        return Math.min(newValue, masterData.realm.maxCultivation);
      });
    }, 1000); // 每秒更新一次
    
    setCultivationTimer(timer);
  };
  
  const stopCultivation = () => {
    if (!isCultivating) return;
    
    setIsCultivating(false);
    if (cultivationTimer) {
      clearInterval(cultivationTimer);
      setCultivationTimer(null);
    }
    message.info('停止修炼');
  };
  
  // 境界突破
  const attemptBreakthrough = () => {
    const successRate = calculateBreakthroughRate();
    const isSuccess = Math.random() < successRate;
    
    if (isSuccess) {
      message.success(`境界突破成功！恭喜突破至${getNextRealm(masterData.realm.minorLevel)}！`);
      setIsBreakthroughModalVisible(false);
    } else {
      message.error(`境界突破失败！修为保留70%，灵魂强度-30点`);
      setCurrentCultivation(prev => Math.floor(prev * 0.7));
    }
  };
  
  const getNextRealm = (currentRealm: string): string => {
    const realmProgression: Record<string, string> = {
      '金丹期': '元婴期',
      '元婴期': '出窍期',
      '出窍期': '分神期',
      // ... 其他境界
    };
    return realmProgression[currentRealm] || '未知境界';
  };
  
  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (cultivationTimer) {
        clearInterval(cultivationTimer);
      }
    };
  }, [cultivationTimer]);
  
  // 获取五行元素颜色
  const getElementColor = (element: string): string => {
    const colors: Record<string, string> = {
      metal: '#C0C0C0',
      wood: '#228B22',
      water: '#1E90FF',
      fire: '#FF4500',
      earth: '#8B4513'
    };
    return colors[element] || '#666';
  };
  
  // 获取稀有度颜色
  const getRarityColor = (rarity: string): string => {
    const colors: Record<string, string> = {
      'common': '#95a5a6',
      'rare': '#3498db',
      'epic': '#9b59b6',
      'legendary': '#f39c12',
      'mythical': '#e74c3c',
      '黄级': '#DAA520',
      '玄级': '#4169E1',
      '地级': '#8B4513',
      '天级': '#FF6347',
      '帝级': '#9932CC',
      '仙级': '#FFD700',
      '神级': '#FF1493'
    };
    return colors[rarity] || '#95a5a6';
  };
  
  return (
    <div className="master-page">
      <div className="master-header">
        <Title level={2} className="master-title">
          <CrownOutlined /> 宗门掌门
        </Title>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="master-tabs">
        {/* 总览面板 */}
        <TabPane tab={<span><DashboardOutlined />总览</span>} key="overview">
          <Row gutter={[16, 16]}>
            {/* 掌门基本信息 */}
            <Col span={24}>
              <Card className="master-info-card" title="掌门信息">
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <div className="master-avatar-section">
                      <Badge count={masterData.enlightenment.isActive ? '顿悟中' : 0} color="gold">
                        <Avatar 
                          size={120} 
                          icon={<CrownOutlined />} 
                          className="master-avatar"
                          onClick={() => setIsCharacterPanelVisible(true)}
                          style={{ cursor: 'pointer' }}
                        />
                      </Badge>
                      <div className="avatar-glow"></div>
                    </div>
                  </Col>
                  <Col span={18}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label="姓名">
                            <Text strong style={{ fontSize: '18px', color: '#8b4513' }}>
                              {masterData.name}
                            </Text>
                          </Descriptions.Item>
                          <Descriptions.Item label="头衔">
                            <Tag color="gold" icon={<CrownOutlined />}>
                              {masterData.title}
                            </Tag>
                          </Descriptions.Item>
                          <Descriptions.Item label="境界">
                            <Space>
                              <Tag color="purple">{masterData.realm.stage}</Tag>
                              <Tag color="blue">{masterData.realm.majorLevel}</Tag>
                              <Tag color="green">{masterData.realm.minorLevel}</Tag>
                            </Space>
                          </Descriptions.Item>
                          <Descriptions.Item label="年龄">
                            {masterData.age}岁
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                      <Col span={12}>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label="战力">
                            <Statistic 
                              value={masterData.combatStats.combatPower} 
                              prefix={<ThunderboltOutlined />}
                              valueStyle={{ color: '#cf1322', fontSize: '16px' }}
                            />
                          </Descriptions.Item>
                          <Descriptions.Item label="特殊体质">
                            <Tag color={getRarityColor(masterData.specialConstitution.rarity)}>
                              {masterData.specialConstitution.name}
                            </Tag>
                          </Descriptions.Item>
                          <Descriptions.Item label="势力归属">
                            <div>
                              <div>{masterData.affiliation.region}</div>
                              <div>{masterData.affiliation.country}</div>
                              <div>{masterData.affiliation.sect}</div>
                            </div>
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
            
            {/* 修炼状态 */}
            <Col span={12}>
              <Card title={<span><BulbOutlined />修炼状态</span>} className="cultivation-card">
                <div className="cultivation-progress">
                  <div className="progress-header">
                    <Text>修为进度</Text>
                    <Text type="secondary">
                      {currentCultivation.toLocaleString()} / {masterData.realm.maxCultivation.toLocaleString()}
                    </Text>
                  </div>
                  <Progress 
                    percent={(currentCultivation / masterData.realm.maxCultivation) * 100}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                  />
                  
                  {masterData.enlightenment.isActive && (
                    <Alert
                      message="顿悟状态"
                      description={`修炼速度+${masterData.enlightenment.speedBonus}%，剩余${masterData.enlightenment.remainingTime}小时`}
                      type="success"
                      showIcon
                      style={{ marginTop: 8 }}
                    />
                  )}
                  
                  <div className="cultivation-controls" style={{ marginTop: 16 }}>
                    <Space>
                      <Button 
                        type="primary" 
                        icon={<SyncOutlined spin={isCultivating} />}
                        onClick={isCultivating ? stopCultivation : startCultivation}
                      >
                        {isCultivating ? '停止修炼' : '开始修炼'}
                      </Button>
                      <Button 
                        type="default" 
                        icon={<RiseOutlined />}
                        onClick={() => setIsBreakthroughModalVisible(true)}
                        disabled={currentCultivation < masterData.realm.breakthroughThreshold}
                      >
                        境界突破
                      </Button>
                    </Space>
                  </div>
                </div>
              </Card>
            </Col>
            
            {/* 三力系统 */}
            <Col span={12}>
              <Card title={<span><HeartOutlined />三力系统</span>} className="three-powers-card">
                <div className="powers-container">
                  <div className="power-item blood-power">
                    <div className="power-header">
                      <div className="power-icon">🩸</div>
                      <span className="power-name">血量</span>
                      <span className="power-value">
                        {masterData.threePowers.bloodPower.current.toLocaleString()} / {masterData.threePowers.bloodPower.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="power-progress">
                      <Progress 
                        percent={(masterData.threePowers.bloodPower.current / masterData.threePowers.bloodPower.max) * 100}
                        strokeColor={{"0%": "#ff7875", "100%": "#ff4d4f"}}
                        showInfo={false}
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                  <div className="power-item spirit-power">
                    <div className="power-header">
                      <div className="power-icon">✨</div>
                      <span className="power-name">灵力</span>
                      <span className="power-value">
                        {masterData.threePowers.spiritPower.current.toLocaleString()} / {masterData.threePowers.spiritPower.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="power-progress">
                      <Progress 
                        percent={(masterData.threePowers.spiritPower.current / masterData.threePowers.spiritPower.max) * 100}
                        strokeColor={{"0%": "#40a9ff", "100%": "#1890ff"}}
                        showInfo={false}
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                  <div className="power-item mental-power">
                    <div className="power-header">
                      <div className="power-icon">🧠</div>
                      <span className="power-name">精神力</span>
                      <span className="power-value">
                        {masterData.threePowers.mentalPower.current.toLocaleString()} / {masterData.threePowers.mentalPower.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="power-progress">
                      <Progress 
                        percent={(masterData.threePowers.mentalPower.current / masterData.threePowers.mentalPower.max) * 100}
                        strokeColor={{"0%": "#73d13d", "100%": "#52c41a"}}
                        showInfo={false}
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            {/* 五行亲和度 */}
            <Col span={12}>
              <Card title={<span><StarOutlined />五行亲和度</span>} className="elements-card">
                <div className="elements-container">
                  {Object.entries(masterData.fiveElements).map(([element, value]) => {
                    const elementNames: Record<string, string> = {
                      metal: '金', wood: '木', water: '水', fire: '火', earth: '土'
                    };
                    const elementIcons: Record<string, string> = {
                      metal: '⚔️', wood: '🌿', water: '💧', fire: '🔥', earth: '🗻'
                    };
                    return (
                      <div key={element} className="element-item">
                        <div className="element-header">
                          <div className="element-icon">{elementIcons[element]}</div>
                          <span className="element-name">{elementNames[element]}</span>
                          <span className="element-value">{value}</span>
                        </div>
                        <div className="element-progress">
                          <Progress 
                            percent={value}
                            strokeColor={getElementColor(element)}
                            showInfo={false}
                            size="small"
                            strokeWidth={6}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Col>
            
            {/* 基础属性 */}
            <Col span={12}>
              <Card title={<span><UserOutlined />基础属性</span>} className="base-stats-card">
                <div className="stats-grid">
                  <div className="stat-item soul-strength">
                    <div className="stat-icon">👁️</div>
                    <div className="stat-content">
                      <div className="stat-number">{masterData.baseStats.soulStrength}</div>
                      <div className="stat-label">灵魂强度</div>
                    </div>
                  </div>
                  <div className="stat-item constitution">
                    <div className="stat-icon">🛡️</div>
                    <div className="stat-content">
                      <div className="stat-number">{masterData.baseStats.constitution}</div>
                      <div className="stat-label">体质属性</div>
                    </div>
                  </div>
                  <div className="stat-item life-force">
                    <div className="stat-icon">❤️</div>
                    <div className="stat-content">
                      <div className="stat-number">{masterData.baseStats.lifeForce.toLocaleString()}</div>
                      <div className="stat-label">生命力</div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            {/* 战力属性 */}
            <Col span={12}>
              <Card title={<span><ThunderboltOutlined />战力属性</span>} className="combat-stats-card">
                <div className="combat-container">
                  <div className="combat-power-main">
                    <div className="combat-icon">⚡</div>
                    <div className="combat-content">
                      <div className="combat-number">{masterData.combatStats.combatPower.toLocaleString()}</div>
                      <div className="combat-label">综合战力</div>
                    </div>
                  </div>
                  <div className="combat-details">
                    <div className="combat-detail-item">
                      <span className="detail-icon">⚔️</span>
                      <span className="detail-label">攻击</span>
                      <span className="detail-value">{masterData.combatStats.attack}</span>
                    </div>
                    <div className="combat-detail-item">
                      <span className="detail-icon">🛡️</span>
                      <span className="detail-label">防御</span>
                      <span className="detail-value">{masterData.combatStats.defense}</span>
                    </div>
                    <div className="combat-detail-item">
                      <span className="detail-icon">💨</span>
                      <span className="detail-label">速度</span>
                      <span className="detail-value">{masterData.combatStats.speed}</span>
                    </div>
                    <div className="combat-detail-item">
                      <span className="detail-icon">💥</span>
                      <span className="detail-label">暴击率</span>
                      <span className="detail-value">{masterData.combatStats.criticalRate}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            {/* 势力归属 */}
            <Col span={12}>
              <Card title={<span><GlobalOutlined />势力归属</span>} className="affiliation-card">
                <div className="affiliation-container">
                  <div className="affiliation-item">
                    <div className="affiliation-icon">🏔️</div>
                    <div className="affiliation-content">
                      <div className="affiliation-label">地域</div>
                      <div className="affiliation-value">{masterData.affiliation.region}</div>
                    </div>
                  </div>
                  <div className="affiliation-item">
                    <div className="affiliation-icon">🏛️</div>
                    <div className="affiliation-content">
                      <div className="affiliation-label">国家</div>
                      <div className="affiliation-value">{masterData.affiliation.country}</div>
                    </div>
                  </div>
                  <div className="affiliation-item">
                    <div className="affiliation-icon">🏯</div>
                    <div className="affiliation-content">
                      <div className="affiliation-label">宗门</div>
                      <div className="affiliation-value">{masterData.affiliation.sect}</div>
                    </div>
                  </div>
                  <div className="affiliation-item">
                    <div className="affiliation-icon">👑</div>
                    <div className="affiliation-content">
                      <div className="affiliation-label">职位</div>
                      <div className="affiliation-value">{masterData.affiliation.position}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            {/* 声望系统 */}
            <Col span={24}>
              <Card title={<span><TrophyOutlined />声望系统</span>} className="reputation-card">
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <div className="fame-section">
                      <div className="fame-header">
                        <div className="fame-icon">🌟</div>
                        <span className="fame-title">名誉值</span>
                      </div>
                      <div className="fame-content">
                        <div className="fame-number">{masterData.reputation.fame.toLocaleString()}</div>
                        <div className="fame-level">传奇级别</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={16}>
                    <div className="sect-relations">
                      <div className="relations-title">门派关系</div>
                      <div className="relations-grid">
                        {Object.entries(masterData.reputation.sectRelations).map(([sect, relation]) => {
                          const getRelationColor = (value: number) => {
                            if (value >= 800) return '#52c41a';
                            if (value >= 500) return '#1890ff';
                            if (value >= 0) return '#faad14';
                            if (value >= -500) return '#fa8c16';
                            return '#ff4d4f';
                          };
                          const getRelationText = (value: number) => {
                            if (value >= 800) return '盟友';
                            if (value >= 500) return '友好';
                            if (value >= 0) return '中立';
                            if (value >= -500) return '敌对';
                            return '仇敌';
                          };
                          return (
                            <div key={sect} className="relation-item">
                              <div className="relation-sect">{sect}</div>
                              <div className="relation-value" style={{ color: getRelationColor(relation) }}>
                                {relation > 0 ? '+' : ''}{relation}
                              </div>
                              <div className="relation-status" style={{ color: getRelationColor(relation) }}>
                                {getRelationText(relation)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        {/* 功法系统 */}
        <TabPane tab={<span><BookOutlined />功法</span>} key="techniques">
          <Row gutter={[16, 16]}>
            {/* 心法 */}
            <Col span={24}>
              <Card title="心法 (1/1)" className="technique-card">
                {masterData.techniques.heartMethod ? (
                  <Card.Grid style={{ width: '100%' }}>
                    <div className="technique-item">
                      <div className="technique-header">
                        <Text strong style={{ color: getRarityColor(masterData.techniques.heartMethod.rarity) }}>
                          {masterData.techniques.heartMethod.name}
                        </Text>
                        <Tag color={getRarityColor(masterData.techniques.heartMethod.rarity)}>
                          {masterData.techniques.heartMethod.rarity}
                        </Tag>
                        <Tag>等级 {masterData.techniques.heartMethod.level}</Tag>
                      </div>
                      <Text type="secondary">{masterData.techniques.heartMethod.description}</Text>
                      <div className="technique-effects">
                         {masterData.techniques.heartMethod.effects.map((effect, index) => (
                           <Tag key={index} color="blue">{effect}</Tag>
                         ))}
                       </div>
                    </div>
                  </Card.Grid>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Text type="secondary">未装备心法</Text>
                  </div>
                )}
              </Card>
            </Col>
            
            {/* 功法技能 */}
            <Col span={12}>
              <Card title={`功法技能 (${masterData.techniques.skills.length}/2)`}>
                {masterData.techniques.skills.map((skill, index) => (
                  <Card.Grid key={index} style={{ width: '100%', marginBottom: 8 }}>
                    <div className="technique-item">
                      <div className="technique-header">
                        <Text strong style={{ color: getRarityColor(skill.rarity) }}>
                          {skill.name}
                        </Text>
                        <Space>
                          <Tag color={getRarityColor(skill.rarity)}>{skill.rarity}</Tag>
                          <Tag>等级 {skill.level}</Tag>
                          {skill.element && (
                            <Tag color={getElementColor(skill.element)}>{skill.element}系</Tag>
                          )}
                        </Space>
                      </div>
                      <Text type="secondary">{skill.description}</Text>
                      <div className="technique-effects">
                         {skill.effects.map((effect, idx) => (
                           <Tag key={idx} color="green">{effect}</Tag>
                         ))}
                       </div>
                    </div>
                  </Card.Grid>
                ))}
              </Card>
            </Col>
            
            {/* 武技 */}
            <Col span={12}>
              <Card title={`武技 (${masterData.techniques.martialArts.length}/3)`}>
                {masterData.techniques.martialArts.map((martial, index) => (
                  <Card.Grid key={index} style={{ width: '100%', marginBottom: 8 }}>
                    <div className="technique-item">
                      <div className="technique-header">
                        <Text strong style={{ color: getRarityColor(martial.rarity) }}>
                          {martial.name}
                        </Text>
                        <Space>
                          <Tag color={getRarityColor(martial.rarity)}>{martial.rarity}</Tag>
                          <Tag>等级 {martial.level}</Tag>
                          <Tag color="orange">{martial.weapon}</Tag>
                        </Space>
                      </div>
                      <Text type="secondary">{martial.description}</Text>
                      <div className="technique-effects">
                         {martial.effects.map((effect, idx) => (
                           <Tag key={idx} color="purple">{effect}</Tag>
                         ))}
                       </div>
                    </div>
                  </Card.Grid>
                ))}
              </Card>
            </Col>
            
            {/* 秘术 */}
            <Col span={24}>
              <Card title={`秘术/禁术 (${masterData.techniques.secrets.length}/4)`}>
                <Row gutter={[16, 16]}>
                  {masterData.techniques.secrets.map((secret, index) => (
                    <Col span={12} key={index}>
                      <Card.Grid style={{ width: '100%' }}>
                        <div className="technique-item">
                          <div className="technique-header">
                            <Text strong style={{ color: getRarityColor(secret.rarity) }}>
                              {secret.name}
                            </Text>
                            <Space>
                              <Tag color={getRarityColor(secret.rarity)}>{secret.rarity}</Tag>
                              <Tag>等级 {secret.level}</Tag>
                              <Tag color={secret.type === '禁术' ? 'red' : 'cyan'}>{secret.type}</Tag>
                            </Space>
                          </div>
                          <Text type="secondary">{secret.description}</Text>
                          <div className="technique-effects">
                             {secret.effects.map((effect, idx) => (
                               <Tag key={idx} color="gold">{effect}</Tag>
                             ))}
                           </div>
                        </div>
                      </Card.Grid>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        {/* 宗门管理 */}
        <TabPane tab={<span><TeamOutlined />宗门</span>} key="sect">
          <Row gutter={[16, 16]}>
            {/* 宗门基本信息 */}
            <Col span={12}>
              <Card title={<span><TeamOutlined />宗门信息</span>}>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="宗门名称">
                    <Text strong style={{ fontSize: '16px' }}>{masterData.sectInfo.name}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="宗门等级">
                    <Tag color="gold">等级 {masterData.sectInfo.level}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="成员数量">
                    {masterData.sectInfo.memberCount} 人
                  </Descriptions.Item>
                  <Descriptions.Item label="活跃成员">
                    {masterData.sectInfo.activeMemberCount} 人
                  </Descriptions.Item>
                  <Descriptions.Item label="资源储备">
                    {masterData.sectInfo.resources.toLocaleString()} 灵石
                  </Descriptions.Item>
                  <Descriptions.Item label="宗门声望">
                    <Progress 
                      percent={(masterData.sectInfo.reputation / 10000) * 100}
                      strokeColor="#722ed1"
                      format={() => masterData.sectInfo.reputation}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="护宗大阵">
                    强度: {masterData.sectInfo.defenseStrength}
                  </Descriptions.Item>
                  <Descriptions.Item label="领地面积">
                    {masterData.sectInfo.territoryArea} 平方公里
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            
            {/* 宗门建筑 */}
            <Col span={12}>
              <Card title={<span><BankOutlined />宗门建筑</span>}>
                <List
                  size="small"
                  dataSource={[
                    { name: '招新广场', level: masterData.sectInfo.buildings.recruitmentHall, effect: '成员上限+100/级' },
                    { name: '资源仓库', level: masterData.sectInfo.buildings.resourceWarehouse, effect: '灵石产出+20%/级' },
                    { name: '修炼场', level: masterData.sectInfo.buildings.cultivationHall, effect: '经验加成+5%/级' },
                    { name: '事务阁', level: masterData.sectInfo.buildings.affairsHall, effect: '贡献获取+15%/级' },
                    { name: '兵器库', level: masterData.sectInfo.buildings.weaponVault, effect: '攻击力+50/级' },
                    { name: '护宗阵', level: masterData.sectInfo.buildings.protectionArray, effect: '防御强度+100/级' },
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{item.name}</Text>
                          <Tag color="blue">等级 {item.level}</Tag>
                        </div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.effect}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            
            {/* 门派关系 */}
            <Col span={24}>
              <Card title={<span><GlobalOutlined />门派关系</span>}>
                <Row gutter={[16, 16]}>
                  {Object.entries(masterData.reputation.sectRelations).map(([sect, relation]) => {
                    const getRelationColor = (value: number) => {
                      if (value >= 800) return '#52c41a';
                      if (value >= 500) return '#1890ff';
                      if (value >= 0) return '#faad14';
                      if (value >= -500) return '#fa8c16';
                      return '#f5222d';
                    };
                    
                    const getRelationText = (value: number) => {
                      if (value >= 800) return '盟友';
                      if (value >= 500) return '友好';
                      if (value >= 0) return '中立';
                      if (value >= -500) return '敌对';
                      return '仇敌';
                    };
                    
                    return (
                      <Col span={8} key={sect}>
                        <Card size="small">
                          <div style={{ textAlign: 'center' }}>
                            <Text strong>{sect}</Text>
                            <div style={{ margin: '8px 0' }}>
                              <Tag color={getRelationColor(relation)}>
                                {getRelationText(relation)}
                              </Tag>
                            </div>
                            <Progress 
                              percent={Math.abs(relation) / 10}
                              strokeColor={getRelationColor(relation)}
                              format={() => relation}
                              size="small"
                            />
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        {/* 货币资源 */}
        <TabPane tab={<span><GoldOutlined />资源</span>} key="resources">
          <Row gutter={[16, 16]}>
            {/* 基础货币 */}
            <Col span={12}>
              <Card title="基础货币">
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Statistic title="铜币" value={masterData.currency.copper} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="银币" value={masterData.currency.silver} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="金币" value={masterData.currency.gold} />
                  </Col>
                </Row>
              </Card>
            </Col>
            
            {/* 灵石 */}
            <Col span={12}>
              <Card title="灵石">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic title="下品灵石" value={masterData.currency.spiritStones.lower} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="中品灵石" value={masterData.currency.spiritStones.middle} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="上品灵石" value={masterData.currency.spiritStones.upper} />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="极品灵石" 
                      value={masterData.currency.spiritStones.supreme}
                      valueStyle={{ color: '#cf1322' }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            
            {/* 特殊货币 */}
            <Col span={24}>
              <Card title="特殊货币">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic 
                      title="宗门贡献点" 
                      value={masterData.currency.contribution}
                      prefix={<TeamOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="世界声望币" 
                      value={masterData.currency.worldFame}
                      prefix={<GlobalOutlined />}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        {/* 成就系统 */}
        <TabPane tab={<span><TrophyOutlined />成就</span>} key="achievements">
          <Row gutter={[16, 16]}>
            {masterData.achievements.map((achievement, index) => (
              <Col span={12} key={index}>
                <Card 
                  size="small" 
                  className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-content">
                    <div className="achievement-header">
                      <Text strong style={{ color: getRarityColor(achievement.rarity) }}>
                        {achievement.name}
                      </Text>
                      <Tag color={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Tag>
                      {achievement.unlocked && <TrophyOutlined style={{ color: '#faad14' }} />}
                    </div>
                    <Text type="secondary">{achievement.description}</Text>
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <div style={{ marginTop: 8 }}>
                        <Progress 
                          percent={(achievement.progress! / achievement.maxProgress!) * 100}
                          format={() => `${achievement.progress}/${achievement.maxProgress}`}
                          size="small"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
      
      {/* 境界突破模态框 */}
      <Modal
        title="境界突破"
        visible={isBreakthroughModalVisible}
        onCancel={() => setIsBreakthroughModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsBreakthroughModalVisible(false)}>
            取消
          </Button>,
          <Button key="attempt" type="primary" danger onClick={attemptBreakthrough}>
            尝试突破 (成功率: {(calculateBreakthroughRate() * 100).toFixed(1)}%)
          </Button>,
        ]}
      >
        <div>
          <Alert
            message="境界突破风险提示"
            description="突破失败将导致修为保留70%，灵魂强度-30点，请谨慎选择！"
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Descriptions column={1}>
            <Descriptions.Item label="当前境界">
              {masterData.realm.majorLevel} {masterData.realm.minorLevel}
            </Descriptions.Item>
            <Descriptions.Item label="目标境界">
              {getNextRealm(masterData.realm.minorLevel)}
            </Descriptions.Item>
            <Descriptions.Item label="当前修为">
              {currentCultivation.toLocaleString()} / {masterData.realm.maxCultivation.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="突破成功率">
              <Progress 
                percent={calculateBreakthroughRate() * 100}
                strokeColor={calculateBreakthroughRate() > 0.7 ? '#52c41a' : '#faad14'}
                format={(percent) => `${percent?.toFixed(1)}%`}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
      
      {/* 人物详情面板 */}
      <CharacterPanel
        character={character}
        visible={isCharacterPanelVisible}
        onClose={() => setIsCharacterPanelVisible(false)}
        onCharacterUpdate={setCharacter}
      />
    </div>
  );
};

export default Master;
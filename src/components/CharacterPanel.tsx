import React, { useState, useEffect } from 'react';
import {
  Modal,
  Tabs,
  Card,
  Row,
  Col,
  Progress,
  Tag,
  Statistic,
  Button,
  Avatar,
  Divider,
  Tooltip,
  Badge,
  Space,
  message,
  Descriptions
} from 'antd';
import {
  UserOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  EyeOutlined,
  FireOutlined,
  StarOutlined,
  CrownOutlined,
  TrophyOutlined,
  GoldOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { Character, CultivationSession } from '../types/character';
import { CultivationLogic } from '../utils/cultivationLogic';

const { TabPane } = Tabs;

interface CharacterPanelProps {
  character: Character | null;
  visible: boolean;
  onClose: () => void;
  onCharacterUpdate: (character: Character) => void;
}

const CharacterPanel: React.FC<CharacterPanelProps> = ({
  character,
  visible,
  onClose,
  onCharacterUpdate
}) => {
  const [cultivationSession, setCultivationSession] = useState<CultivationSession>({
    isActive: false,
    startTime: null,
    baseGain: 50,
    bonusMultiplier: 1,
    currentGain: 0
  });
  const [cultivationTimer, setCultivationTimer] = useState<number | null>(null);
  const [isBreakthroughModalVisible, setIsBreakthroughModalVisible] = useState(false);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (cultivationTimer) {
        clearInterval(cultivationTimer);
      }
    };
  }, [cultivationTimer]);

  if (!character) return null;

  // 开始修炼
  const startCultivation = () => {
    if (cultivationSession.isActive) return;

    const gain = CultivationLogic.calculateCultivationGain(character);
    setCultivationSession({
      isActive: true,
      startTime: new Date(),
      baseGain: 50,
      bonusMultiplier: gain / 50,
      currentGain: gain
    });

    message.success(`开始修炼！每秒获得 ${gain} 修炼值`);

    const timer = setInterval(() => {
      const updatedCharacter = {
        ...character,
        realm: {
          ...character.realm,
          cultivation: Math.min(
            character.realm.cultivation + gain,
            character.realm.maxCultivation
          )
        },
        updatedAt: new Date()
      };

      // 检查顿悟触发
      if (CultivationLogic.checkEnlightenmentTrigger(updatedCharacter)) {
        const enlightenedCharacter = CultivationLogic.activateEnlightenment(updatedCharacter);
        onCharacterUpdate(enlightenedCharacter);
        message.success('触发顿悟状态！修炼速度+50%，持续24小时');
      } else {
        onCharacterUpdate(updatedCharacter);
      }

      // 检查是否达到突破条件
      if (CultivationLogic.canBreakthrough(updatedCharacter)) {
        message.info('修为已达突破阈值，可尝试境界突破！');
      }
    }, 1000);

    setCultivationTimer(timer);
  };

  // 停止修炼
  const stopCultivation = () => {
    if (!cultivationSession.isActive) return;

    setCultivationSession({
      ...cultivationSession,
      isActive: false,
      startTime: null
    });

    if (cultivationTimer) {
      clearInterval(cultivationTimer);
      setCultivationTimer(null);
    }

    message.info('停止修炼');
  };

  // 尝试突破
  const attemptBreakthrough = () => {
    if (!CultivationLogic.canBreakthrough(character)) {
      message.error('当前条件不满足突破要求');
      return;
    }

    const result = CultivationLogic.attemptBreakthrough(character);
    
    if (result.success && result.newRealm) {
      const updatedCharacter = {
        ...character,
        realm: result.newRealm,
        updatedAt: new Date()
      };
      onCharacterUpdate(updatedCharacter);
      message.success(`突破成功！晋升至${result.newRealm.majorLevel}${result.newRealm.minorLevel}`);
    } else {
      message.error('突破失败！');
      if (result.penalties) {
        // 应用失败惩罚
        const penalizedCharacter = {
          ...character,
          realm: {
            ...character.realm,
            cultivation: Math.floor(character.realm.cultivation * (result.penalties.cultivationRetention || 1))
          },
          baseStats: {
            ...character.baseStats,
            soulStrength: character.baseStats.soulStrength - (result.penalties.soulStrengthLoss || 0)
          },
          updatedAt: new Date()
        };
        onCharacterUpdate(penalizedCharacter);
      }
    }
    setIsBreakthroughModalVisible(false);
  };

  // 获取五行颜色
  const getElementColor = (element: string, value: number) => {
    const colors = {
      metal: '#C0C0C0',
      wood: '#228B22',
      water: '#4169E1',
      fire: '#FF4500',
      earth: '#8B4513'
    };
    return colors[element as keyof typeof colors] || '#666';
  };

  // 获取稀有度颜色
  const getRarityColor = (rarity: string) => {
    const colors = {
      common: '#666',
      rare: '#1890ff',
      epic: '#722ed1',
      legendary: '#fa8c16',
      mythical: '#f5222d'
    };
    return colors[rarity as keyof typeof colors] || '#666';
  };

  // 计算修炼进度
  const cultivationProgress = (character.realm.cultivation / character.realm.maxCultivation) * 100;
  const breakthroughProgress = (character.realm.cultivation / character.realm.breakthroughThreshold) * 100;

  return (
    <>
      <Modal
        title={null}
        open={visible}
        onCancel={onClose}
        footer={null}
        width={1200}
        style={{ top: 20 }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: '24px' }}>
          {/* 角色基本信息 */}
          <Card style={{ marginBottom: 16 }}>
            <Row gutter={24} align="middle">
              <Col span={4}>
                <Avatar size={80} icon={<UserOutlined />} />
              </Col>
              <Col span={20}>
                <Row gutter={16}>
                  <Col span={8}>
                    <h2 style={{ margin: 0 }}>{character.name}</h2>
                    <p style={{ margin: '4px 0', color: '#666' }}>年龄：{character.age}岁</p>
                    <Tag color="gold">{character.title.sectTitle}</Tag>
                    <Tag color="blue">{character.title.worldTitle}</Tag>
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="当前境界"
                      value={`${character.realm.majorLevel} ${character.realm.minorLevel}`}
                      prefix={<CrownOutlined />}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="战力"
                      value={CultivationLogic.calculateCombatPower(character)}
                      prefix={<ThunderboltOutlined />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <Tabs defaultActiveKey="cultivation">
            {/* 修炼面板 */}
            <TabPane tab="修炼" key="cultivation">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="修炼进度" extra={
                    character.enlightenment.isActive && (
                      <Badge status="processing" text={`顿悟中 (${character.enlightenment.remainingTime}h)`} />
                    )
                  }>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>修炼值</span>
                        <span>{character.realm.cultivation.toLocaleString()} / {character.realm.maxCultivation.toLocaleString()}</span>
                      </div>
                      <Progress percent={cultivationProgress} strokeColor="#52c41a" />
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>突破进度</span>
                        <span>{character.realm.cultivation.toLocaleString()} / {character.realm.breakthroughThreshold.toLocaleString()}</span>
                      </div>
                      <Progress percent={breakthroughProgress} strokeColor="#fa8c16" />
                    </div>

                    <Space>
                      {!cultivationSession.isActive ? (
                        <Button
                          type="primary"
                          icon={<PlayCircleOutlined />}
                          onClick={startCultivation}
                        >
                          开始修炼
                        </Button>
                      ) : (
                        <Button
                          icon={<PauseCircleOutlined />}
                          onClick={stopCultivation}
                        >
                          停止修炼
                        </Button>
                      )}
                      
                      <Button
                        type="primary"
                        danger
                        icon={<RocketOutlined />}
                        disabled={!CultivationLogic.canBreakthrough(character)}
                        onClick={() => setIsBreakthroughModalVisible(true)}
                      >
                        尝试突破
                      </Button>
                    </Space>

                    {cultivationSession.isActive && (
                      <div style={{ marginTop: 16, padding: 12, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6 }}>
                        <p style={{ margin: 0, color: '#52c41a' }}>
                          正在修炼中... 每秒获得 {cultivationSession.currentGain} 修炼值
                        </p>
                      </div>
                    )}
                  </Card>
                </Col>

                <Col span={12}>
                  <Card title="五行亲和度">
                    {Object.entries(character.fiveElements).map(([element, value]) => (
                      <div key={element} style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ color: getElementColor(element, value) }}>
                            {element === 'metal' ? '金' : element === 'wood' ? '木' : 
                             element === 'water' ? '水' : element === 'fire' ? '火' : '土'}
                          </span>
                          <span>{value}</span>
                        </div>
                        <Progress 
                          percent={value} 
                          strokeColor={getElementColor(element, value)}
                          showInfo={false}
                        />
                      </div>
                    ))}
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* 属性面板 */}
            <TabPane tab="属性" key="attributes">
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="基础属性">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="灵魂强度">{character.baseStats.soulStrength}</Descriptions.Item>
                      <Descriptions.Item label="体质属性">{character.baseStats.constitution}</Descriptions.Item>
                      <Descriptions.Item label="生命力">{character.baseStats.lifeForce}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                
                <Col span={8}>
                  <Card title="三力系统">
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>血量</span>
                        <span>{character.threePowers.bloodPower.current} / {character.threePowers.bloodPower.max}</span>
                      </div>
                      <Progress 
                        percent={(character.threePowers.bloodPower.current / character.threePowers.bloodPower.max) * 100}
                        strokeColor="#ff4d4f"
                      />
                    </div>
                    
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>灵力</span>
                        <span>{character.threePowers.spiritPower.current} / {character.threePowers.spiritPower.max}</span>
                      </div>
                      <Progress 
                        percent={(character.threePowers.spiritPower.current / character.threePowers.spiritPower.max) * 100}
                        strokeColor="#1890ff"
                      />
                    </div>
                    
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>精神力</span>
                        <span>{character.threePowers.mentalPower.current} / {character.threePowers.mentalPower.max}</span>
                      </div>
                      <Progress 
                        percent={(character.threePowers.mentalPower.current / character.threePowers.mentalPower.max) * 100}
                        strokeColor="#722ed1"
                      />
                    </div>
                  </Card>
                </Col>
                
                <Col span={8}>
                  <Card title="战斗属性">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="攻击力">{character.combatStats.attack}</Descriptions.Item>
                      <Descriptions.Item label="防御力">{character.combatStats.defense}</Descriptions.Item>
                      <Descriptions.Item label="速度">{character.combatStats.speed}</Descriptions.Item>
                      <Descriptions.Item label="暴击率">{character.combatStats.criticalRate}%</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* 功法面板 */}
            <TabPane tab="功法" key="techniques">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="已装备功法">
                    {character.techniques.heartMethod && (
                      <div style={{ marginBottom: 16 }}>
                        <h4>心法</h4>
                        <Tag color="gold">
                          {character.techniques.heartMethod.name} Lv.{character.techniques.heartMethod.level}
                        </Tag>
                      </div>
                    )}
                    
                    <div style={{ marginBottom: 16 }}>
                      <h4>功法</h4>
                      <Space wrap>
                        {character.techniques.skills.map((skill, index) => (
                          <Tag key={index} color="blue">
                            {skill.name} Lv.{skill.level}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <h4>武技</h4>
                      <Space wrap>
                        {character.techniques.martialArts.map((art, index) => (
                          <Tag key={index} color="green">
                            {art.name} Lv.{art.level}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                    
                    <div>
                      <h4>秘术</h4>
                      <Space wrap>
                        {character.techniques.secrets.map((secret, index) => (
                          <Tag key={index} color="purple">
                            {secret.name} Lv.{secret.level}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="特殊体质">
                    {character.specialConstitution ? (
                      <div>
                        <h3 style={{ color: getRarityColor(character.specialConstitution.rarity) }}>
                          {character.specialConstitution.name}
                        </h3>
                        <p>{character.specialConstitution.description}</p>
                        <Tag color={getRarityColor(character.specialConstitution.rarity)}>
                          {character.specialConstitution.rarity}
                        </Tag>
                      </div>
                    ) : (
                      <p style={{ color: '#999' }}>无特殊体质</p>
                    )}
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* 声望面板 */}
            <TabPane tab="声望" key="reputation">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="势力归属">
                    <Descriptions column={1}>
                      <Descriptions.Item label="地域">{character.affiliation.region}</Descriptions.Item>
                      <Descriptions.Item label="国家">{character.affiliation.country}</Descriptions.Item>
                      <Descriptions.Item label="宗门">{character.affiliation.sect}</Descriptions.Item>
                      <Descriptions.Item label="职位">{character.affiliation.position}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                  
                  <Card title="名誉值" style={{ marginTop: 16 }}>
                    <Statistic 
                      value={character.reputation.fame}
                      valueStyle={{ color: character.reputation.fame >= 0 ? '#3f8600' : '#cf1322' }}
                    />
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="门派关系">
                    {Object.entries(character.reputation.sectRelations).map(([sect, relation]) => (
                      <div key={sect} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span>{sect}</span>
                          <span style={{ color: relation >= 0 ? '#52c41a' : '#ff4d4f' }}>
                            {relation > 0 ? '+' : ''}{relation}
                          </span>
                        </div>
                        <Progress 
                          percent={((relation + 1000) / 2000) * 100}
                          strokeColor={relation >= 0 ? '#52c41a' : '#ff4d4f'}
                          showInfo={false}
                        />
                      </div>
                    ))}
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* 货币面板 */}
            <TabPane tab="财富" key="currency">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="基础货币">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic title="铜币" value={character.currency.copper} />
                      </Col>
                      <Col span={8}>
                        <Statistic title="银币" value={character.currency.silver} />
                      </Col>
                      <Col span={8}>
                        <Statistic title="金币" value={character.currency.gold} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="灵石">
                    <Row gutter={16}>
                      <Col span={6}>
                        <Statistic title="下品" value={character.currency.spiritStones.lower} />
                      </Col>
                      <Col span={6}>
                        <Statistic title="中品" value={character.currency.spiritStones.middle} />
                      </Col>
                      <Col span={6}>
                        <Statistic title="上品" value={character.currency.spiritStones.upper} />
                      </Col>
                      <Col span={6}>
                        <Statistic title="极品" value={character.currency.spiritStones.supreme} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Card title="特殊货币">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic title="宗门贡献" value={character.currency.contribution} />
                      </Col>
                      <Col span={12}>
                        <Statistic title="世界声望" value={character.currency.worldFame} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Modal>

      {/* 突破确认弹窗 */}
      <Modal
        title="境界突破"
        open={isBreakthroughModalVisible}
        onOk={attemptBreakthrough}
        onCancel={() => setIsBreakthroughModalVisible(false)}
        okText="确认突破"
        cancelText="取消"
      >
        <div>
          <p>当前境界：{character.realm.majorLevel} {character.realm.minorLevel}</p>
          <p>突破成功率：{CultivationLogic.calculateBreakthroughSuccessRate(character)}%</p>
          <p style={{ color: '#ff4d4f' }}>注意：突破失败将会有惩罚！</p>
        </div>
      </Modal>
    </>
  );
};

export default CharacterPanel;
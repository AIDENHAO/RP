import React, { useState, useEffect } from 'react';
import {
  Card, Row, Col, Tabs, Table, Button, Tag, Progress, Modal, Form, Input, Select, 
  message, Tooltip, Badge, Space, Typography, Divider, List, Avatar, Statistic,
  Descriptions, Alert, Popconfirm, Rate, Switch, Slider, Image, Upload
} from 'antd';
import {
  ToolOutlined, SafetyOutlined, ThunderboltOutlined, FireOutlined,
  CrownOutlined, StarOutlined, TrophyOutlined, BulbOutlined,
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  DownloadOutlined, UploadOutlined, SettingOutlined, TeamOutlined,
  ExperimentOutlined, RocketOutlined, HeartOutlined
} from '@ant-design/icons';
import SectBuilding from '../components/SectBuilding';
import './WeaponHall.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface Weapon {
  id: string;
  name: string;
  type: '剑' | '刀' | '枪' | '棍' | '锤' | '弓' | '盾' | '甲' | '法器' | '符箓';
  category: '攻击型' | '防御型' | '辅助型' | '特殊型';
  element: '金' | '木' | '水' | '火' | '土' | '雷' | '风' | '无';
  rarity: '凡品' | '精品' | '灵品' | '仙品' | '神品' | '圣品';
  level: number;
  maxLevel: number;
  description: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
    criticalRate: number;
    durability: number;
    maxDurability: number;
  };
  effects: string[];
  requirements: {
    realm: string;
    strength: number;
    agility: number;
  };
  isEquipped: boolean;
  isBound: boolean;
  owner: string;
  forgeCost: {
    materials: string[];
    spiritStones: number;
    contribution: number;
  };
  upgradeCost: {
    materials: string[];
    spiritStones: number;
    contribution: number;
  };
  enchantments: Array<{
    name: string;
    level: number;
    effect: string;
  }>;
}

const WeaponHall: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
  const [isForgeModalVisible, setIsForgeModalVisible] = useState(false);
  const [isEnchantModalVisible, setIsEnchantModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // 模拟兵器数据
  const [weapons, setWeapons] = useState<Weapon[]>([
    {
      id: '1',
      name: '青莲剑',
      type: '剑',
      category: '攻击型',
      element: '木',
      rarity: '仙品',
      level: 8,
      maxLevel: 10,
      description: '以千年青莲为材，融合天地灵气锻造而成，剑身如莲，剑气如虹',
      stats: {
        attack: 850,
        defense: 120,
        speed: 95,
        criticalRate: 25,
        durability: 850,
        maxDurability: 1000
      },
      effects: ['攻击力+30%', '木系伤害+50%', '剑气护体'],
      requirements: {
        realm: '地级',
        strength: 500,
        agility: 600
      },
      isEquipped: true,
      isBound: true,
      owner: '云逸仙',
      forgeCost: {
        materials: ['千年青莲', '玄铁精', '木灵石'],
        spiritStones: 8000,
        contribution: 3000
      },
      upgradeCost: {
        materials: ['青莲精华', '玄铁精', '木灵石'],
        spiritStones: 2000,
        contribution: 800
      },
      enchantments: [
        { name: '锋利', level: 3, effect: '攻击力+15%' },
        { name: '轻灵', level: 2, effect: '速度+10%' }
      ]
    },
    {
      id: '2',
      name: '雷神锤',
      type: '锤',
      category: '攻击型',
      element: '雷',
      rarity: '神品',
      level: 9,
      maxLevel: 10,
      description: '蕴含天雷之力的神锤，一击可开山裂石，威力无穷',
      stats: {
        attack: 1200,
        defense: 200,
        speed: 60,
        criticalRate: 35,
        durability: 920,
        maxDurability: 1000
      },
      effects: ['攻击力+50%', '雷系伤害+80%', '雷霆一击'],
      requirements: {
        realm: '天级',
        strength: 800,
        agility: 400
      },
      isEquipped: false,
      isBound: false,
      owner: '',
      forgeCost: {
        materials: ['雷神精铁', '天雷石', '雷灵石'],
        spiritStones: 15000,
        contribution: 5000
      },
      upgradeCost: {
        materials: ['雷神精铁', '天雷石', '雷灵石'],
        spiritStones: 3000,
        contribution: 1200
      },
      enchantments: [
        { name: '雷霆', level: 4, effect: '雷系伤害+20%' },
        { name: '重击', level: 3, effect: '暴击率+15%' }
      ]
    },
    {
      id: '3',
      name: '玄武盾',
      type: '盾',
      category: '防御型',
      element: '水',
      rarity: '灵品',
      level: 7,
      maxLevel: 9,
      description: '以玄武龟甲为材，具有极强的防御力，可抵御各种攻击',
      stats: {
        attack: 50,
        defense: 950,
        speed: 30,
        criticalRate: 5,
        durability: 780,
        maxDurability: 900
      },
      effects: ['防御力+40%', '水系抗性+60%', '玄武护体'],
      requirements: {
        realm: '玄级',
        strength: 600,
        agility: 300
      },
      isEquipped: true,
      isBound: true,
      owner: '云逸仙',
      forgeCost: {
        materials: ['玄武龟甲', '玄铁精', '水灵石'],
        spiritStones: 5000,
        contribution: 2000
      },
      upgradeCost: {
        materials: ['玄武精华', '玄铁精', '水灵石'],
        spiritStones: 1200,
        contribution: 500
      },
      enchantments: [
        { name: '坚固', level: 3, effect: '防御力+12%' },
        { name: '水盾', level: 2, effect: '水系抗性+15%' }
      ]
    },
    {
      id: '4',
      name: '火凤弓',
      type: '弓',
      category: '攻击型',
      element: '火',
      rarity: '仙品',
      level: 6,
      maxLevel: 8,
      description: '以火凤凰羽毛为弦，箭矢如火焰般炽热，射程极远',
      stats: {
        attack: 750,
        defense: 80,
        speed: 110,
        criticalRate: 30,
        durability: 650,
        maxDurability: 800
      },
      effects: ['攻击力+25%', '火系伤害+40%', '凤凰箭矢'],
      requirements: {
        realm: '地级',
        strength: 400,
        agility: 700
      },
      isEquipped: false,
      isBound: false,
      owner: '',
      forgeCost: {
        materials: ['火凤凰羽毛', '龙筋', '火灵石'],
        spiritStones: 6000,
        contribution: 2500
      },
      upgradeCost: {
        materials: ['火凤凰精华', '龙筋', '火灵石'],
        spiritStones: 1500,
        contribution: 600
      },
      enchantments: [
        { name: '精准', level: 2, effect: '命中率+10%' },
        { name: '烈焰', level: 2, effect: '火系伤害+12%' }
      ]
    },
    {
      id: '5',
      name: '天罡符',
      type: '符箓',
      category: '辅助型',
      element: '无',
      rarity: '灵品',
      level: 5,
      maxLevel: 7,
      description: '道家天罡符箓，可增强修炼效果，提升灵力恢复',
      stats: {
        attack: 100,
        defense: 150,
        speed: 80,
        criticalRate: 10,
        durability: 500,
        maxDurability: 700
      },
      effects: ['修炼速度+20%', '灵力恢复+30%', '天罡护体'],
      requirements: {
        realm: '黄级',
        strength: 200,
        agility: 300
      },
      isEquipped: false,
      isBound: false,
      owner: '',
      forgeCost: {
        materials: ['天罡纸', '朱砂', '灵墨'],
        spiritStones: 3000,
        contribution: 1500
      },
      upgradeCost: {
        materials: ['天罡精华', '朱砂', '灵墨'],
        spiritStones: 800,
        contribution: 400
      },
      enchantments: [
        { name: '聚灵', level: 2, effect: '灵力恢复+8%' }
      ]
    }
  ]);

  const getRarityColor = (rarity: string) => {
    const colors = {
      '凡品': '#d9d9d9',
      '精品': '#52c41a',
      '灵品': '#1890ff',
      '仙品': '#722ed1',
      '神品': '#eb2f96',
      '圣品': '#fa8c16'
    };
    return colors[rarity as keyof typeof colors] || '#d9d9d9';
  };

  const getElementColor = (element: string) => {
    const colors = {
      '金': '#d4b106',
      '木': '#52c41a',
      '水': '#1890ff',
      '火': '#f5222d',
      '土': '#722ed1',
      '雷': '#fa8c16',
      '风': '#13c2c2',
      '无': '#d9d9d9'
    };
    return colors[element as keyof typeof colors] || '#d9d9d9';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      '剑': <ToolOutlined />,
      '刀': <ToolOutlined />,
      '枪': <ToolOutlined />,
      '棍': <ToolOutlined />,
      '锤': <ToolOutlined />,
      '弓': <RocketOutlined />,
      '盾': <SafetyOutlined />,
      '甲': <SafetyOutlined />,
      '法器': <BulbOutlined />,
      '符箓': <HeartOutlined />
    };
    return icons[type as keyof typeof icons] || <ToolOutlined />;
  };

  const handleForge = (weapon: Weapon) => {
    setSelectedWeapon(weapon);
    setIsForgeModalVisible(true);
  };

  const handleUpgrade = (weapon: Weapon) => {
    setSelectedWeapon(weapon);
    setIsUpgradeModalVisible(true);
  };

  const handleEnchant = (weapon: Weapon) => {
    setSelectedWeapon(weapon);
    setIsEnchantModalVisible(true);
  };

  const handleViewDetail = (weapon: Weapon) => {
    setSelectedWeapon(weapon);
    setIsDetailModalVisible(true);
  };

  const confirmForge = () => {
    if (selectedWeapon) {
      message.success(`成功锻造兵器：${selectedWeapon.name}`);
      setIsForgeModalVisible(false);
    }
  };

  const confirmUpgrade = () => {
    if (selectedWeapon) {
      message.success(`成功升级兵器：${selectedWeapon.name}`);
      setIsUpgradeModalVisible(false);
    }
  };

  const confirmEnchant = () => {
    if (selectedWeapon) {
      message.success(`成功附魔兵器：${selectedWeapon.name}`);
      setIsEnchantModalVisible(false);
    }
  };

  const columns = [
    {
      title: '兵器名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Weapon) => (
        <Space>
          {getTypeIcon(record.type)}
          <Text strong>{text}</Text>
          {record.isEquipped && <Badge status="success" text="已装备" />}
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => <Tag color="green">{text}</Tag>,
    },
    {
      title: '属性',
      dataIndex: 'element',
      key: 'element',
      render: (text: string) => (
        <Tag color={getElementColor(text)}>{text}</Tag>
      ),
    },
    {
      title: '品级',
      dataIndex: 'rarity',
      key: 'rarity',
      render: (text: string) => (
        <Tag color={getRarityColor(text)}>{text}</Tag>
      ),
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: number, record: Weapon) => (
        <Text>{level}/{record.maxLevel}</Text>
      ),
    },
    {
      title: '耐久度',
      dataIndex: 'stats',
      key: 'durability',
      render: (stats: Weapon['stats']) => (
        <Progress 
          percent={Math.round((stats.durability / stats.maxDurability) * 100)} 
          size="small" 
          status={stats.durability < stats.maxDurability * 0.3 ? 'exception' : 'normal'}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Weapon) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          {record.isEquipped ? (
            <>
              <Button 
                type="link" 
                icon={<EditOutlined />}
                onClick={() => handleUpgrade(record)}
              >
                升级
              </Button>
              <Button 
                type="link" 
                icon={<SettingOutlined />}
                onClick={() => handleEnchant(record)}
              >
                附魔
              </Button>
            </>
          ) : (
            <Button 
              type="link" 
              icon={<ToolOutlined />}
              onClick={() => handleForge(record)}
            >
              锻造
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const filteredWeapons = weapons.filter(weapon => {
    const matchesSearch = weapon.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesRarity = filterRarity === 'all' || weapon.rarity === filterRarity;
    const matchesType = filterType === 'all' || weapon.type === filterType;
    return matchesSearch && matchesRarity && matchesType;
  });

  return (
    <div className="weapon-hall">
      <Card>
        <Title level={2}>兵器阁</Title>
        <Paragraph>
          兵器阁收藏天下神兵利器，包含剑、刀、枪、棍、锤、弓、盾、甲、法器、符箓等各类兵器。
          锻造兵器可提升战斗力，附魔可增强特殊效果。
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* 左侧宗门建筑 */}
        <Col span={8}>
          <Card className="sect-building-card">
            <div className="sect-building-container">
              <SectBuilding />
            </div>
            <div className="building-info">
              <Title level={4} style={{ color: '#ff6b6b', textAlign: 'center', marginTop: 16 }}>
                兵器阁
              </Title>
              <Text style={{ color: '#666', textAlign: 'center', display: 'block' }}>
                收藏天下神兵利器，锻造者可在此打造各种法宝
              </Text>
            </div>
          </Card>
        </Col>
        
        {/* 右侧统计卡片 */}
        <Col span={16}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已拥有兵器"
                  value={weapons.filter(w => w.isEquipped).length}
                  suffix={`/${weapons.length}`}
                  prefix={<ToolOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已装备兵器"
                  value={weapons.filter(w => w.isEquipped).length}
                  prefix={<SafetyOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="最高品级"
                  value="神品"
                  prefix={<CrownOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="平均等级"
                  value={7.2}
                  precision={1}
                  prefix={<StarOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="全部兵器" key="all">
            <Space style={{ marginBottom: 16 }}>
              <Input.Search
                placeholder="搜索兵器名称"
                style={{ width: 200 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Select
                placeholder="选择品级"
                style={{ width: 120 }}
                value={filterRarity}
                onChange={setFilterRarity}
              >
                <Option value="all">全部品级</Option>
                <Option value="凡品">凡品</Option>
                <Option value="精品">精品</Option>
                <Option value="灵品">灵品</Option>
                <Option value="仙品">仙品</Option>
                <Option value="神品">神品</Option>
                <Option value="圣品">圣品</Option>
              </Select>
              <Select
                placeholder="选择类型"
                style={{ width: 120 }}
                value={filterType}
                onChange={setFilterType}
              >
                <Option value="all">全部类型</Option>
                <Option value="剑">剑</Option>
                <Option value="刀">刀</Option>
                <Option value="枪">枪</Option>
                <Option value="棍">棍</Option>
                <Option value="锤">锤</Option>
                <Option value="弓">弓</Option>
                <Option value="盾">盾</Option>
                <Option value="甲">甲</Option>
                <Option value="法器">法器</Option>
                <Option value="符箓">符箓</Option>
              </Select>
            </Space>
            <Table
              columns={columns}
              dataSource={filteredWeapons}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="攻击型" key="attack">
            <Table
              columns={columns}
              dataSource={filteredWeapons.filter(w => w.category === '攻击型')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="防御型" key="defense">
            <Table
              columns={columns}
              dataSource={filteredWeapons.filter(w => w.category === '防御型')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="辅助型" key="support">
            <Table
              columns={columns}
              dataSource={filteredWeapons.filter(w => w.category === '辅助型')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 兵器详情模态框 */}
      <Modal
        title="兵器详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedWeapon && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Descriptions column={1}>
                  <Descriptions.Item label="兵器名称">{selectedWeapon.name}</Descriptions.Item>
                  <Descriptions.Item label="兵器类型">{selectedWeapon.type}</Descriptions.Item>
                  <Descriptions.Item label="兵器分类">{selectedWeapon.category}</Descriptions.Item>
                  <Descriptions.Item label="五行属性">{selectedWeapon.element}</Descriptions.Item>
                  <Descriptions.Item label="品级">{selectedWeapon.rarity}</Descriptions.Item>
                  <Descriptions.Item label="当前等级">{selectedWeapon.level}/{selectedWeapon.maxLevel}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12}>
                <Title level={5}>属性统计</Title>
                <Descriptions column={1}>
                  <Descriptions.Item label="攻击力">{selectedWeapon.stats.attack}</Descriptions.Item>
                  <Descriptions.Item label="防御力">{selectedWeapon.stats.defense}</Descriptions.Item>
                  <Descriptions.Item label="速度">{selectedWeapon.stats.speed}</Descriptions.Item>
                  <Descriptions.Item label="暴击率">{selectedWeapon.stats.criticalRate}%</Descriptions.Item>
                  <Descriptions.Item label="耐久度">{selectedWeapon.stats.durability}/{selectedWeapon.stats.maxDurability}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <Divider />
            <Title level={5}>兵器描述</Title>
            <Paragraph>{selectedWeapon.description}</Paragraph>
            <Divider />
            <Title level={5}>特殊效果</Title>
            <List
              dataSource={selectedWeapon.effects}
              renderItem={(effect) => (
                <List.Item>
                  <Text>• {effect}</Text>
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>附魔效果</Title>
            {selectedWeapon.enchantments.length > 0 ? (
              <List
                dataSource={selectedWeapon.enchantments}
                renderItem={(enchantment) => (
                  <List.Item>
                    <Text>{enchantment.name} (等级{enchantment.level}): {enchantment.effect}</Text>
                  </List.Item>
                )}
              />
            ) : (
              <Text type="secondary">暂无附魔效果</Text>
            )}
          </div>
        )}
      </Modal>

      {/* 锻造兵器模态框 */}
      <Modal
        title="锻造兵器"
        open={isForgeModalVisible}
        onOk={confirmForge}
        onCancel={() => setIsForgeModalVisible(false)}
      >
        {selectedWeapon && (
          <div>
            <Alert
              message={`锻造兵器：${selectedWeapon.name}`}
              description={`需要消耗 ${selectedWeapon.forgeCost.spiritStones} 灵石和 ${selectedWeapon.forgeCost.contribution} 贡献点`}
              type="info"
              showIcon
            />
            <Divider />
            <Title level={5}>所需材料</Title>
            <List
              dataSource={selectedWeapon.forgeCost.materials}
              renderItem={(material) => (
                <List.Item>
                  <Text>• {material}</Text>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>

      {/* 升级兵器模态框 */}
      <Modal
        title="升级兵器"
        open={isUpgradeModalVisible}
        onOk={confirmUpgrade}
        onCancel={() => setIsUpgradeModalVisible(false)}
      >
        {selectedWeapon && (
          <div>
            <Alert
              message={`升级兵器：${selectedWeapon.name}`}
              description={`需要消耗 ${selectedWeapon.upgradeCost.spiritStones} 灵石和 ${selectedWeapon.upgradeCost.contribution} 贡献点`}
              type="info"
              showIcon
            />
            <Divider />
            <Title level={5}>所需材料</Title>
            <List
              dataSource={selectedWeapon.upgradeCost.materials}
              renderItem={(material) => (
                <List.Item>
                  <Text>• {material}</Text>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>

      {/* 附魔兵器模态框 */}
      <Modal
        title="附魔兵器"
        open={isEnchantModalVisible}
        onOk={confirmEnchant}
        onCancel={() => setIsEnchantModalVisible(false)}
      >
        {selectedWeapon && (
          <div>
            <Alert
              message={`附魔兵器：${selectedWeapon.name}`}
              description="选择要添加的附魔效果"
              type="info"
              showIcon
            />
            <Divider />
            <Title level={5}>可选附魔</Title>
            <List
              dataSource={[
                { name: '锋利', effect: '攻击力+10%', cost: 500 },
                { name: '坚固', effect: '防御力+10%', cost: 500 },
                { name: '轻灵', effect: '速度+10%', cost: 500 },
                { name: '精准', effect: '命中率+10%', cost: 500 }
              ]}
              renderItem={(enchantment) => (
                <List.Item>
                  <Text>{enchantment.name}: {enchantment.effect} (消耗{enchantment.cost}灵石)</Text>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WeaponHall; 
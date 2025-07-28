import React, { useState, useEffect } from 'react';
import {
  Card, Row, Col, Tabs, Table, Button, Tag, Progress, Modal, Form, Input, Select, 
  message, Tooltip, Badge, Space, Typography, Divider, List, Avatar, Statistic,
  Descriptions, Alert, Popconfirm, Rate, Switch, Slider
} from 'antd';
import {
  BookOutlined, FireOutlined, ThunderboltOutlined, HeartOutlined,
  CrownOutlined, StarOutlined, TrophyOutlined, BulbOutlined,
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  DownloadOutlined, UploadOutlined, SettingOutlined, TeamOutlined
} from '@ant-design/icons';
import './TechniqueHall.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface Technique {
  id: string;
  name: string;
  type: '心法' | '功法' | '武技' | '秘术' | '禁术';
  element: '金' | '木' | '水' | '火' | '土' | '无';
  rarity: '黄级' | '玄级' | '地级' | '天级' | '帝级' | '仙级' | '神级';
  level: number;
  maxLevel: number;
  description: string;
  effects: string[];
  requirements: {
    realm: string;
    soulStrength: number;
    fiveElements: Record<string, number>;
  };
  cultivationProgress: number;
  isMastered: boolean;
  isEquipped: boolean;
  unlockCost: {
    spiritStones: number;
    contribution: number;
  };
  upgradeCost: {
    spiritStones: number;
    contribution: number;
    materials: string[];
  };
}

const TechniqueHall: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
  const [isUnlockModalVisible, setIsUnlockModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterElement, setFilterElement] = useState<string>('all');

  // 模拟功法数据
  const [techniques, setTechniques] = useState<Technique[]>([
    {
      id: '1',
      name: '太上忘情诀',
      type: '心法',
      element: '无',
      rarity: '神级',
      level: 9,
      maxLevel: 10,
      description: '道家至高心法，修炼可达忘情境界，心如止水，万法不侵',
      effects: ['修炼速度+50%', '精神力恢复+30%', '突破成功率+20%'],
      requirements: {
        realm: '地级',
        soulStrength: 600,
        fiveElements: { metal: 80, wood: 70, water: 90, fire: 60, earth: 70 }
      },
      cultivationProgress: 85,
      isMastered: false,
      isEquipped: true,
      unlockCost: { spiritStones: 10000, contribution: 5000 },
      upgradeCost: { spiritStones: 2000, contribution: 1000, materials: ['悟道石', '天灵草'] }
    },
    {
      id: '2',
      name: '九天雷诀',
      type: '功法',
      element: '火',
      rarity: '天级',
      level: 8,
      maxLevel: 10,
      description: '雷系攻击功法，威力巨大，可引动天雷之力',
      effects: ['攻击力+40%', '暴击率+25%', '雷系伤害+60%'],
      requirements: {
        realm: '玄级',
        soulStrength: 400,
        fiveElements: { metal: 60, wood: 50, water: 40, fire: 90, earth: 30 }
      },
      cultivationProgress: 92,
      isMastered: false,
      isEquipped: true,
      unlockCost: { spiritStones: 5000, contribution: 2000 },
      upgradeCost: { spiritStones: 1000, contribution: 500, materials: ['雷灵石', '紫电草'] }
    },
    {
      id: '3',
      name: '水月神通',
      type: '功法',
      element: '水',
      rarity: '地级',
      level: 7,
      maxLevel: 9,
      description: '水系防御功法，如水月镜花，虚实难辨',
      effects: ['防御力+35%', '闪避率+20%', '水系抗性+50%'],
      requirements: {
        realm: '黄级',
        soulStrength: 300,
        fiveElements: { metal: 40, wood: 60, water: 90, fire: 30, earth: 50 }
      },
      cultivationProgress: 78,
      isMastered: false,
      isEquipped: false,
      unlockCost: { spiritStones: 3000, contribution: 1500 },
      upgradeCost: { spiritStones: 800, contribution: 400, materials: ['水灵石', '月华草'] }
    },
    {
      id: '4',
      name: '金刚不坏体',
      type: '武技',
      element: '金',
      rarity: '玄级',
      level: 6,
      maxLevel: 8,
      description: '佛门护体神功，练至大成可刀枪不入',
      effects: ['防御力+45%', '生命值+30%', '金系抗性+40%'],
      requirements: {
        realm: '黄级',
        soulStrength: 250,
        fiveElements: { metal: 90, wood: 30, water: 40, fire: 50, earth: 80 }
      },
      cultivationProgress: 65,
      isMastered: false,
      isEquipped: false,
      unlockCost: { spiritStones: 2000, contribution: 1000 },
      upgradeCost: { spiritStones: 600, contribution: 300, materials: ['金刚石', '铁骨草'] }
    },
    {
      id: '5',
      name: '万毒噬心术',
      type: '秘术',
      element: '木',
      rarity: '天级',
      level: 5,
      maxLevel: 7,
      description: '毒系秘术，可操控万毒，杀人于无形',
      effects: ['毒系伤害+80%', '持续伤害+40%', '木系亲和+30%'],
      requirements: {
        realm: '地级',
        soulStrength: 500,
        fiveElements: { metal: 30, wood: 95, water: 60, fire: 40, earth: 70 }
      },
      cultivationProgress: 45,
      isMastered: false,
      isEquipped: false,
      unlockCost: { spiritStones: 8000, contribution: 3000 },
      upgradeCost: { spiritStones: 1500, contribution: 800, materials: ['毒灵石', '噬心草'] }
    }
  ]);

  const getRarityColor = (rarity: string) => {
    const colors = {
      '黄级': '#d4b106',
      '玄级': '#722ed1',
      '地级': '#13c2c2',
      '天级': '#1890ff',
      '帝级': '#eb2f96',
      '仙级': '#fa8c16',
      '神级': '#f5222d'
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
      '无': '#d9d9d9'
    };
    return colors[element as keyof typeof colors] || '#d9d9d9';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      '心法': <HeartOutlined />,
      '功法': <FireOutlined />,
      '武技': <ThunderboltOutlined />,
      '秘术': <BulbOutlined />,
      '禁术': <CrownOutlined />
    };
    return icons[type as keyof typeof icons] || <BookOutlined />;
  };

  const handleUnlock = (technique: Technique) => {
    setSelectedTechnique(technique);
    setIsUnlockModalVisible(true);
  };

  const handleUpgrade = (technique: Technique) => {
    setSelectedTechnique(technique);
    setIsUpgradeModalVisible(true);
  };

  const handleViewDetail = (technique: Technique) => {
    setSelectedTechnique(technique);
    setIsDetailModalVisible(true);
  };

  const confirmUnlock = () => {
    if (selectedTechnique) {
      message.success(`成功解锁功法：${selectedTechnique.name}`);
      setIsUnlockModalVisible(false);
    }
  };

  const confirmUpgrade = () => {
    if (selectedTechnique) {
      message.success(`成功升级功法：${selectedTechnique.name}`);
      setIsUpgradeModalVisible(false);
    }
  };

  const columns = [
    {
      title: '功法名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Technique) => (
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
      render: (level: number, record: Technique) => (
        <Text>{level}/{record.maxLevel}</Text>
      ),
    },
    {
      title: '修炼进度',
      dataIndex: 'cultivationProgress',
      key: 'cultivationProgress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Technique) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          {record.isMastered ? (
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => handleUpgrade(record)}
            >
              升级
            </Button>
          ) : (
            <Button 
              type="link" 
              icon={<DownloadOutlined />}
              onClick={() => handleUnlock(record)}
            >
              解锁
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesRarity = filterRarity === 'all' || technique.rarity === filterRarity;
    const matchesElement = filterElement === 'all' || technique.element === filterElement;
    return matchesSearch && matchesRarity && matchesElement;
  });

  return (
    <div className="technique-hall">
      <Card>
        <Title level={2}>功法阁</Title>
        <Paragraph>
          功法阁收录天下功法秘籍，包含心法、功法、武技、秘术、禁术五大类。
          修炼功法可提升修为境界，增强战斗能力。
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="已掌握功法"
              value={techniques.filter(t => t.isMastered).length}
              suffix={`/${techniques.length}`}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已装备功法"
              value={techniques.filter(t => t.isEquipped).length}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="最高品级"
              value="神级"
              prefix={<CrownOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="修炼进度"
              value={85}
              suffix="%"
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="全部功法" key="all">
            <Space style={{ marginBottom: 16 }}>
              <Input.Search
                placeholder="搜索功法名称"
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
                <Option value="黄级">黄级</Option>
                <Option value="玄级">玄级</Option>
                <Option value="地级">地级</Option>
                <Option value="天级">天级</Option>
                <Option value="帝级">帝级</Option>
                <Option value="仙级">仙级</Option>
                <Option value="神级">神级</Option>
              </Select>
              <Select
                placeholder="选择属性"
                style={{ width: 120 }}
                value={filterElement}
                onChange={setFilterElement}
              >
                <Option value="all">全部属性</Option>
                <Option value="金">金</Option>
                <Option value="木">木</Option>
                <Option value="水">水</Option>
                <Option value="火">火</Option>
                <Option value="土">土</Option>
                <Option value="无">无</Option>
              </Select>
            </Space>
            <Table
              columns={columns}
              dataSource={filteredTechniques}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="心法" key="heart">
            <Table
              columns={columns}
              dataSource={filteredTechniques.filter(t => t.type === '心法')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="功法" key="skill">
            <Table
              columns={columns}
              dataSource={filteredTechniques.filter(t => t.type === '功法')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="武技" key="martial">
            <Table
              columns={columns}
              dataSource={filteredTechniques.filter(t => t.type === '武技')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="秘术" key="secret">
            <Table
              columns={columns}
              dataSource={filteredTechniques.filter(t => t.type === '秘术')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 功法详情模态框 */}
      <Modal
        title="功法详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedTechnique && (
          <div>
            <Descriptions column={2}>
              <Descriptions.Item label="功法名称">{selectedTechnique.name}</Descriptions.Item>
              <Descriptions.Item label="功法类型">{selectedTechnique.type}</Descriptions.Item>
              <Descriptions.Item label="五行属性">{selectedTechnique.element}</Descriptions.Item>
              <Descriptions.Item label="品级">{selectedTechnique.rarity}</Descriptions.Item>
              <Descriptions.Item label="当前等级">{selectedTechnique.level}/{selectedTechnique.maxLevel}</Descriptions.Item>
              <Descriptions.Item label="修炼进度">{selectedTechnique.cultivationProgress}%</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Title level={5}>功法描述</Title>
            <Paragraph>{selectedTechnique.description}</Paragraph>
            <Divider />
            <Title level={5}>功法效果</Title>
            <List
              dataSource={selectedTechnique.effects}
              renderItem={(effect) => (
                <List.Item>
                  <Text>• {effect}</Text>
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>修炼要求</Title>
            <Descriptions column={1}>
              <Descriptions.Item label="境界要求">{selectedTechnique.requirements.realm}</Descriptions.Item>
              <Descriptions.Item label="灵魂强度">{selectedTechnique.requirements.soulStrength}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* 解锁功法模态框 */}
      <Modal
        title="解锁功法"
        open={isUnlockModalVisible}
        onOk={confirmUnlock}
        onCancel={() => setIsUnlockModalVisible(false)}
      >
        {selectedTechnique && (
          <div>
            <Alert
              message={`解锁功法：${selectedTechnique.name}`}
              description={`需要消耗 ${selectedTechnique.unlockCost.spiritStones} 灵石和 ${selectedTechnique.unlockCost.contribution} 贡献点`}
              type="info"
              showIcon
            />
          </div>
        )}
      </Modal>

      {/* 升级功法模态框 */}
      <Modal
        title="升级功法"
        open={isUpgradeModalVisible}
        onOk={confirmUpgrade}
        onCancel={() => setIsUpgradeModalVisible(false)}
      >
        {selectedTechnique && (
          <div>
            <Alert
              message={`升级功法：${selectedTechnique.name}`}
              description={`需要消耗 ${selectedTechnique.upgradeCost.spiritStones} 灵石和 ${selectedTechnique.upgradeCost.contribution} 贡献点`}
              type="info"
              showIcon
            />
            <Divider />
            <Title level={5}>所需材料</Title>
            <List
              dataSource={selectedTechnique.upgradeCost.materials}
              renderItem={(material) => (
                <List.Item>
                  <Text>• {material}</Text>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TechniqueHall; 
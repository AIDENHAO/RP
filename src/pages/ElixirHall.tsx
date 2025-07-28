import React, { useState, useEffect } from 'react';
import {
  Card, Row, Col, Tabs, Table, Button, Tag, Progress, Modal, Form, Input, Select, 
  message, Tooltip, Badge, Space, Typography, Divider, List, Avatar, Statistic,
  Descriptions, Alert, Popconfirm, Rate, Switch, Slider, Image, Upload, Steps
} from 'antd';
import {
  ExperimentOutlined, MedicineBoxOutlined, ThunderboltOutlined, FireOutlined,
  CrownOutlined, StarOutlined, TrophyOutlined, BulbOutlined,
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  DownloadOutlined, UploadOutlined, SettingOutlined, TeamOutlined,
  ToolOutlined, SafetyOutlined, RocketOutlined, HeartOutlined,
  CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import SectBuilding from '../components/SectBuilding';
import './ElixirHall.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Step } = Steps;

interface Elixir {
  id: string;
  name: string;
  type: '修炼丹' | '疗伤丹' | '解毒丹' | '突破丹' | '延寿丹' | '特殊丹';
  category: '辅助型' | '治疗型' | '突破型' | '延寿型' | '特殊型';
  element: '金' | '木' | '水' | '火' | '土' | '雷' | '风' | '无';
  rarity: '凡品' | '精品' | '灵品' | '仙品' | '神品' | '圣品';
  level: number;
  maxLevel: number;
  description: string;
  effects: string[];
  sideEffects: string[];
  requirements: {
    realm: string;
    alchemyLevel: number;
    materials: string[];
  };
  quantity: number;
  maxQuantity: number;
  isCrafting: boolean;
  craftingProgress: number;
  craftCost: {
    materials: string[];
    spiritStones: number;
    contribution: number;
    time: number; // 炼制时间（分钟）
  };
  upgradeCost: {
    materials: string[];
    spiritStones: number;
    contribution: number;
  };
  usage: {
    cooldown: number; // 冷却时间（小时）
    duration: number; // 持续时间（小时）
    stackable: boolean; // 是否可叠加
  };
  quality: number; // 品质 (1-100)
  expiration: Date | null; // 过期时间
}

const ElixirHall: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedElixir, setSelectedElixir] = useState<Elixir | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isCraftModalVisible, setIsCraftModalVisible] = useState(false);
  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
  const [isUseModalVisible, setIsUseModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // 模拟丹药数据
  const [elixirs, setElixirs] = useState<Elixir[]>([
    {
      id: '1',
      name: '聚灵丹',
      type: '修炼丹',
      category: '辅助型',
      element: '无',
      rarity: '灵品',
      level: 7,
      maxLevel: 10,
      description: '聚集天地灵气，提升修炼速度，是修士修炼必备的丹药',
      effects: ['修炼速度+30%', '灵力恢复+20%', '突破成功率+10%'],
      sideEffects: ['服用过多可能导致灵力紊乱'],
      requirements: {
        realm: '黄级',
        alchemyLevel: 5,
        materials: ['聚灵草', '灵石粉', '清泉水']
      },
      quantity: 25,
      maxQuantity: 100,
      isCrafting: false,
      craftingProgress: 0,
      craftCost: {
        materials: ['聚灵草', '灵石粉', '清泉水'],
        spiritStones: 500,
        contribution: 200,
        time: 30
      },
      upgradeCost: {
        materials: ['聚灵精华', '灵石粉', '清泉水'],
        spiritStones: 200,
        contribution: 100
      },
      usage: {
        cooldown: 2,
        duration: 4,
        stackable: true
      },
      quality: 85,
      expiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天后过期
    },
    {
      id: '2',
      name: '九转还魂丹',
      type: '疗伤丹',
      category: '治疗型',
      element: '木',
      rarity: '仙品',
      level: 9,
      maxLevel: 10,
      description: '传说中的神丹，可起死回生，治愈一切伤势',
      effects: ['瞬间恢复生命值', '治愈所有伤势', '增强体质'],
      sideEffects: ['服用后需要静养三日'],
      requirements: {
        realm: '地级',
        alchemyLevel: 8,
        materials: ['九转还魂草', '生命精华', '仙露']
      },
      quantity: 3,
      maxQuantity: 10,
      isCrafting: false,
      craftingProgress: 0,
      craftCost: {
        materials: ['九转还魂草', '生命精华', '仙露'],
        spiritStones: 5000,
        contribution: 2000,
        time: 120
      },
      upgradeCost: {
        materials: ['九转还魂精华', '生命精华', '仙露'],
        spiritStones: 1000,
        contribution: 500
      },
      usage: {
        cooldown: 24,
        duration: 0,
        stackable: false
      },
      quality: 95,
      expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1年后过期
    },
    {
      id: '3',
      name: '破境丹',
      type: '突破丹',
      category: '突破型',
      element: '雷',
      rarity: '神品',
      level: 8,
      maxLevel: 10,
      description: '辅助突破境界的神丹，可大幅提升突破成功率',
      effects: ['突破成功率+50%', '突破时伤害减免+30%', '境界稳固'],
      sideEffects: ['突破失败可能导致境界倒退'],
      requirements: {
        realm: '天级',
        alchemyLevel: 9,
        materials: ['破境花', '雷灵石', '天雷精华']
      },
      quantity: 1,
      maxQuantity: 5,
      isCrafting: false,
      craftingProgress: 0,
      craftCost: {
        materials: ['破境花', '雷灵石', '天雷精华'],
        spiritStones: 10000,
        contribution: 5000,
        time: 180
      },
      upgradeCost: {
        materials: ['破境精华', '雷灵石', '天雷精华'],
        spiritStones: 2000,
        contribution: 1000
      },
      usage: {
        cooldown: 168, // 7天
        duration: 0,
        stackable: false
      },
      quality: 98,
      expiration: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90天后过期
    },
    {
      id: '4',
      name: '延寿丹',
      type: '延寿丹',
      category: '延寿型',
      element: '土',
      rarity: '仙品',
      level: 6,
      maxLevel: 8,
      description: '延长寿命的神丹，可增加修士寿元',
      effects: ['寿元+100年', '体质增强', '延缓衰老'],
      sideEffects: ['服用后需要适应期'],
      requirements: {
        realm: '玄级',
        alchemyLevel: 7,
        materials: ['延寿草', '土灵石', '生命精华']
      },
      quantity: 5,
      maxQuantity: 20,
      isCrafting: false,
      craftingProgress: 0,
      craftCost: {
        materials: ['延寿草', '土灵石', '生命精华'],
        spiritStones: 3000,
        contribution: 1500,
        time: 90
      },
      upgradeCost: {
        materials: ['延寿精华', '土灵石', '生命精华'],
        spiritStones: 800,
        contribution: 400
      },
      usage: {
        cooldown: 720, // 30天
        duration: 0,
        stackable: false
      },
      quality: 90,
      expiration: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180天后过期
    },
    {
      id: '5',
      name: '解毒丹',
      type: '解毒丹',
      category: '治疗型',
      element: '水',
      rarity: '精品',
      level: 4,
      maxLevel: 6,
      description: '解除各种毒素的丹药，是行走江湖必备之物',
      effects: ['解除中毒状态', '毒素抗性+20%', '净化身体'],
      sideEffects: ['无'],
      requirements: {
        realm: '黄级',
        alchemyLevel: 3,
        materials: ['解毒草', '清泉水', '木灵石']
      },
      quantity: 50,
      maxQuantity: 200,
      isCrafting: false,
      craftingProgress: 0,
      craftCost: {
        materials: ['解毒草', '清泉水', '木灵石'],
        spiritStones: 200,
        contribution: 100,
        time: 20
      },
      upgradeCost: {
        materials: ['解毒精华', '清泉水', '木灵石'],
        spiritStones: 100,
        contribution: 50
      },
      usage: {
        cooldown: 1,
        duration: 0,
        stackable: true
      },
      quality: 75,
      expiration: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60天后过期
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
      '修炼丹': <ExperimentOutlined />,
      '疗伤丹': <MedicineBoxOutlined />,
      '解毒丹': <SafetyOutlined />,
      '突破丹': <RocketOutlined />,
      '延寿丹': <HeartOutlined />,
      '特殊丹': <BulbOutlined />
    };
    return icons[type as keyof typeof icons] || <ExperimentOutlined />;
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return '#52c41a';
    if (quality >= 80) return '#1890ff';
    if (quality >= 70) return '#fa8c16';
    return '#f5222d';
  };

  const getQualityText = (quality: number) => {
    if (quality >= 90) return '完美';
    if (quality >= 80) return '优秀';
    if (quality >= 70) return '良好';
    return '普通';
  };

  const handleCraft = (elixir: Elixir) => {
    setSelectedElixir(elixir);
    setIsCraftModalVisible(true);
  };

  const handleUpgrade = (elixir: Elixir) => {
    setSelectedElixir(elixir);
    setIsUpgradeModalVisible(true);
  };

  const handleUse = (elixir: Elixir) => {
    setSelectedElixir(elixir);
    setIsUseModalVisible(true);
  };

  const handleViewDetail = (elixir: Elixir) => {
    setSelectedElixir(elixir);
    setIsDetailModalVisible(true);
  };

  const confirmCraft = () => {
    if (selectedElixir) {
      message.success(`开始炼制丹药：${selectedElixir.name}`);
      setIsCraftModalVisible(false);
    }
  };

  const confirmUpgrade = () => {
    if (selectedElixir) {
      message.success(`成功升级丹药：${selectedElixir.name}`);
      setIsUpgradeModalVisible(false);
    }
  };

  const confirmUse = () => {
    if (selectedElixir) {
      message.success(`成功使用丹药：${selectedElixir.name}`);
      setIsUseModalVisible(false);
    }
  };

  const columns = [
    {
      title: '丹药名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Elixir) => (
        <Space>
          {getTypeIcon(record.type)}
          <Text strong>{text}</Text>
          {record.isCrafting && <Badge status="processing" text="炼制中" />}
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
      title: '品质',
      dataIndex: 'quality',
      key: 'quality',
      render: (quality: number) => (
        <Tag color={getQualityColor(quality)}>{getQualityText(quality)}</Tag>
      ),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: Elixir) => (
        <Text>{quantity}/{record.maxQuantity}</Text>
      ),
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: number, record: Elixir) => (
        <Text>{level}/{record.maxLevel}</Text>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Elixir) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          {record.quantity > 0 ? (
            <Button 
              type="link" 
              icon={<MedicineBoxOutlined />}
              onClick={() => handleUse(record)}
            >
              使用
            </Button>
          ) : (
            <Button 
              type="link" 
              icon={<ToolOutlined />}
              onClick={() => handleCraft(record)}
            >
              炼制
            </Button>
          )}
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleUpgrade(record)}
          >
            升级
          </Button>
        </Space>
      ),
    },
  ];

  const filteredElixirs = elixirs.filter(elixir => {
    const matchesSearch = elixir.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesRarity = filterRarity === 'all' || elixir.rarity === filterRarity;
    const matchesType = filterType === 'all' || elixir.type === filterType;
    return matchesSearch && matchesRarity && matchesType;
  });

  return (
    <div className="elixir-hall">
      <Card>
        <Title level={2}>丹药阁</Title>
        <Paragraph>
          丹药阁收藏天下灵丹妙药，包含修炼丹、疗伤丹、解毒丹、突破丹、延寿丹等各类丹药。
          炼制丹药可提升修为，治愈伤势，辅助突破。
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
              <Title level={4} style={{ color: '#52c41a', textAlign: 'center', marginTop: 16 }}>
                丹药阁
              </Title>
              <Text style={{ color: '#666', textAlign: 'center', display: 'block' }}>
                收藏天下灵丹妙药，炼丹师可在此炼制各种神丹
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
                  title="已拥有丹药"
                  value={elixirs.reduce((sum, e) => sum + e.quantity, 0)}
                  prefix={<MedicineBoxOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="丹药种类"
                  value={elixirs.filter(e => e.quantity > 0).length}
                  prefix={<ExperimentOutlined />}
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
                  title="平均品质"
                  value={85.6}
                  precision={1}
                  suffix="%"
                  prefix={<StarOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="全部丹药" key="all">
            <Space style={{ marginBottom: 16 }}>
              <Input.Search
                placeholder="搜索丹药名称"
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
                <Option value="修炼丹">修炼丹</Option>
                <Option value="疗伤丹">疗伤丹</Option>
                <Option value="解毒丹">解毒丹</Option>
                <Option value="突破丹">突破丹</Option>
                <Option value="延寿丹">延寿丹</Option>
                <Option value="特殊丹">特殊丹</Option>
              </Select>
            </Space>
            <Table
              columns={columns}
              dataSource={filteredElixirs}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="辅助型" key="support">
            <Table
              columns={columns}
              dataSource={filteredElixirs.filter(e => e.category === '辅助型')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="治疗型" key="heal">
            <Table
              columns={columns}
              dataSource={filteredElixirs.filter(e => e.category === '治疗型')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="突破型" key="breakthrough">
            <Table
              columns={columns}
              dataSource={filteredElixirs.filter(e => e.category === '突破型')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="延寿型" key="longevity">
            <Table
              columns={columns}
              dataSource={filteredElixirs.filter(e => e.category === '延寿型')}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 丹药详情模态框 */}
      <Modal
        title="丹药详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedElixir && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Descriptions column={1}>
                  <Descriptions.Item label="丹药名称">{selectedElixir.name}</Descriptions.Item>
                  <Descriptions.Item label="丹药类型">{selectedElixir.type}</Descriptions.Item>
                  <Descriptions.Item label="丹药分类">{selectedElixir.category}</Descriptions.Item>
                  <Descriptions.Item label="五行属性">{selectedElixir.element}</Descriptions.Item>
                  <Descriptions.Item label="品级">{selectedElixir.rarity}</Descriptions.Item>
                  <Descriptions.Item label="品质">{getQualityText(selectedElixir.quality)}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12}>
                <Title level={5}>使用信息</Title>
                <Descriptions column={1}>
                  <Descriptions.Item label="当前数量">{selectedElixir.quantity}/{selectedElixir.maxQuantity}</Descriptions.Item>
                  <Descriptions.Item label="当前等级">{selectedElixir.level}/{selectedElixir.maxLevel}</Descriptions.Item>
                  <Descriptions.Item label="冷却时间">{selectedElixir.usage.cooldown}小时</Descriptions.Item>
                  <Descriptions.Item label="持续时间">{selectedElixir.usage.duration}小时</Descriptions.Item>
                  <Descriptions.Item label="可叠加">{selectedElixir.usage.stackable ? '是' : '否'}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <Divider />
            <Title level={5}>丹药描述</Title>
            <Paragraph>{selectedElixir.description}</Paragraph>
            <Divider />
            <Title level={5}>主要效果</Title>
            <List
              dataSource={selectedElixir.effects}
              renderItem={(effect) => (
                <List.Item>
                  <Text>• {effect}</Text>
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>副作用</Title>
            <List
              dataSource={selectedElixir.sideEffects}
              renderItem={(effect) => (
                <List.Item>
                  <Text type="warning">• {effect}</Text>
                </List.Item>
              )}
            />
            {selectedElixir.expiration && (
              <>
                <Divider />
                <Title level={5}>过期时间</Title>
                <Text type="secondary">{selectedElixir.expiration.toLocaleDateString()}</Text>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* 炼制丹药模态框 */}
      <Modal
        title="炼制丹药"
        open={isCraftModalVisible}
        onOk={confirmCraft}
        onCancel={() => setIsCraftModalVisible(false)}
      >
        {selectedElixir && (
          <div>
            <Alert
              message={`炼制丹药：${selectedElixir.name}`}
              description={`需要消耗 ${selectedElixir.craftCost.spiritStones} 灵石和 ${selectedElixir.craftCost.contribution} 贡献点，炼制时间 ${selectedElixir.craftCost.time} 分钟`}
              type="info"
              showIcon
            />
            <Divider />
            <Title level={5}>所需材料</Title>
            <List
              dataSource={selectedElixir.craftCost.materials}
              renderItem={(material) => (
                <List.Item>
                  <Text>• {material}</Text>
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>炼制步骤</Title>
            <Steps direction="vertical" size="small">
              <Step title="准备材料" description="收集所需药材和灵石" icon={<CheckCircleOutlined />} />
              <Step title="炼制过程" description="按照丹方进行炼制" icon={<ClockCircleOutlined />} />
              <Step title="品质检测" description="检测丹药品质" icon={<ExclamationCircleOutlined />} />
              <Step title="完成炼制" description="丹药炼制完成" icon={<CheckCircleOutlined />} />
            </Steps>
          </div>
        )}
      </Modal>

      {/* 升级丹药模态框 */}
      <Modal
        title="升级丹药"
        open={isUpgradeModalVisible}
        onOk={confirmUpgrade}
        onCancel={() => setIsUpgradeModalVisible(false)}
      >
        {selectedElixir && (
          <div>
            <Alert
              message={`升级丹药：${selectedElixir.name}`}
              description={`需要消耗 ${selectedElixir.upgradeCost.spiritStones} 灵石和 ${selectedElixir.upgradeCost.contribution} 贡献点`}
              type="info"
              showIcon
            />
            <Divider />
            <Title level={5}>所需材料</Title>
            <List
              dataSource={selectedElixir.upgradeCost.materials}
              renderItem={(material) => (
                <List.Item>
                  <Text>• {material}</Text>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>

      {/* 使用丹药模态框 */}
      <Modal
        title="使用丹药"
        open={isUseModalVisible}
        onOk={confirmUse}
        onCancel={() => setIsUseModalVisible(false)}
      >
        {selectedElixir && (
          <div>
            <Alert
              message={`使用丹药：${selectedElixir.name}`}
              description={`确认使用此丹药吗？使用后将获得相应效果，冷却时间 ${selectedElixir.usage.cooldown} 小时`}
              type="warning"
              showIcon
            />
            <Divider />
            <Title level={5}>使用效果</Title>
            <List
              dataSource={selectedElixir.effects}
              renderItem={(effect) => (
                <List.Item>
                  <Text>• {effect}</Text>
                </List.Item>
              )}
            />
            {selectedElixir.sideEffects.length > 0 && (
              <>
                <Divider />
                <Title level={5}>注意事项</Title>
                <List
                  dataSource={selectedElixir.sideEffects}
                  renderItem={(effect) => (
                    <List.Item>
                      <Text type="warning">• {effect}</Text>
                    </List.Item>
                  )}
                />
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ElixirHall; 
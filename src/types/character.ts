// 修仙角色类型定义

// 五行亲和度
export interface FiveElements {
  metal: number; // 金 (0-100)
  wood: number;  // 木 (0-100)
  water: number; // 水 (0-100)
  fire: number;  // 火 (0-100)
  earth: number; // 土 (0-100)
}

// 等级境界
export interface Realm {
  stage: '凡人阶段' | '修士阶段' | '仙神阶段';
  majorLevel: string; // 大境界：黄级、玄级、地级、天级、帝级、仙级、神级
  minorLevel: string; // 小境界：练气、筑基、开光等
  cultivation: number; // 当前修炼值
  maxCultivation: number; // 当前境界最大修炼值
  breakthroughThreshold: number; // 突破阈值（90%触发顿悟）
}

// 基础属性
export interface BaseStats {
  soulStrength: number; // 灵魂强度 (1-1000)
  constitution: number; // 体质属性 (1-1000)
  lifeForce: number;   // 生命力 (1-100000)
}

// 三力系统
export interface ThreePowers {
  bloodPower: { current: number; max: number }; // 血量
  spiritPower: { current: number; max: number }; // 灵力
  mentalPower: { current: number; max: number }; // 精神力
}

// 战斗属性
export interface CombatStats {
  attack: number;
  defense: number;
  speed: number;
  criticalRate: number;
  combatPower: number; // 战力 (1-10000000)
}

// 顿悟状态
export interface Enlightenment {
  isActive: boolean;
  remainingTime: number; // 剩余时间（小时）
  speedBonus: number; // 修炼速度加成百分比
}

// 势力归属
export interface Affiliation {
  region: string; // 地域
  country: string; // 国家
  sect: string; // 宗门
  position: string; // 职位
}

// 声望系统
export interface Reputation {
  fame: number; // 名誉值 (-10000 到 +10000)
  sectRelations: Record<string, number>; // 各门派友好度 (-1000 到 +1000)
}

// 货币系统
export interface Currency {
  copper: number; // 铜币
  silver: number; // 银币
  gold: number;   // 金币
  spiritStones: {
    lower: number;   // 下品灵石
    middle: number;  // 中品灵石
    upper: number;   // 上品灵石
    supreme: number; // 极品灵石
  };
  contribution: number; // 宗门贡献点
  worldFame: number;    // 世界声望币
}

// 功法技能
export interface Technique {
  name: string;
  level: number;
  type: '心法' | '功法' | '武技' | '秘术' | '禁术';
  element?: 'metal' | 'wood' | 'water' | 'fire' | 'earth'; // 五行属性
  weapon?: string; // 武器类型
  cost?: string;   // 消耗类型
  description?: string;
}

// 功法装备
export interface TechniqueEquipment {
  heartMethod: Technique | null; // 心法（1个）
  skills: Technique[];           // 功法（2个）
  martialArts: Technique[];      // 武技（3个）
  secrets: Technique[];          // 秘术/禁术（4个，禁术最多2个）
}

// 特殊体质
export interface SpecialConstitution {
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';
  effects: string[];
}

// 成就
export interface Achievement {
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedAt?: Date;
}

// 头衔
export interface Title {
  sectTitle: string; // 宗门头衔
  worldTitle: string; // 世界头衔
  permissions: string[]; // 权限列表
}

// 完整角色数据
export interface Character {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  title: Title;
  realm: Realm;
  fiveElements: FiveElements;
  baseStats: BaseStats;
  threePowers: ThreePowers;
  combatStats: CombatStats;
  enlightenment: Enlightenment;
  affiliation: Affiliation;
  reputation: Reputation;
  currency: Currency;
  techniques: TechniqueEquipment;
  specialConstitution: SpecialConstitution | null;
  achievements: Achievement[];
  createdAt: Date;
  updatedAt: Date;
}

// 修炼相关
export interface CultivationSession {
  isActive: boolean;
  startTime: Date | null;
  baseGain: number; // 基础修炼增益
  bonusMultiplier: number; // 加成倍率
  currentGain: number; // 当前获得修炼值
}

// 突破相关
export interface BreakthroughAttempt {
  targetRealm: string;
  successRate: number;
  requirements: string[];
  consequences: {
    success: string[];
    failure: string[];
  };
}
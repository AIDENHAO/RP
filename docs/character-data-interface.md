# 人物数据接口文档

## 概述

本文档描述了修仙游戏系统中的人物数据接口定义，基于React TypeScript实现。系统采用修仙世界观，包含境界、功法、宗门等核心要素。

## 核心接口定义

### 1. 境界信息 (RealmInfo)

```typescript
interface RealmInfo {
  stage: '凡人阶段' | '修士阶段' | '仙神阶段';        // 修炼阶段
  majorLevel: '黄级' | '玄级' | '地级' | '天级' | '帝级' | '仙级' | '神级';  // 主要等级
  minorLevel: string;                                // 具体境界（如：金丹期、元婴期）
  cultivation: number;                               // 当前修为值
  maxCultivation: number;                            // 当前境界最大修为值
  breakthroughThreshold: number;                     // 突破阈值（90%触发顿悟）
  breakthroughRate: number;                          // 突破成功率
  soulRequirement: number;                           // 灵魂强度要求
  breakthroughCondition: string;                     // 突破条件描述
  failurePenalty: {                                  // 突破失败惩罚
    cultivationRetain: number;                       // 修为保留比例
    soulPenalty: number;                             // 灵魂强度惩罚
    lifePenalty?: number;                            // 生命力惩罚（仙神阶段）
    existencePenalty?: number;                       // 存在本质惩罚（神级）
  };
}
```

**境界详情：**

#### 凡人阶段
- **黄级-练气**：修为1-3486，灵魂强度≥100，完成"引气入体"任务
- **黄级-筑基**：修为3487-9761，灵魂强度≥200，使用"筑基丹"

#### 修士阶段
- **玄级**：开光(9762-21056)、融合(21057-41388)、心动(41389-77986)
- **地级**：金丹(77987-143862)、元婴(143863-262440)、出窍(262441-475880)
- **天级**：分神(475881-860072)、合体(860073-1551619)、洞虚(1551620-2796403)
- **帝级**：大乘(2796404-5037015)、渡劫(5037016-9070118)

#### 仙神阶段
- **仙级**：仙人(9070119-16329703)、仙君(16329704-29396957)、仙王(29396958-52918014)、仙帝(52918015-70175269)、仙尊(70175270-87242524)
- **神级**：仙神(87242525-124687134)、古神(124687135-148133373)、祖神(148133374-999999991)

**说明：**
- 修为值指数化增长：凡人(1-9761) → 修士(9762-9070118) → 仙神(9070119-1000000000)
- 每提升1小境界基础属性+5%，仙神阶段每个大境界圆满额外获得2技能点
- 阶段突破：凡人→修士需"天劫试炼"，修士→仙级需"飞升雷劫"，仙级→神级需"鸿蒙洗礼"

### 2. 五行系统 (FiveElements)

```typescript
interface FiveElements {
  metal: number;  // 金 (0-100)
  wood: number;   // 木 (0-100)
  water: number;  // 水 (0-100)
  fire: number;   // 火 (0-100)
  earth: number;  // 土 (0-100)
}
```

**说明：**
- 五行亲和度影响功法修炼效果
- 数值范围0-100，数值越高亲和度越强
- 不同元素对应不同颜色的功法效果
- 五行总值影响天赋属性

### 3. 天赋属性 (Talent)

```typescript
interface Talent {
  totalValue: number;      // 天赋总值 (0-500)
  level: '平庸' | '普通' | '优秀' | '卓越' | '绝世' | '逆天';  // 天赋等级
  description: string;     // 天赋描述
}
```

**说明：**
- 天赋总值 = 五行亲和度总和 (金+木+水+火+土)
- 天赋等级根据总值范围判定
- 天赋影响顿悟概率和修炼速度

### 4. 基础属性 (BaseStats)

```typescript
interface BaseStats {
  soulStrength: number;   // 灵魂强度 (1-1000)
  constitution: number;   // 体质属性 (1-1000)
  lifeForce: number;      // 生命力 (1-100000)
  combatTendency: 'attack' | 'defense' | 'support';  // 战斗倾向
}
```

**说明：**
- **灵魂强度**：影响突破成功率和精神力上限，与等级突破成功率挂钩
- **体质属性**：影响血量和防御力，每提升20点对应属性心法修炼速度+10%
- **生命力**：基础生命值，影响生存能力，作为玄级以上能力的消耗基数
- **战斗倾向**：攻击型/防御型/辅助型，影响武器适配效率（攻击型用剑类加成+10%）

### 5. 三力系统 (ThreePowers)

```typescript
interface ThreePowers {
  bloodPower: { current: number; max: number };    // 血量
  spiritPower: { current: number; max: number };   // 灵力
  mentalPower: { current: number; max: number };   // 精神力
}
```

**说明：**
- 血量：体质×100 + 等级×50
- 灵力：精神×80 + 等级×40
- 精神力：灵魂强度×5 + 等级×20

### 6. 战斗属性 (CombatStats)

```typescript
interface CombatStats {
  combatPower: number;     // 战力属性 (1-10000000)
  attack: number;          // 攻击力
  defense: number;         // 防御力
  speed: number;           // 速度
  criticalRate: number;    // 暴击率
  weaponProficiency: {     // 武器熟练度
    sword: number;         // 剑类熟练度
    blade: number;         // 刀类熟练度
    spear: number;         // 枪类熟练度
    bow: number;           // 弓类熟练度
    staff: number;         // 法杖熟练度
    [key: string]: number; // 其他武器类型
  };
}
```

**说明：**
- 战力属性：综合反映人物战斗能力，影响PVP对战匹配、副本准入门槛
- 武器熟练度：影响武技修炼和装备效果，与战斗倾向强绑定

### 7. 货币系统 (Currency)

```typescript
interface Currency {
  // 基础货币
  copper: number;          // 铜币 (100铜币=1银币)
  silver: number;          // 银币 (100银币=1金币)
  gold: number;            // 金币 (10金币=1下品灵石)
  
  // 灵石系统
  spiritStones: {
    lower: number;         // 下品灵石 (100下品=1中品)
    middle: number;        // 中品灵石 (100中品=1上品)
    upper: number;         // 上品灵石 (100上品=1极品)
    supreme: number;       // 极品灵石
  };
  
  // 特别兑换货币
  contribution: number;    // 宗门贡献点
  worldFame: number;       // 世界声望币
}
```

**货币用途：**
- **基础货币**：购买日常用品、材料、武器装备
- **灵石**：修炼、购买功法、修复灵兵、打造仙器
- **贡献点**：兑换特殊功法、稀有材料、宗门专属物品
- **声望币**：兑换神器碎片、仙级材料等珍贵物品

### 8. 功法系统 (Technique)

```typescript
interface Technique {
  name: string;                                    // 功法名称
  level: number;                                   // 功法等级
  type: '心法' | '功法' | '武技' | '秘术' | '禁术';  // 功法类型
  element?: '金' | '木' | '水' | '火' | '土';      // 五行属性（可选）
  weapon?: string;                                 // 武器类型（可选）
  rarity: '黄级' | '玄级' | '地级' | '天级' | '帝级' | '仙级' | '神级';  // 稀有度
  description: string;                             // 功法描述
  effects: string[];                               // 功法效果列表
  sect?: string;                                   // 所属门派
  requirements: {                                  // 修炼要求
    elementAffinity?: number;                      // 五行亲和度要求
    constitution?: number;                          // 体质要求
    weaponProficiency?: number;                     // 武器熟练度要求
    reputation?: number;                            // 名誉值要求（禁术）
  };
  cooldown?: number;                               // 切换冷却时间（小时）
  sideEffects?: string[];                          // 副作用（禁术）
}
```

**功法系统详情：**

#### 装备规则
- **心法**：1个，提供基础属性加成，影响修炼速度，切换冷却24小时
- **功法**：2个，主动攻击/防御技能，消耗生命力，需对应五行亲和度≥30点
- **武技**：3个，武器专精技能，提升武器效果，与战斗倾向强绑定
- **秘术/禁术**：4个，特殊效果技能（禁术最多2个），秘术无副作用，禁术有负面效果

#### 修炼条件
- **心法**：需对应体质属性≥100点/级
- **功法**：需对应五行亲和度≥30点/级
- **武技**：需对应武器熟练度≥50点/级
- **禁术**：需名誉值≥8000点或恶名值≤-8000点

#### 功法组合效果
- **五行组合**：装备5种不同五行功法，全属性+15%，元素伤害+20%
- **门派组合**：装备3种同门派功法，门派友好度获取+50%，门派技能效果+30%
- **禁术组合**：装备2种禁术，威力提升50%，副作用叠加
- **心法共鸣**：心法与3种功法属性一致，功法消耗降低25%，暴击率+10%

### 9. 宗门信息 (SectInfo)

```typescript
interface SectInfo {
  name: string;                                    // 宗门名称
  level: number;                                   // 宗门等级 (1-10)
  memberCount: number;                             // 成员数量
  activeMemberCount: number;                       // 活跃人数
  resources: number;                               // 资源储备
  reputation: number;                              // 声望值
  defenseStrength: number;                         // 护宗大阵强度
  territoryArea: number;                           // 领地面积
  buildings: {
    recruitmentHall: number;                       // 招新广场等级
    resourceWarehouse: number;                     // 资源仓库等级
    cultivationHall: number;                       // 修炼场等级
    affairsHall: number;                           // 事务阁等级
    weaponVault: number;                           // 兵器库等级
    protectionArray: number;                       // 护宗阵等级
  };
}
```

### 10. 特殊体质 (SpecialConstitution)

```typescript
interface SpecialConstitution {
  name: string;                                    // 体质名称
  description: string;                             // 体质描述
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';  // 稀有度
  effects: string[];                               // 体质效果
  elementBonus?: Record<string, number>;           // 五行加成（如：火系+50%）
  constitutionBonus?: number;                      // 体质属性加成
  specialConditions?: string[];                    // 特殊条件（如：怕水）
  hiddenTriggers?: string[];                       // 隐藏剧情触发条件
}
```

**特殊体质示例：**
- **混沌体**：五行亲和度均衡，修炼所有属性心法速度额外+15%（需体质800点以上）
- **焚天脉**：火系加成50%但怕水，作为隐藏剧情触发条件

### 11. 成就系统 (Achievement)

```typescript
interface Achievement {
  name: string;                                    // 成就名称
  description: string;                             // 成就描述
  rarity: 'common' | 'rare' | 'epic' | 'legendary';  // 稀有度
  unlocked: boolean;                               // 是否解锁
  progress?: number;                               // 当前进度
  maxProgress?: number;                            // 最大进度
}
```

## 完整人物数据结构 (MasterData)

```typescript
interface MasterData {
  // 基础信息
  name: string;                                    // 姓名
  title: string;                                   // 头衔
  age: number;                                     // 年龄
  
  // 核心属性
  realm: RealmInfo;                                // 境界信息
  fiveElements: FiveElements;                      // 五行亲和度
  talent: Talent;                                  // 天赋属性
  baseStats: BaseStats;                            // 基础属性
  threePowers: ThreePowers;                        // 三力系统
  combatStats: CombatStats;                        // 战斗属性
  
  // 状态系统
  enlightenment: {
    isActive: boolean;                             // 是否处于顿悟状态
    remainingTime: number;                         // 剩余时间（小时）
    speedBonus: number;                            // 修炼速度加成（%）
  };
  
  // 势力归属
  affiliation: {
    region: string;                                // 地域（如：青岚山脉）
    country: string;                               // 国家（如：大夏王朝）
    sect: string;                                  // 宗门（如：天剑门）
    position: string;                              // 职位
    sectTitle: '入门弟子' | '内门弟子' | '核心弟子' | '长老' | '宗主';  // 宗门头衔
    worldTitle: '新秀' | '精英' | '大师' | '传奇' | '神话';  // 世界头衔
  };
  
  // 声望系统
  reputation: {
    fame: number;                                  // 名誉值 (-10000 到 +10000)
    sectRelations: Record<string, number>;         // 各门派友好度 (-1000 到 +1000)
  };
  
  // 货币系统
  currency: Currency;                              // 货币资源
  
  // 功法系统
  techniques: {
    heartMethod: Technique | null;                 // 心法 (1个)
    skills: Technique[];                           // 功法 (2个)
    martialArts: Technique[];                      // 武技 (3个)
    secrets: Technique[];                          // 秘术/禁术 (4个)
  };
  
  // 特殊体质
  specialConstitution: SpecialConstitution;        // 特殊体质
  
  // 成就系统
  achievements: Achievement[];                     // 成就列表
  
  // 宗门信息
  sectInfo: SectInfo;                              // 宗门信息
}
```

## 核心计算逻辑

### 1. 三力系统计算

#### 血量计算
```
血量 = 体质属性 × 100 + 当前等级 × 50
```

#### 灵力计算
```
灵力 = 精神力 × 80 + 当前等级 × 40
```

#### 精神力计算
```
精神力 = 灵魂强度 × 5 + 当前等级 × 20
```

### 2. 修炼系统计算

#### 修炼增益计算
```
总修炼增益 = 基础增益 + 顿悟加成 + 天赋加成 + 体质加成 + 宗门加成 + 心法加成

其中：
- 基础增益：根据当前境界确定
- 顿悟加成：顿悟状态下提供100%-300%的随机修炼速度加成
- 天赋加成：天赋总值 × 0.1% (每点天赋提供0.1%修炼速度加成)
- 体质加成：特殊体质提供的修炼速度加成
- 宗门加成：宗门修炼场等级提供的加成
- 心法加成：心法等级提供的修炼速度加成
```

#### 突破成功率计算
```
突破成功率 = 基础成功率 + 灵魂强度加成 + 特殊体质加成

其中：
- 基础成功率：根据当前境界确定
- 灵魂强度加成：灵魂强度越高，突破成功率越高
- 特殊体质加成：某些特殊体质提供突破成功率加成
```

#### 突破失败惩罚
```
失败惩罚根据境界阶段不同：
- 凡人阶段：修炼值清零或保留50%，灵魂强度-5到-10点
- 修士阶段：修炼值保留60%-90%，灵魂强度-15到-70点
- 仙神阶段：修炼值保留90%-95%，生命力-10%到-30%，存在本质-1%到-3%
```

#### 顿悟触发机制
```
顿悟触发条件：当前修为值 ≥ 当前境界最大修为值 × 0.9 (90%阈值)

顿悟触发概率计算：
基础触发概率 = 10% (修为达到90%阈值时)
灵魂强度加成 = (灵魂强度 - 100) / 900 × 20% (最高20%加成)
天赋加成 = (天赋总值 - 100) / 400 × 25% (最高25%加成)
特殊体质加成 = 根据体质类型提供0-30%加成
心法加成 = 心法等级 × 2% (每级提供2%加成)

总触发概率 = 基础触发概率 + 灵魂强度加成 + 天赋加成 + 特殊体质加成 + 心法加成
最大触发概率 = 85% (概率上限)

顿悟持续时间：2-8小时 (随机)
顿悟修炼速度加成：100%-300% (随机)
```

### 3. 战力计算

#### 综合战力计算
```
综合战力 = 攻击力 × 0.4 + 防御力 × 0.3 + 速度 × 0.2 + 暴击率 × 0.1
```

#### 攻击力计算
```
攻击力 = 基础攻击力 + 功法加成 + 装备加成 + 境界加成
```

#### 防御力计算
```
防御力 = 基础防御力 + 体质加成 + 装备加成 + 境界加成
```

### 4. 声望关系计算

#### 关系等级判定
```
关系值范围：
- -1000 到 -500：仇敌
- -499 到 -100：敌对
- -99 到 99：中立
- 100 到 499：友好
- 500 到 1000：盟友
```

### 5. 天赋等级计算

#### 天赋总值计算
```
天赋总值 = 金 + 木 + 水 + 火 + 土 (五行亲和度总和)
```

#### 天赋等级判定
```
天赋等级范围：
- 0-100：平庸
- 101-200：普通
- 201-300：优秀
- 301-400：卓越
- 401-450：绝世
- 451-500：逆天
```

### 6. 宗门建筑加成计算

#### 修炼场加成
```
修炼速度加成 = 修炼场等级 × 10% (每级提供10%加成)
```

#### 护宗阵强度
```
护宗阵强度 = 护宗阵等级 × 1000 + 宗门等级 × 500
```

## 核心功能模块

### 1. 修炼系统
- **修炼增益计算**：基础增益 + 顿悟加成 + 天赋加成 + 体质加成 + 宗门加成 + 心法加成
- **境界突破**：基于灵魂强度和特殊体质计算成功率
- **顿悟状态**：修为达到90%阈值时概率触发，提供100%-300%随机修炼速度加成，持续2-8小时
- **天赋系统**：基于五行亲和度总和，影响顿悟概率和修炼速度

### 2. 战力计算
- **综合战力**：基于攻击、防御、速度等属性综合计算
- **三力系统**：血量、灵力、精神力相互影响
- **五行相生相克**：影响功法效果和战斗结果

### 3. 宗门管理
- **建筑系统**：6种建筑类型，每种提供不同加成
- **成员管理**：总成员数和活跃成员数
- **资源管理**：灵石、贡献点等资源系统

### 4. 声望系统
- **名誉值**：-10000到+10000，影响NPC交互
- **门派关系**：-1000到+1000，影响宗门间关系
- **关系等级**：仇敌、敌对、中立、友好、盟友

## 数据验证规则

### 1. 数值范围限制
- 五行亲和度：0-100
- 基础属性：1-1000（灵魂强度、体质），1-100000（生命力）
- 战力：1-10000000
- 名誉值：-10000到+10000
- 门派关系：-1000到+1000

### 2. 功法限制
- 心法：最多1个
- 功法：最多2个
- 武技：最多3个
- 秘术/禁术：最多4个（禁术最多2个）

### 3. 境界要求
- 灵魂强度必须满足当前境界要求才能突破
- 修为值必须达到突破阈值才能尝试突破

## 扩展建议

### 基础扩展
1. **装备系统**：武器、防具、饰品等装备接口
2. **任务系统**：主线任务、支线任务、日常任务等
3. **社交系统**：好友、师徒、道侣等关系接口
4. **交易系统**：拍卖行、商店、交易等接口
5. **活动系统**：限时活动、节日活动等接口

### 高级扩展
6. **地图系统**：地域解锁、传送阵、秘境探索
7. **副本系统**：单人副本、团队副本、世界BOSS
8. **PVP系统**：竞技场、宗门战、世界战争
9. **生活系统**：炼丹、炼器、种植、养殖
10. **宠物系统**：灵兽、坐骑、战斗伙伴

### 特色扩展
11. **天劫系统**：渡劫场景、雷劫强度、渡劫奖励
12. **秘境系统**：随机秘境、秘境探索、秘境奖励
13. **传承系统**：功法传承、血脉传承、道统传承
14. **因果系统**：因果值、因果事件、因果奖励
15. **轮回系统**：转世重生、前世记忆、轮回奖励

## 技术实现要点

1. **状态管理**：使用React useState管理组件状态
2. **定时器管理**：修炼功能使用setInterval，注意组件卸载时清理
3. **计算函数**：使用useCallback优化性能
4. **类型安全**：完整的TypeScript类型定义确保类型安全
5. **UI组件**：使用Ant Design组件库构建界面 
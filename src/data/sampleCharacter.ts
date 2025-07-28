// 示例角色数据
import { Character } from '../types/character';

export const sampleCharacter: Character = {
  id: 'char_001',
  name: '云逸仙',
  age: 156,
  avatar: '',
  title: {
    sectTitle: '逍遥宗宗主',
    worldTitle: '传奇修士',
    permissions: ['宗门管理', '弟子指导', '资源调配']
  },
  realm: {
    stage: '修士阶段',
    majorLevel: '地级',
    minorLevel: '金丹',
    cultivation: 120000,
    maxCultivation: 143862,
    breakthroughThreshold: 129476 // 90%阈值
  },
  fiveElements: {
    metal: 85,
    wood: 72,
    water: 90,
    fire: 78,
    earth: 68
  },
  baseStats: {
    soulStrength: 650, // 满足金丹期要求(600)
    constitution: 88,
    lifeForce: 95000
  },
  threePowers: {
    bloodPower: { current: 8500, max: 10000 },
    spiritPower: { current: 9200, max: 12000 },
    mentalPower: { current: 8800, max: 11000 }
  },
  combatStats: {
    attack: 950,
    defense: 880,
    speed: 920,
    criticalRate: 25,
    combatPower: 15680
  },
  enlightenment: {
    isActive: true,
    remainingTime: 18,
    speedBonus: 50
  },
  affiliation: {
    region: '东域',
    country: '大乾王朝',
    sect: '逍遥宗',
    position: '宗主'
  },
  reputation: {
    fame: 8500,
    sectRelations: {
      '青云门': 85,
      '万剑宗': 72,
      '天音寺': 90,
      '鬼王宗': -45,
      '血炼堂': -80
    }
  },
  currency: {
    copper: 50000,
    silver: 8000,
    gold: 1200,
    spiritStones: {
      lower: 50000,
      middle: 8000,
      upper: 1200,
      supreme: 50
    },
    contribution: 9999,
    worldFame: 5680
  },
  techniques: {
    heartMethod: {
      name: '太上忘情诀',
      level: 9,
      type: '心法',
      description: '道家至高心法，修炼可达忘情境界'
    },
    skills: [
      {
        name: '九天雷诀',
        level: 9,
        type: '功法',
        element: 'fire',
        description: '雷系攻击功法，威力巨大'
      },
      {
        name: '水月神通',
        level: 8,
        type: '功法',
        element: 'water',
        description: '水系防御功法，如水月镜花'
      }
    ],
    martialArts: [
      {
        name: '太虚剑法',
        level: 8,
        type: '武技',
        weapon: '剑',
        description: '剑道至高武技'
      },
      {
        name: '凌波微步',
        level: 7,
        type: '武技',
        weapon: '身法',
        description: '轻功身法，如履平地'
      },
      {
        name: '千手如来掌',
        level: 6,
        type: '武技',
        weapon: '掌法',
        description: '佛门掌法，慈悲为怀'
      }
    ],
    secrets: [
      {
        name: '天眼通',
        level: 6,
        type: '秘术',
        cost: '精神力',
        description: '洞察万物的神通'
      }
    ]
  },
  specialConstitution: {
    name: '先天道体',
    description: '天生道体，修炼速度+30%，五行亲和度+10',
    rarity: 'legendary',
    effects: ['修炼速度+30%', '五行亲和度+10', '突破成功率+15%']
  },
  achievements: [
    {
      name: '宗门建立者',
      description: '创建逍遥宗',
      rarity: 'legendary',
      unlocked: true,
      unlockedAt: new Date('2020-01-01')
    },
    {
      name: '金丹突破',
      description: '成功突破金丹期',
      rarity: 'epic',
      unlocked: true,
      unlockedAt: new Date('2023-06-15')
    },
    {
      name: '百年修行',
      description: '修行超过百年',
      rarity: 'rare',
      unlocked: true,
      unlockedAt: new Date('2022-03-20')
    },
    {
      name: '弟子满门',
      description: '培养弟子超过100名',
      rarity: 'common',
      unlocked: true,
      unlockedAt: new Date('2023-01-10')
    },
    {
      name: '五行通达',
      description: '五行亲和度均超过70',
      rarity: 'epic',
      unlocked: false
    }
  ],
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date()
};

// 创建一个简化的角色用于测试
export const createTestCharacter = (overrides: Partial<Character> = {}): Character => {
  return {
    ...sampleCharacter,
    ...overrides,
    id: `char_${Date.now()}`,
    updatedAt: new Date()
  };
};
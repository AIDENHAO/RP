// 修仙逻辑核心服务
import { Character, Realm, CultivationSession, BreakthroughAttempt } from '../types/character';

// 境界配置数据（基于文档）
const REALM_CONFIG: Record<string, Record<string, Record<string, { min: number; max: number; soulRequired: number }>>> = {
  // 凡人阶段
  '凡人阶段': {
    '黄级': {
      '练气': { min: 1, max: 3486, soulRequired: 100 },
      '筑基': { min: 3487, max: 9761, soulRequired: 200 }
    }
  },
  // 修士阶段
  '修士阶段': {
    '玄级': {
      '开光': { min: 9762, max: 21056, soulRequired: 300 },
      '融合': { min: 21057, max: 41388, soulRequired: 400 },
      '心动': { min: 41389, max: 77986, soulRequired: 500 }
    },
    '地级': {
      '金丹': { min: 77987, max: 143862, soulRequired: 600 },
      '元婴': { min: 143863, max: 262440, soulRequired: 700 },
      '出窍': { min: 262441, max: 475880, soulRequired: 800 }
    },
    '天级': {
      '分神': { min: 475881, max: 860072, soulRequired: 850 },
      '合体': { min: 860073, max: 1551619, soulRequired: 900 },
      '洞虚': { min: 1551620, max: 2796403, soulRequired: 950 }
    },
    '帝级': {
      '大乘': { min: 2796404, max: 5037015, soulRequired: 1000 },
      '渡劫': { min: 5037016, max: 9070118, soulRequired: 1000 }
    }
  },
  // 仙神阶段
  '仙神阶段': {
    '仙级': {
      '仙人': { min: 9070119, max: 16329703, soulRequired: 1000 },
      '仙君': { min: 16329704, max: 29396957, soulRequired: 1000 },
      '仙王': { min: 29396958, max: 52918014, soulRequired: 1000 },
      '仙帝': { min: 52918015, max: 70175269, soulRequired: 1000 },
      '仙尊': { min: 70175270, max: 87242524, soulRequired: 1000 }
    },
    '神级': {
      '仙神': { min: 87242525, max: 124687134, soulRequired: 1000 },
      '古神': { min: 124687135, max: 148133373, soulRequired: 1000 },
      '祖神': { min: 148133374, max: 999999991, soulRequired: 1000 }
    }
  }
};

export class CultivationLogic {
  /**
   * 计算修炼增益
   */
  static calculateCultivationGain(character: Character): number {
    const baseGain = 50; // 基础修炼增益
    let multiplier = 1;

    // 顿悟加成
    if (character.enlightenment.isActive) {
      multiplier += character.enlightenment.speedBonus / 100;
    }

    // 体质加成（每20点体质+10%修炼速度）
    const constitutionBonus = Math.floor(character.baseStats.constitution / 20) * 0.1;
    multiplier += constitutionBonus;

    // 特殊体质加成
    if (character.specialConstitution) {
      switch (character.specialConstitution.name) {
        case '先天道体':
          multiplier += 0.3;
          break;
        case '混沌体':
          if (character.baseStats.constitution >= 800) {
            multiplier += 0.15;
          }
          break;
        case '焚天脉':
          if (character.fiveElements.fire >= 80) {
            multiplier += 0.5;
          }
          break;
      }
    }

    // 心法加成
    if (character.techniques.heartMethod) {
      const heartMethodBonus = character.techniques.heartMethod.level * 0.05;
      multiplier += heartMethodBonus;
    }

    return Math.floor(baseGain * multiplier);
  }

  /**
   * 检查是否可以突破
   */
  static canBreakthrough(character: Character): boolean {
    const currentRealm = this.getCurrentRealmConfig(character.realm);
    if (!currentRealm) return false;

    // 修炼值必须达到当前境界最大值
    if (character.realm.cultivation < currentRealm.max) return false;

    // 灵魂强度必须满足要求
    if (character.baseStats.soulStrength < currentRealm.soulRequired) return false;

    return true;
  }

  /**
   * 计算突破成功率
   */
  static calculateBreakthroughSuccessRate(character: Character): number {
    const currentRealm = this.getCurrentRealmConfig(character.realm);
    if (!currentRealm) return 0;

    let baseRate = 70; // 基础成功率70%

    // 灵魂强度影响
    const soulDifference = character.baseStats.soulStrength - currentRealm.soulRequired;
    if (soulDifference >= 0) {
      baseRate += Math.min(soulDifference * 0.5, 20); // 最多+20%
    } else {
      baseRate -= 30; // 不满足条件-30%
    }

    // 特殊体质影响
    if (character.specialConstitution) {
      switch (character.specialConstitution.rarity) {
        case 'legendary':
          baseRate += 15;
          break;
        case 'epic':
          baseRate += 10;
          break;
        case 'rare':
          baseRate += 5;
          break;
      }
    }

    // 宗门加成（如果有相关功法）
    if (character.techniques.heartMethod && character.techniques.heartMethod.level >= 8) {
      baseRate += 10;
    }

    return Math.max(10, Math.min(95, baseRate)); // 限制在10%-95%之间
  }

  /**
   * 执行突破
   */
  static attemptBreakthrough(character: Character): { success: boolean; newRealm?: Realm; penalties?: any } {
    const successRate = this.calculateBreakthroughSuccessRate(character);
    const success = Math.random() * 100 < successRate;

    if (success) {
      const newRealm = this.getNextRealm(character.realm);
      if (newRealm) {
        return {
          success: true,
          newRealm: {
            ...newRealm,
            cultivation: 0 // 突破后修炼值重置
          }
        };
      }
    }

    // 失败惩罚
    const penalties = this.getBreakthroughFailurePenalties(character.realm);
    return {
      success: false,
      penalties
    };
  }

  /**
   * 获取当前境界配置
   */
  private static getCurrentRealmConfig(realm: Realm) {
    const stageConfig = REALM_CONFIG[realm.stage];
    if (!stageConfig) return null;

    const majorConfig = stageConfig[realm.majorLevel];
    if (!majorConfig) return null;

    return majorConfig[realm.minorLevel] || null;
  }

  /**
   * 获取下一个境界
   */
  private static getNextRealm(currentRealm: Realm): Realm | null {
    // 这里需要实现境界晋升逻辑
    // 简化实现，实际需要根据完整的境界表来实现
    const currentConfig = this.getCurrentRealmConfig(currentRealm);
    if (!currentConfig) return null;

    // 查找下一个境界
    // 这里是简化版本，实际需要完整的境界升级逻辑
    return {
      ...currentRealm,
      cultivation: 0,
      maxCultivation: currentConfig.max * 2, // 简化计算
      breakthroughThreshold: currentConfig.max * 1.8
    };
  }

  /**
   * 获取突破失败惩罚
   */
  private static getBreakthroughFailurePenalties(realm: Realm) {
    const stage = realm.stage;
    
    if (stage === '凡人阶段') {
      return {
        cultivationRetention: realm.minorLevel === '练气' ? 0 : 0.5,
        soulStrengthLoss: realm.minorLevel === '练气' ? 5 : 10
      };
    } else if (stage === '修士阶段') {
      return {
        cultivationRetention: 0.7,
        soulStrengthLoss: 20
      };
    } else {
      return {
        cultivationRetention: 0.9,
        lifeForceLoss: 0.1
      };
    }
  }

  /**
   * 检查顿悟触发
   */
  static checkEnlightenmentTrigger(character: Character): boolean {
    const currentRealm = this.getCurrentRealmConfig(character.realm);
    if (!currentRealm) return false;

    // 达到90%阈值触发顿悟
    const threshold = currentRealm.max * 0.9;
    return character.realm.cultivation >= threshold && !character.enlightenment.isActive;
  }

  /**
   * 激活顿悟状态
   */
  static activateEnlightenment(character: Character): Character {
    return {
      ...character,
      enlightenment: {
        isActive: true,
        remainingTime: 24, // 24小时
        speedBonus: 50 // +50%修炼速度
      }
    };
  }

  /**
   * 计算属性加成
   */
  static calculateAttributeBonuses(character: Character) {
    const bonuses = {
      maxBloodPower: character.baseStats.constitution * 100 + this.getCharacterLevel(character) * 50,
      maxSpiritPower: character.baseStats.constitution * 80 + this.getCharacterLevel(character) * 40,
      maxMentalPower: character.baseStats.soulStrength * 5 + this.getCharacterLevel(character) * 20
    };

    // 装备和功法加成
    if (character.techniques.heartMethod) {
      bonuses.maxSpiritPower += character.techniques.heartMethod.level * 100;
    }

    return bonuses;
  }

  /**
   * 获取角色等级（基于修炼值）
   */
  private static getCharacterLevel(character: Character): number {
    // 简化计算，实际应该基于境界和修炼值
    return Math.floor(character.realm.cultivation / 1000) + 1;
  }

  /**
   * 计算战力
   */
  static calculateCombatPower(character: Character): number {
    let basePower = 0;

    // 基础属性贡献
    basePower += character.baseStats.constitution * 10;
    basePower += character.baseStats.soulStrength * 15;
    basePower += character.baseStats.lifeForce * 5;

    // 五行亲和度贡献
    const elementSum = Object.values(character.fiveElements).reduce((sum, val) => sum + val, 0);
    basePower += elementSum * 2;

    // 境界加成
    basePower += character.realm.cultivation * 0.1;

    // 功法加成
    if (character.techniques.heartMethod) {
      basePower += character.techniques.heartMethod.level * 200;
    }
    
    character.techniques.skills.forEach(skill => {
      basePower += skill.level * 150;
    });

    character.techniques.martialArts.forEach(art => {
      basePower += art.level * 100;
    });

    return Math.floor(basePower);
  }
}
import { defineStore } from 'pinia';
import { calcSuccessRate, calcProfitMargin, calcAvgYield } from '@/utils/bdo';
import { storage } from 'utils/localstorage_';
import type { Character } from 'types/characterType';

// Dynamic import to avoid cross import error.
const useProcessingStore = () => import('./useProcessingStore');
const useAlchemyStore = () => import('./useAlchemyStore');

// 角色
/**
 * 資料庫的key
 */
const CHARACTER_KEY = 'character';

const getStorageData = () => {
  return storage.getItem<Character>(CHARACTER_KEY);
};

const useCharacterStore = defineStore('Character', {
  state: () => {
    const storageCharacter = getStorageData();
    // 使用Object.assign，新增property時，直接修改預設值即可
    const initialState: Character = Object.assign(
      { // 首次載入預設值
        extraSuccessRate: 43,
        crafts: 150,
        valuePack: true,
        bonusValue: 0,
        alchemy: {
          time: 1.1,
          extractMaxRate: 26.6,
        }
      } as Character,
      storageCharacter || {}
    );
    return initialState;
  },
  getters: {
    /**
     * 實際領取額(>0.65)。
     */
    profitMargin(): number {
      return calcProfitMargin(this);
    },
    /**
     * 加工成功率(%)，介於0.7~1。
     */
    successRate(): number {
      return calcSuccessRate(this);
    },
    /**
     * 平均單次大量加工份數，若加工成功率為1則與`crafts`相同。
     */
    avgCraft(): number {
      return this.successRate * this.crafts;
    },
    /**
     * 估計每次製作的期望產量。預設產量範圍為1~4。
     */
    alchemyAvgYields(): number {
      return calcAvgYield([1, 4], this.alchemy.extractMaxRate);
    },
    /**
     * 煉金每小時製作次數
     */
    alchemyHourlyCrafts(): number {
      return 3600 / this.alchemy.time;
    },
  },
  actions: {
    updateStorage() {
      // 角色
      storage.setItem(CHARACTER_KEY, this.$state);
    },
    updateCharacter(
      attr: keyof Omit<Character, 'alchemy' | 'cooking'> | `alchemy.${keyof Character['alchemy']}`,
      newVal: number | string | boolean,
    ) {
      const keys = attr.split('.') as
        [keyof Omit<Character, 'alchemy' | 'cooking'>] |
        ['alchemy', keyof Character['alchemy']];
      if (keys[0] === 'alchemy') {
        this.alchemy[keys[1]] = Number(newVal);
      } else {
        if (attr !== 'valuePack') newVal = Number(newVal);
        else newVal = !!newVal;
        // @ts-expect-error
        this[attr] = newVal;
      }
      useProcessingStore().then((module) => {
        const processingState = module.default();
        processingState.refresh();
        processingState.refreshFav();
      });
      useAlchemyStore().then((module) => {
        const alchemyState = module.default();
        alchemyState.refresh();
      });
    },
    /**
     * 稅後實際領取(未扣成本)
     */
    profit(income: number) {
      return income * this.profitMargin;
    }
  }
});
export default useCharacterStore;

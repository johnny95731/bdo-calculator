import { defineStore } from 'pinia';
import useCharacterStore, {
  evaluated, initialState as initCharacter,
} from './useCharacterStore.ts';
import { alchemyExample } from '@/utils/examples';
import { calcAvgYield, calcGoods } from '@/utils/bdo';
import { deepCopy, getLastItem, storage, sumAlongAttr } from '@/utils/helpers.ts';
import type { AlchemyExampleKey } from '@/utils/examples';
import type {
  AlchemyHourlyStats, AlchemyRecipe, ReqAlchemyRecipeInfo, ReqRawInfo, State
} from 'types/alchemyType.ts';

const newAlchemyRecipe = (
  profitMargin: number,
  extractMaxRate: number,
  timePerCraft: number,
  reqInfo: ReqAlchemyRecipeInfo
): AlchemyRecipe => {
  reqInfo = deepCopy(reqInfo);
  /**
   * 製作次數
   */
  let minCrafts = Infinity;
  let cost = 0;
  const raw = reqInfo.raw.map((obj) => {
    minCrafts = Math.min(minCrafts, Math.floor(obj.num / obj.consumption));
    cost += obj.consumption * obj.cost;
    return calcGoods(profitMargin, obj);
  });
  const avgYield = calcAvgYield(reqInfo.yieldRange, extractMaxRate);
  const rareProd = (reqInfo.rareProd && {
    ...reqInfo.rareProd,
    num: minCrafts * reqInfo.rareProd.rate,
  });
  return {
    ...reqInfo,
    raw,
    crafts: minCrafts,
    avgYield,
    num: minCrafts * avgYield,
    cost,
    timeCost: minCrafts * timePerCraft / 60,
    rareProd,
  };
};

const getStorageInfo = (recipe: AlchemyRecipe): ReqAlchemyRecipeInfo => {
  const reqInfos: ReqAlchemyRecipeInfo = {
    name: recipe.name,
    price: recipe.price,
    raw: recipe.raw.map((obj) => ({
      name: obj.name,
      price: obj.price,
      cost: obj.cost,
      num: obj.num,
      consumption: obj.consumption
    })),
    yieldRange: recipe.yieldRange,
  };
  recipe.rareProd && (reqInfos.rareProd = {
    price: recipe.rareProd.price,
    rate: recipe.rareProd.rate,
  });
  return reqInfos;
};

// const newBlueElixir = (
//   profitMargin: number,
//   extractMaxRate: number,
//   timePerCraft: number,
//   reqInfo: ReqAlchemyRecipeInfo
// ): BlueElixir => {
//   /**
//    * 製作次數
//    */
//   let minCrafts = Infinity;
//   let cost = 0;
//   const raw = reqInfo.raw.map((obj) => {
//     minCrafts = Math.min(minCrafts, obj.num / obj.consumption);
//     cost += obj.consumption * obj.cost;
//     return calcGoods(profitMargin, obj);
//   });
//   const avgYield = calcAvgYield(reqInfo.yieldRange, extractMaxRate);
//   return {
//     ...reqInfo,
//     raw,
//     num: minCrafts * avgYield,
//     cost,
//     unitProfit: reqInfo.price * profitMargin - cost,
//     timeCost: minCrafts * timePerCraft
//   };
// };


const STORAGE_KEY = {
  current: 'alchemyCurrent',
  fav: 'alchemyFav',
} as const;

// 取得初始值
let currentRecipe: ReqAlchemyRecipeInfo | AlchemyRecipe = (
  storage.get(STORAGE_KEY.current, alchemyExample.elixir) as ReqAlchemyRecipeInfo
);
currentRecipe = newAlchemyRecipe(
  evaluated.profitMargin,
  initCharacter.alchemy.extractMaxRate,
  initCharacter.alchemy.time,
  currentRecipe
);

const initialState: State = {
  current: currentRecipe as AlchemyRecipe,
  recipes: Object.values(alchemyExample).map((obj) => 
    newAlchemyRecipe(
      evaluated.profitMargin,
      initCharacter.alchemy.extractMaxRate,
      initCharacter.alchemy.time,
      obj
    )
  ),
  // currentSimple: alchemyExample.normalElixir,
  // simpleAlchemy: [],
};

const useAlchemyStore = defineStore('Alchemy', {
  state: () => initialState,
  actions: {
    newAlchemyRecipe(
      recipe: ReqAlchemyRecipeInfo
    ) {
      const characterState = useCharacterStore();
      return newAlchemyRecipe(
        characterState.profitMargin,
        characterState.alchemy.extractMaxRate,
        characterState.alchemy.time,
        recipe
      );
    },
    // Evaluate statistics
    /**
     * 總成本
     */
    cost(idx: number = -1) {
      const recipe = idx === -1 ? this.current : this.recipes[idx];
      return sumAlongAttr(recipe.raw, (obj) => obj.cost * obj.num);
    },
    /**
     * 出售收入
     */
    allIncomes(idx: number = -1) {
      const { profit } = useCharacterStore();
      const recipe = idx === -1 ? this.current : this.recipes[idx];
      const prod = profit(recipe.num * recipe.price);
      const rareProd = recipe.rareProd ? 
        profit(recipe.rareProd.num * recipe.rareProd.price):
        0;
      return {
        total: prod + rareProd,
        regular: prod,
        rare: rareProd,
        raw: profit(sumAlongAttr(recipe.raw, (obj) => obj.price * obj.num))
      };
    },
    hourly(idx: number = -1): AlchemyHourlyStats {
      const recipe = idx === -1 ? this.current : this.recipes[idx];
      const { profit, alchemyHourlyCrafts } = useCharacterStore();
      const hourlyCraft = alchemyHourlyCrafts;
      const yield_ = recipe.avgYield * hourlyCraft;
      const rareProd = recipe.rareProd && 
        {
          profit: profit(
            recipe.rareProd.rate * hourlyCraft * recipe.rareProd.price
          ),
          yield: recipe.rareProd.rate * hourlyCraft
        };
      return {
        profit: yield_ * recipe.price,
        yield: yield_,
        cost: sumAlongAttr(recipe.raw, (obj) => obj.cost * obj.consumption) * hourlyCraft,
        ...(rareProd && { rareProd }),
      };
    },
    /**
     * 加工為稀有產物
     * @param regularNum 一般產物數量
     * @returns 產量、消耗時間及額外成本
     */
    procToRare(regularNum: number) {
      const characterState = useCharacterStore();
      /**
       * 所需加工成功次數。使用伊培拉的淨水，一次消耗10份材料。
       */
      const craft = Math.floor(regularNum / 30);
      return {
        /**
         * 產量
         */
        yield: craft * 10,
        /**
         * 加工時間(分鐘)。
         * 簡易加工: (6秒/次) / (60秒/分鐘) = 1/10 分鐘/次。
         * craft / successRate = 實際需要加工次數
         */
        timeCost: craft / (characterState.successRate * 10),
        /**
         * 額外成本。
         * 藍色藍色液體試藥 50000/個、伊培拉的淨水 10000/個。
         */
        cost: craft * 510000
      };
    },
    /**
     * 重新計算產物數量及成本、收益等。
     */
    refresh() {
      Object.assign(this.current, this.newAlchemyRecipe(this.current));
    },
    // 資料庫更新
    updateStorage() {
      const current = getStorageInfo(this.current);
      storage.set(STORAGE_KEY.current, JSON.stringify(current));
      const fav = this.recipes.map(favObj => getStorageInfo(favObj));
      storage.set(STORAGE_KEY.fav, JSON.stringify(fav));
    },
    // 新增
    appendRaw() {
      const lastItem = deepCopy(getLastItem(this.current.raw));
      const allNames = this.current.raw.map(obj => obj.name);
      // 預設名稱
      const name = '原料';
      let nameIdx = 0;
      while (allNames.includes(name + (nameIdx > 0 ? nameIdx : ''))) nameIdx++;
      lastItem.name = name + (nameIdx > 0 ? nameIdx : '');
      this.current.raw.push(lastItem);
      this.refresh();
    },
    updateRecipe(attr: keyof ReqAlchemyRecipeInfo, newVal: string, idx?: 0 | 1) {
      if (attr === 'yieldRange') 
        this.current.yieldRange[idx ?? 0] = Number(newVal);
      else 
        Object.assign(this.current, {
          [attr]: attr === 'name' ? newVal : Number(newVal)
        });
      this.refresh();
    },
    updateRaw(idx: number, attr: keyof ReqRawInfo, newVal: string) {
      Object.assign(this.current.raw[idx], {
        [attr]: attr === 'name' ? String(newVal) : Number(newVal)
      });
      this.refresh();
    },
    updateRareProd(newVal?: Required<ReqAlchemyRecipeInfo>['rareProd']) {
      if (!newVal) {
        delete this.current.rareProd;
        return;
      }
      // @ts-expect-error 'num'在refresh()中計算。
      this.current.rareProd = newVal;
      this.refresh();
    },
    setCrafts(rawNums: number[]) {
      this.current.raw.forEach((obj, i) => obj.num = rawNums[i]);
      this.refresh();
    },
    overrideCurrent(type: AlchemyExampleKey | number) {
      const material = (
        typeof type === 'string' ?
          alchemyExample[type] :
          this.recipes[type]
      );
      Object.assign(this.current, this.newAlchemyRecipe(material));
    },
    removeRaw(idx: number) {
      this.current.raw.splice(idx, 1);
      this.refresh();
    },
    /**
     * 儲存配方
     */
    saveRecipe() {
      this.recipes.push(this.newAlchemyRecipe(this.current));
    },
    /**
     * 移除我的最愛資料
     */
    removeRecipe(idx: number) {
      this.recipes.splice(idx, 1);
    },

  }
});
export default useAlchemyStore;

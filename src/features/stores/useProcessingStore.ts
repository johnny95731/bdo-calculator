import { defineStore } from 'pinia';
// Store and utils
import useCharacterStore, { evaluated } from './useCharacterStore.ts';
import { round, deepCopy, removeItemByAttr, storage, getLastItem, sumAlongAttr } from '@/utils/helpers';
import {
  calcProductInfo, processingHourlyInfo, calcGoods, hourlyCraftsFromRaw,
  getBasicInfo,
} from '@/utils/bdo';
import { processingExample } from '@/utils/examples.ts';
// Types
import type {
  FavBasicInfo, FavMaterial, tier2HourlyStats, ProcessingRecipe,
  Product, ReqProductInfo, State 
} from 'types/processingType.ts';
import type { ProcessingExampleKey } from '@/utils/examples.ts';
import type { Goods, HourlyStats, ReqGoods } from 'types/commonType.ts';


const { empty, wood, alloy } = processingExample;


const newMaterial = (
  profitMargin: number,
  craft: number,
  rawInfo: ReqGoods[],
  tier1Info: ReqProductInfo[],
  tier2Info: ReqProductInfo[],
): ProcessingRecipe => {
  const raws = rawInfo.map((obj) => calcGoods(profitMargin, obj));
  const tier1s = calcProductInfo(profitMargin, craft, rawInfo, tier1Info);
  return {
    raw: raws,
    tier1: tier1s,
    tier2: calcProductInfo(
      profitMargin, craft, rawInfo.concat(tier1s), tier2Info
    )
  };
};

function getGoods(recipe: FavBasicInfo, tier: 0 | 1 | 2): ReqGoods[] | ReqProductInfo[];
function getGoods(recipe: ProcessingRecipe, tier: 0 | 1 | 2): Goods[] | Product[];
function getGoods<
  T extends Omit<FavBasicInfo, 'name'> | ProcessingRecipe
>(recipe: T, tier: 0 | 1 | 2) {
  return (
    tier === 0 ? recipe.raw :
      tier === 1 ? recipe.tier1 :
        recipe.tier2
  );
}


const STORAGE_KEY = {
  current: 'mpCurrent',
  fav: 'mpFav',
} as const;

const { profitMargin, craft } = evaluated;

// 取得初始值
let currentMaterial: Omit<FavBasicInfo, 'name'> | ProcessingRecipe = (
  storage.get(STORAGE_KEY.current, wood) as Omit<FavBasicInfo, 'name'>
);
currentMaterial = newMaterial(
  profitMargin,
  craft,
  currentMaterial.raw,
  currentMaterial.tier1,
  currentMaterial.tier2
);

let favMaterials: FavMaterial[] = storage.get(STORAGE_KEY.fav, [
  wood, alloy,
]);
favMaterials = favMaterials.map(obj => Object.assign(
  { name: obj.name },
  newMaterial(
    profitMargin,
    craft,
    obj.raw,
    obj.tier1,
    obj.tier2
  )
));

const initialState: State = {
  ...(currentMaterial as ProcessingRecipe),
  recipes: favMaterials
};

const useProcessingStore = defineStore('Processing', {
  state: () => initialState,
  actions: {
    newMaterial(
      { raw, tier1, tier2 }: {
        raw: ReqGoods[],
        tier1: ReqProductInfo[],
        tier2: ReqProductInfo[],
      }
    ) {
      const characterState = useCharacterStore();
      return newMaterial(
        characterState.profitMargin,
        characterState.crafts,
        raw,
        tier1,
        tier2
      );
    },
    getGoods(idx: number, tier: 0 | 1 | 2) {
      const recipe = idx === -1 ? this : this.recipes[idx];
      return getGoods(recipe, tier);
    },
    // Evaluate statistics
    /**
     * 出售收入
     */
    allIncomes(idx: number) {
      const recipe = idx === -1 ? this : this.recipes[idx];
      return {
        raw: sumAlongAttr(recipe.raw, (obj) =>  obj.num * obj.unitProfit),
        tier1: sumAlongAttr(recipe.tier1, (obj) =>  obj.num * obj.unitProfit),
        tier2: sumAlongAttr(recipe.tier2, (obj) =>  obj.num * obj.unitProfit),
      };
    },
    /**
     * 成本
     */
    cost(idx: number) {
      const recipe = idx === -1 ? this : this.recipes[idx];
      return sumAlongAttr(recipe.raw, (obj) =>  obj.num * obj.cost);
    },
    hourly(idx: number, tier: 1 | 2): HourlyStats[] | tier2HourlyStats[] {
      const { avgCraft } = useCharacterStore();
      const { tier1, tier2 } = idx === -1 ? this : this.recipes[idx];
      const product = tier === 1 ? tier1 : tier2;
      const infos: HourlyStats[] = (
        processingHourlyInfo(avgCraft, product)
      );
      if (tier === 2) {
        const craftsFromRaw = hourlyCraftsFromRaw(avgCraft, tier1, tier2);
        return infos.map((info, i) => {
          const yields = craftsFromRaw[i] * tier2[i].avgyield;
          return {
            ...info,
            craftsFromRaw: craftsFromRaw[i],
            yieldFromRaw: yields,
            profitFromRaw: yields * tier2[i].unitProfit,
            costFromRaw: craftsFromRaw[i] * tier2[i].cost,
          };
        });
      } else if (infos.length > 1) {
        const len = infos.length;
        const keys = Object.keys(infos[0]) as (keyof HourlyStats)[];
        infos.forEach(obj => {
          keys.forEach(key => {
            obj[key] /= len;
          });
        });
      }
      return infos;
    },
    /**
     * 加工完所有原料花費時間(分鐘)
     */
    timeCost(idx: number): [number, number] {
      const material = idx === -1 ? this : this.recipes[idx];
      const tier1 = sumAlongAttr(material.tier1, 'timeCost');
      const tier2 = sumAlongAttr(material.tier2, 'timeCost');
      return [round(tier1), round(tier2)];
    },
    // Updater
    /**
     * 重新計算產物數量及成本、收益等。
     */
    refresh() {
      // 表單資料
      Object.assign(this,
        this.newMaterial(this)
      );
    },
    /**
     * 重新計算產物數量及成本、收益等。
     */
    async refreshFav() {
      this.recipes.forEach((favObj) => {
        Object.assign(favObj, this.newMaterial(favObj));
      });
    },
    // 資料庫更新
    updateStorage() {
      const current = getBasicInfo(this);
      storage.set(STORAGE_KEY.current, JSON.stringify(current));
      const fav = this.recipes.map(favObj => getBasicInfo(favObj));
      storage.set(STORAGE_KEY.fav, JSON.stringify(fav));
    },
    updateName(tier: 0 | 1 | 2, idx: number, name: string) {
      const [goods, product] = (
        tier === 0 ? [this.raw, this.tier1] :
          tier === 1 ? [this.tier1, this.tier2] :
            [this.tier2]
      );
      // Update dependency
      const oldName = goods[idx].name;
      product?.forEach(obj => {
        const index = obj.raw.findIndex((obj) => obj.name === oldName);
        if (index > -1) obj.raw[index].name = name;
      });
      goods[idx].name = name;
    },
    updateRaw(
      attr: keyof Omit<Goods, 'unitProfit' | 'name'>,
      idx: number,
      newVal: number | string,
    ) {
      newVal = Number(newVal);
      this.raw[idx][attr] = newVal;
      this.refresh();
    },
    updateProduct(
      attr: keyof Omit<ReqProductInfo, 'name' | 'raw'> | 'consumption',
      tier: 1 | 2,
      idx: number,
      newVal: number | string | [number, number | string]
    ) {
      if (attr === 'consumption') {
        if (!(newVal instanceof Array)) return;
        this[`tier${tier}`][idx].raw[newVal[0]].consumption = Number(newVal[1]);
      } else {
        newVal = Number(newVal);
        this[`tier${tier}`][idx][attr] = newVal;
      }
      this.refresh();
    },
    /**
     * 修改(新增/刪除)產物的原料
     */
    updateRawOfProduct(
      tier: 1 | 2,
      idx: number,
      appending: boolean,
      newName: string,
    ) {
      const product = this[`tier${tier}`][idx];
      if (appending) {
        product.raw.push({
          name: newName, consumption: tier === 1 ? 5 : 10
        });
      } else {
        removeItemByAttr(product.raw, 'name', newName);
      }
      this.refresh();
    },
    appendGoods(
      tier: 0 | 1 | 2
    ) {
      const goods = this.getGoods(-1, tier);
      const lastItem = deepCopy(
        goods.length ?
          getLastItem(goods) :
          getGoods(empty, tier)[0]
      );
      // @ts-expect-error
      if (tier !== 0) lastItem.raw = [];
      const allNames = goods.map(obj => obj.name);
      // 預設名稱
      const name = tier === 0 ? '原料' : '產物';
      let nameIdx = 0;
      while (allNames.includes(name + (nameIdx > 0 ? nameIdx : ''))) nameIdx++;
      lastItem.name = name + (nameIdx > 0 ? nameIdx : '');
      // @ts-expect-error 其餘attribute由
      goods.push(lastItem);
      this.refresh();
    },
    /**
     * 覆蓋現在表單
     */
    overrideCurrent(type: ProcessingExampleKey | number) {
      const material = (
        typeof type === 'string' ?
          processingExample[type] :
          this.recipes[type]
      );
      Object.assign(this, this.newMaterial(material));
    },
    removeGoods(
      tier: 0 | 1 | 2,
      idx: number,
    ) {
      const [goods, product] = (
        tier === 0 ? [this.raw, this.tier1] :
          tier === 1 ? [this.tier1, this.tier2] :
            [this.tier2]
      );
      const item = goods.splice(idx, 1)[0];
      product?.forEach((prodObj) => {
        removeItemByAttr(prodObj.raw, 'name', item.name);
      });
      this.refresh();
    },
    /**
     * 將現在的材料加入最愛欄
     */
    appendFav(name: string) {
      this.recipes.push(
        {
          name,
          ...this.newMaterial(this)
        }
      );
    },
    /**
     * 移除我的最愛資料
     */
    removeFav(idx: number) {
      this.recipes.splice(idx, 1);
    },
  }
});
export default useProcessingStore;

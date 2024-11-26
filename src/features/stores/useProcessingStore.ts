import { defineStore } from 'pinia';
// Store and utils
import useCharacterStore from './useCharacterStore';
import {
  round, deepCopy, removeItemByAttr, getLastItem, sumAlongAttr
} from 'utils/helpers';
import { storage } from 'utils/localstorage_';
import {
  calcProductInfo, processingHourlyInfo, calcGoods, hourlyCraftsFromRaw,
  getBasicInfo,
} from 'utils/bdo';
import { processingExample } from 'utils/examples';
// Types
import type {
  ReqProcessingInfo, FavProcessingInfo, tier2HourlyStats, ProcessingInfo, Product,
  ReqProductInfo, State
} from 'types/processingType';
import type { ProcessingExampleKey } from 'utils/examples';
import type { Goods, HourlyStats, ReqGoods } from 'types/commonType';


const { empty, wood, alloy } = processingExample;


const newMaterial = (
  profitMargin: number,
  craft: number,
  reqInfo: ReqProcessingInfo,
): ProcessingInfo => {;
  const { raw, tier1, tier2 } = reqInfo;
  const raws = raw.map((obj) => calcGoods(profitMargin, obj));
  const tier1s = calcProductInfo(profitMargin, craft, raw, tier1);
  return {
    raw: raws,
    tier1: tier1s,
    tier2: calcProductInfo(
      profitMargin, craft, raw.concat(tier1s), tier2
    )
  };
};

function getGoods(recipe: ReqProcessingInfo, tier: 0 | 1 | 2): ReqGoods[] | ReqProductInfo[];
function getGoods(recipe: ProcessingInfo, tier: 0 | 1 | 2): Goods[] | Product[];
function getGoods<
  T extends Omit<ReqProcessingInfo, 'name'> | ProcessingInfo
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

function getStorageData(key?: 'current'): ReqProcessingInfo
function getStorageData(key: 'fav'): FavProcessingInfo[]
function getStorageData(key: 'current' | 'fav' = 'current') {
  if (key === 'fav')
    return storage.getItem<FavProcessingInfo[]>(
      STORAGE_KEY.fav, [
        wood, alloy,
      ]);
  return storage.getItem<ReqProcessingInfo>(STORAGE_KEY.current, wood);
};

const useProcessingStore = defineStore('Processing', {
  state: () => {
    const { profitMargin, avgCraft } = useCharacterStore();

    // 取得初始值
    const current: ProcessingInfo = newMaterial(profitMargin, avgCraft, getStorageData());

    const recipes: State['recipes'] = getStorageData('fav')
      .map(obj => Object.assign(
        { name: obj.name },
        newMaterial(profitMargin, avgCraft, obj)
      ));

    const initialState: State = {
      ...current,
      recipes
    };
    return initialState;
  },
  actions: {
    newMaterial(
      reqInfo : ReqProcessingInfo
    ) {
      const {profitMargin, crafts} = useCharacterStore();
      return newMaterial(profitMargin, crafts, reqInfo);
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
      const material = (idx === -1 ? this.$state : this.recipes[idx]) satisfies ProcessingInfo;
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
      storage.setItem(STORAGE_KEY.current, current);
      const fav = this.recipes.map(favObj => getBasicInfo(favObj));
      storage.setItem(STORAGE_KEY.fav, fav);
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

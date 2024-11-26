import { deepCopy, round, sumAlongAttr } from './helpers';
// Types
import type{
  ReqProcessingInfo, FavProcessingInfo, ProcessingInfo, Product, ReqProductInfo
} from '@/features/types/processingType';
import type { Character } from '@/features/types/characterType';
import type { Goods, HourlyStats, ReqGoods } from '@/features/types/commonType';

// 角色
/**
 * 計算實際領取額
 * @param bonusValue 額外領取額(%)
 */
export const calcProfitMargin = (
  { valuePack, bonusValue }: Character,
) => {
  const bonus = (valuePack ? 30 : 0) + bonusValue;
  return round(0.65 * (1 + bonus / 100), 5);
};

/**
 * 加工成功率(%)，介於0.7~1。
 */
export const calcSuccessRate = (
  { extraSuccessRate }: Character
): number => {
  return Math.min(1, 0.7 * (1 + extraSuccessRate / 100));
};


// 商品
/**
 * 計算總利潤
 * @param goods
 * @returns
 */
export const totalProfit = (
  goods: Goods[]
): number => {
  return sumAlongAttr(goods, (obj) => obj.num * obj.unitProfit);
};

// 生產資訊估計相關
export const calcGoods = <T extends ReqGoods>(
  profitMargin: number,
  goods: T,
): T & Pick<Goods, 'unitProfit'> => {
  return {
    ...goods,
    unitProfit: profitMargin * goods.price
  };
};


// 加工
const getReqProductInfo = <T extends ReqProductInfo[]>(product: T): ReqProductInfo[] => (
  product.map((obj) => ({
    name: obj.name,
    raw: obj.raw.map(r => ({ ...r })),
    price: obj.price,
    mpTime: obj.mpTime,
    avgyield: obj.avgyield,
  }))
);
/**
 * Get basic info for setting to storage.
 * @param material
 * @returns
 */
export const getBasicInfo = (
  material: FavProcessingInfo | ProcessingInfo
): Omit<ReqProcessingInfo, 'name'> & Partial<ReqProcessingInfo> => {
  // 表單上無名稱。我的最愛有名稱
  return {
    ...(material.name && { name: material.name }),
    raw: material.raw.map((obj) => ({
      name: obj.name,
      price: obj.price,
      cost: obj.cost,
      num: obj.num,
    })),
    tier1: getReqProductInfo(material.tier1),
    tier2: getReqProductInfo(material.tier2)
  };
};

export const calcProductInfo = (
  profitMargin: number,
  craft: number,
  rawInfo: Omit<Goods, 'unitProfit'>[],
  productInfo: ReqProductInfo[]
): Product[] => {
  productInfo = deepCopy(productInfo);
  return productInfo.map<Product>((prodObj) => {
    // 大量加工次數，取最先消耗完的原料估計
    let minProcessingTimes = Infinity;
    let cost = 0; // 加工一次成本
    prodObj.raw.forEach(({ name, consumption }) => {
      const rawObjIdx = rawInfo.findIndex((rawObj) => rawObj.name === name);
      if (rawObjIdx === -1) return;
      minProcessingTimes = Math.min(
        minProcessingTimes,
        rawInfo[rawObjIdx].num / (consumption * craft)
      );
      cost += rawInfo[rawObjIdx].cost * consumption;
    });
    if (minProcessingTimes === Infinity) minProcessingTimes = 0;
    cost /= prodObj.avgyield;
    return {
      ...prodObj,
      cost: cost,
      num: minProcessingTimes * craft * prodObj.avgyield,
      timeCost: minProcessingTimes * prodObj.mpTime / 60,
      unitProfit: profitMargin * prodObj.price
    };
  });
};

/**
 * 每小時生產資訊估計
 */
export const processingHourlyInfo = (
  craftPerMP: number,
  propductInfo: Product[],
): HourlyStats[] => {
  // 原料到大量加工一次tier2總共時間
  return propductInfo.map((prodObj) => {
    // 每小時加工份數
    const hourlyCrafts = prodObj.raw.length ? (
      // 每小時大量加工次數 * 單次大量加工份數
      (3600 / prodObj.mpTime) * craftPerMP
    ) : 0;
    const hourlyYield = hourlyCrafts * prodObj.avgyield;
    return {
      crafts: hourlyCrafts,
      yield: hourlyYield,
      profit: hourlyYield * prodObj.unitProfit,
      cost: hourlyCrafts * prodObj.cost,
    };
  });
};

/**
 * 每小時由原料加工到二階產物的數量
 * @param avgCrafts 平均單次大量加工份數
 * @param tier1Info 一階產物資訊
 * @param tier2Info 二階產物資訊
 */
export const hourlyCraftsFromRaw = (
  avgCrafts: number,
  tier1Info: ReqProductInfo[],
  tier2Info: ReqProductInfo[],
): number[] => {
  // 原料到大量加工一次tier2總共時間(秒)
  const rawToTier2TimeCost = tier2Info.map((tier2Obj) => {
    // 每種tier1生產時間總和(秒)
    let tier1TimeCost = 0;
    tier2Obj.raw.forEach(({ name, consumption }) => {
      const tier1Obj = tier1Info.find((tier1) => tier1.name === name);
      if (!tier1Obj) return;
      // 加工tier1的n次，可產出加工一次tier2的材料消耗量。
      const nTier1Times = consumption / tier1Obj.avgyield;
      tier1TimeCost += nTier1Times * tier1Obj.mpTime;
    });
    return tier1TimeCost + tier2Obj.mpTime;
  });
  return rawToTier2TimeCost.map((timeCost) => {
    return (3600 / timeCost) * avgCrafts;
  });
};

// 煉金/料理
/**
 * 計算每次製作的平均產量
 * @param range 產量範圍，[最小值, 最大值]。
 * @param extractMaxRate 最大值額外機率(%)。
 */
export const calcAvgYield = (
  range: [number, number],
  extractMaxRate: number = 0
) => {
  const counts = range[1] - range[0] + 1;
  return ((range[0] + range[1]) + counts * extractMaxRate / 100) / 2;
};

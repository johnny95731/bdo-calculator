import { Goods, HourlyStats, ReqGoods } from 'types/commonType.ts';

/**
 * 產品基礎數值
 */
export type ReqProductInfo = Pick<Goods, 'price' | 'name'> & {
    /**
     * 加工原料
     */
    raw: Array<{
      /**
       * 原料名稱
       */
      name: string,
      /**
       * 單次加工消耗的原料量。
       */
      consumption: number
    }>,
    /**
     * 一次大量加工(mass processing)時間(秒)，通常介於60秒~90秒，取決於材料。
     */
    mpTime: number,
    /**
     * 單次加工產生的產物量(平均值)。
     */
    avgyield: number,
  }

export type Product = Goods & ReqProductInfo & {
  /**
   * 加工完所有原料花費時間(分鐘)
   */
  timeCost: number,
}

/**
 * 每小時估計
 */
export type tier2HourlyStats = HourlyStats & {
  /**
   * 每小時由原料加工到2階的加工次數
   */
  craftsFromRaw: number;
  /**
   * 每小時由原料加工到2階的數量
   */
  yieldFromRaw: number;
  /**
   * 每小時由原料加工到2階的利潤
   */
  profitFromRaw: number;
  /**
   * 每小時由原料加工到2階的成本
   */
  costFromRaw: number;
}

/**
 * 原料到二次加工產物的基礎數值。
 */
export type ProcessingRecipe = {
  /**
   * 未加工原料
   */
  raw: Goods[],
  /**
   * 一次加工
   */
  tier1: Product[],
  /**
   * 二次加工
   */
  tier2: Product[],
}

/**
 * 我的最愛在資料庫的儲存格式
 */
export type FavBasicInfo = {
  /**
   * 儲存我的最愛名稱
   */
  name: string,
  raw: ReqGoods[],
  tier1: ReqProductInfo[],
  tier2: ReqProductInfo[],
}
/**
 * 我的最愛材料
 */
export type FavMaterial = ProcessingRecipe & {
  /**
   * 我的最愛名稱
   */
  name: string,
}

export type State = ProcessingRecipe & {
  recipes: FavMaterial[],
}
import type { Goods, HourlyStats } from './commonType';

/**
 * 煉金原料
 */
export type Raw = Goods & {
  /**
   * 製作一次消耗量
   */
  consumption: number,
}

/**
 * 煉金原料設定值
 */
export type ReqRawInfo = Omit<Raw, 'unitProfit'>


export type ReqAlchemyRecipeInfo = Pick<Goods, 'name' | 'price'> & {
  /**
   * 原料，最多五個。
   */
  raw: ReqRawInfo[],
  /**
   * 產量，[最小值，最大值]。一般秘藥為1~4，部分配方，如
   */
  yieldRange: [number, number],
  /**
   * 稀有產物
   */
  rareProd?: Pick<Goods, 'price'> & {
    /**
     * 稀有產物比例(與等級無關)
     */
    rate: number,
  },
}

/**
 * 鍊金配方
 */
export type AlchemyRecipe = Omit<Goods, 'unitProfit'> & ReqAlchemyRecipeInfo & {
  /**
   * 原料，最多五個。
   */
  raw: Raw[],
  /**
   * 製作完所有原料花費時間(分鐘)
   */
  timeCost: number,
  /**
   * 製作次數
   */
  crafts: number,
  /**
   * 每次製作平均產量
   */
  avgYield: number,
  /**
   * 稀有產物
   */
  rareProd?: Pick<Goods, 'num'> & ReqAlchemyRecipeInfo['rareProd']
}

export type AlchemyHourlyStats = Omit<HourlyStats, 'crafts'> & {
  /**
   * 稀有產物
   */
  rareProd?: Omit<HourlyStats, 'crafts' | 'cost'>,
}

// /**
//  * 藍色等級秘藥製作
//  */
// export type BlueElixir = Raw & {
//   /**
//    * 一次10倍製作(使用伊培拉的淨水)
//    */
//   use10x: boolean,
// }

export type State = {
  /**
   * 煉金現在的表單
   */
  current: AlchemyRecipe,
  /**
   * 煉金配方
   */
  recipes: AlchemyRecipe[],
  // /**
  //  * 簡易煉金現在的表單
  //  */
  // currentSimple: BlueElixir,
  // /**
  //  * 簡易煉金
  //  */
  // simpleAlchemy: BlueElixir[]
}

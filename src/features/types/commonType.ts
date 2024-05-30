/**
 * 商品資訊
 */
export type Goods = {
  /**
   * 物品名稱
   */
  name: string,
  /**
   * 一單位出售價格。
   */
  price: number,
  /**
   * 成本，即購買或製造一單位價格，產物為計算平均製造成本。
   */
  cost: number,
  /**
   * 擁有數量，包含擁有以及加工產出。
   */
  num: number,
  /**
   * 出售一單位後實際所得，未扣成本，由其他數值計算。
   */
  unitProfit: number,
}

export type ReqGoods = Omit<Goods, 'unitProfit'>

/**
 * 每小時估計
 */
export type HourlyStats = {
  /**
   * 大量加工份數、料理/煉金製作的次數。
   */
  crafts: number,
  /**
   * 產量
   */
  yield: number,
  /**
   * 售出後領取額
   */
  profit: number,
  /**
   * 成本
   */
  cost: number
}

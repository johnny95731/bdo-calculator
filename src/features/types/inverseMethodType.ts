
/**
 * 估計一般加工原料需求量
 */
export type ProcessingEsti = {
  /**
   * 二階產物
   */
  tier2: {
    /**
     * 需求量
     */
    demand: number,
    /**
     * 單次加工產量
     */
    avgyield: number,
    /**
     * 單次加工消耗原料量
     */
    consumption: number,
  },
  /**
   * 一階產物
   */
  tier1: {
    /**
     * 單次加工產量
     */
    avgyield: number,
    /**
     * 單次加工消耗原料量
     */
    consumption: number,
  }
}

/**
 * 估計煉金原料需求量
 */
export type AlchemyEsti = {
  /**
   * 需求量
   */
  demand: {
    regular: number,
    rare: number,
  },
  hasRare: boolean,
  /**
   * 稀有產物比例
   */
  rareRate: number,
  /**
   * 全製作為稀有產物
   */
  toRare: boolean,
  /**
   * 原料消耗量
   */
  raw: number[]
}

export type State = {
  processing: ProcessingEsti,
  alchemy: AlchemyEsti,
}

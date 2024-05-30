/**
 * 角色相關數值，包括實際領取額、大量加工份數、加工成功率、料理/煉金製作時間、最大製作數量額外加成等。
 */
export type Character = {
  /**
   * 是否使用價值禮包
   */
  valuePack: boolean,
  /**
   * 價值禮包外的交易所額外領取額(%)，包括家門聲望(0%~1.5%)、巨商之戒(5%)等。
   */
  bonusValue: number,
  /**
   * 單次大量加工份數。
   */
  crafts: number,
  /**
   * 額外加工成功率(%)。
   * 加工成功率(%) = min(基礎成功率(70%) * (1 + 額外成功率(%)), 100%)
   * 因此額外成功率43%時，即為100%成功。
   */
  extraSuccessRate: number,
  /**
   * 煉金數值
   */
  alchemy: {
    /**
     * 料理/煉金製作一次時間(秒)，介於1~10(秒)
     */
    time: number,
    /**
     * 最大數量製作額外機率。
     */
    extractMaxRate: number,
  }
  /**
   * 料理數值
   */
  cooking: {
    /**
     * 料理/煉金製作一次時間(秒)，介於1~10(秒)
     */
    time: number,
    /**
     * 最大數量製作額外機率。
     */
    extractMaxRate: number,
    /**
     * 高級料理額外機率
     */
    extractProcRate: number,
  }
}

export type CharacterAttr = keyof Omit<Character, 'alchemy' | 'cooking'> | `alchemy.${keyof Character['alchemy']}`
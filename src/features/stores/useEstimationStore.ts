import { defineStore } from 'pinia';

import useCharacterStore from './useCharacterStore';
import type { State } from 'types/inverseMethodType';

const initialState: State = {
  processing: {
    tier2: {
      demand: 10000,
      avgyield: 2.5,
      consumption: 10
    },
    tier1: {
      avgyield: 2.5,
      consumption: 5
    },
  },
  alchemy: {
    demand: {
      regular: 10000,
      rare: 300,
    },
    hasRare: true,
    rareRate: 0.3,
    /**
     * 全製作為稀有產物
     */
    toRare: false,
    /**
     * 原料消耗量
     */
    raw: [1, 2, 3, 4, 5]
  }
};

const useEstimationStore = defineStore('Estimation', {
  state: () => initialState,
  getters: {
    processingT1Req(): number {
      const { tier2 } = this.processing;
      return (tier2.demand / tier2.avgyield) * tier2.consumption;
    },
    processingT0Req(): number {
      const { tier1 } = this.processing;
      return (this.processingT1Req / tier1.avgyield) * tier1.consumption;
    },
    /**
     * 需製作的次數
     */
    alchemyCrafts(): number {
      const { alchemyAvgYields } = useCharacterStore();
      const alchemy = this.alchemy;
      return Math.ceil(
        alchemy.hasRare && alchemy.toRare ?
          // 全製作為稀有產物
          // crafts * alchemy.rareRate + crafts * alchemyAvgYields / 3 = alchemy.demand.rare
          alchemy.demand.rare / (alchemy.rareRate + alchemyAvgYields / 3) :
          // 滿足一般產物及稀有產物需求
          Math.max(
            alchemy.hasRare ? alchemy.demand.rare / alchemy.rareRate : 0,
            alchemy.demand.regular / alchemyAvgYields
          )
      );
    },
    alchemyReqRaw(): number[] {
      const crafts = this.alchemyCrafts;
      return this.alchemy.raw.map(consumption => crafts * consumption);
    }
  }
});
export default useEstimationStore;

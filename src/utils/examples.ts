import type { ReqAlchemyRecipeInfo } from '@/features/types/alchemyType';
import type { FavProcessingInfo } from '@/features/types/processingType';


// 加工
const emptyMaterial: FavProcessingInfo = {
  name: '空白',
  raw: [
    { name: '基本材料', price: 1000, cost: 0, num: 10000 },
  ],
  tier1: [
    {
      name: '一階產物',
      raw: [{ name: '基本材料', consumption:5 }],
      price: 5000,
      mpTime: 75,
      avgyield: 2.5
    },
  ],
  tier2: [
    {
      name: '二階產物',
      raw: [{ name: '一階產物', consumption: 10 }],
      price: 20000,
      mpTime: 75,
      avgyield: 2.5
    },
  ]
};

const ashPlywood: FavProcessingInfo = {
  name: '白蠟樹合板',
  raw: [
    { name: '白蠟樹原木', price: 1400, cost: 0, num: 10000 },
  ],
  tier1: [
    {
      name: '白蠟樹木板',
      raw: [{
        name: '白蠟樹原木',
        consumption: 5,
      }],
      price: 6500,
      mpTime: 60,
      avgyield: 2.5
    },
  ],
  tier2: [
    {
      name: '白蠟樹合板',
      raw: [{
        name: '白蠟樹木板',
        consumption: 10,
      }],
      price: 35000,
      mpTime: 60,
      avgyield: 2.5
    },
  ],
};

const brassIngot: FavProcessingInfo = {
  name: '黃銅鑄塊',
  raw: [
    { name: '銅礦石', price: 1120, cost: 1120, num: 10000 },
    { name: '鋅礦石', price: 2250, cost: 2250, num: 10000 },
  ],
  tier1: [
    {
      name: '熔化的銅塊',
      raw: [{
        name: '銅礦石',
        consumption: 5,
      }],
      price: 7000,
      mpTime: 90,
      avgyield: 2.5
    },
    {
      name: '熔化的鋅塊',
      raw: [{
        name: '鋅礦石',
        consumption: 5,
      }],
      price: 19200,
      mpTime: 60,
      avgyield: 2.5
    },
  ],
  tier2: [
    {
      name: '黃銅鑄塊',
      raw: [
        {
          name: '熔化的銅塊',
          consumption: 5,
        },
        {
          name: '熔化的鋅塊',
          consumption: 5,
        },
      ],
      price: 56000,
      mpTime: 60,
      avgyield: 2.5
    },
  ],
};
export const processingExample = {
  empty: emptyMaterial,
  wood: ashPlywood,
  alloy: brassIngot,
} as const;
export type ProcessingExampleKey = keyof typeof processingExample;


// 煉金
const purePowderReagent: ReqAlchemyRecipeInfo = {
  name: '純粹的粉試藥',
  price: 7050,
  yieldRange: [1, 4],
  raw: [
    {
      name: '砂糖',
      price: 2,
      cost: 20,
      num: 1000,
      consumption: 1
    },
    {
      name: '銀光色杜鵑花',
      price: 444,
      cost: 575,
      num: 1000,
      consumption: 1
    },
    {
      name: '純水',
      price: 5300,
      cost: 4800,
      num: 1000,
      consumption: 1
    },
    {
      name: '野生草',
      price: 7500,
      cost: 7500,
      num: 1000,
      consumption: 1
    },
  ],
} as const;

const elixirOfLife: ReqAlchemyRecipeInfo = {
  name: '生命力的秘藥',
  price: 35000,
  yieldRange: [1, 4],
  rareProd: {
    rate: 0.3,
    price: 255000,
  },
  raw: [
    {
      name: '純粹的粉試藥',
      price: 7050,
      cost: 7050,
      num: 1000,
      consumption: 1
    },
    {
      name: '銀光色杜鵑花',
      price: 444,
      cost: 575,
      num: 3000,
      consumption: 3
    },
    {
      name: '狐狸血',
      price: 28000,
      cost: 0,
      num: 5000,
      consumption: 5
    },
    {
      name: '生命力恢復劑(小型)',
      price: 24,
      cost: 30,
      num: 3000,
      consumption: 3
    },
  ],
} as const;

export const alchemyExample = {
  reagent: purePowderReagent,
  elixir: elixirOfLife,
} as const;
export type AlchemyExampleKey = keyof typeof alchemyExample;

<script setup lang="ts">
import { computed } from 'vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import DataTable from '@/components/DataTable.vue';
import useAlchemyStore from '~/features/stores/useAlchemyStore';
import useCharacterStore from '~/features/stores/useCharacterStore';
import { numFormat, round } from '@/utils/helpers';

type Props = {
  idx: number
}
const props = defineProps<Props>();

const characterState = useCharacterStore();
const alchemyState = useAlchemyStore();

const recipe = computed(() =>
  props.idx === -1 ?
    alchemyState.current :
    alchemyState.recipes[props.idx]
);

const profits = computed(() => alchemyState.allIncomes(props.idx));
const cost = computed(() => alchemyState.cost(props.idx));
const hourly = computed(() => alchemyState.hourly(props.idx));

const basicStats = computed(() => {
  return [
    {
      title: '總計',
      items: [
        {
          label: '利潤',
          value: round(profits.value.total - cost.value, 0),
        },
        {
          label: '收入',
          value: round(profits.value.total, 0),
        },
        {
          label: '成本',
          value: round(cost.value, 0)
        },
        {
          label: '製作次數',
          value: `${numFormat(recipe.value.crafts, 0)} 次`
        },
        {
          label: '時間',
          value: `${round(recipe.value.timeCost)} 分鐘`,
        },
        {
          label: '原料售出',
          value: round(profits.value.raw, 0),
        },
      ]
    },
    {
      title: '一般產物',
      items: [
        {
          label: '收入',
          value: round(profits.value.regular, 0)
        },
        {
          label: '產量',
          value: round(recipe.value.num, 0)
        }
      ]
    },
    recipe.value.rareProd ? {
      title: '稀有產物',
      items: [
        {
          label: '收入',
          value: round(profits.value.rare, 0)
        },
        {
          label: '產量',
          value: round(recipe.value.rareProd.num, 2)
        },
      ]
    } : undefined
  ];
});

const hourlyStats = computed(() => {
  const hr = hourly.value; // for short
  return [
    {
      title: '每小時總計',
      items: [
        {
          label: '利潤',
          value: round(hr.profit + (hr.rareProd?.profit ?? 0) - hr.cost, 0),
        },
        {
          label: '收入',
          value: round(hr.profit + (hr.rareProd?.profit ?? 0), 0),
        },
        {
          label: '成本',
          value: round(hr.cost, 0)
        },
        {
          label: '製作',
          value: `${round(characterState.alchemyHourlyCrafts, 0)} 次`
        },
      ]
    },
    {
      title: '一般產物',
      items: [
        {
          label: '收入',
          value: round(hr.profit, 0)
        },
        {
          label: '產量',
          value: round(hr.yield, 0)
        }
      ],
    },
    hr.rareProd ? {
      title: '稀有產物',
      items: [
        {
          label: '收入',
          value: round(hr.rareProd.profit, 0)
        },
        {
          label: '產量',
          value: round(hr.rareProd.yield, 0)
        },
      ]
    } : undefined
  ];
});
// 加工為稀有產物(若存在)
const procToRare = computed(() => {
  if (!recipe.value.rareProd || !hourly.value.rareProd) return;
  // basic
  const procToRare = alchemyState.procToRare(recipe.value.num);
  const totalTimeCost = (recipe.value.timeCost + procToRare.timeCost) / 60;
  const yield_ = recipe.value.rareProd.num + procToRare.yield;
  const income = characterState.profit(yield_ * recipe.value.rareProd.price);
  const cost_ = cost.value + procToRare.cost;
  const profit = income - cost_;
  return [
    {
      title: '加工為稀有產物',
      items: [
        {
          label: '利潤',
          value: round(profit, 0)
        },
        {
          label: '收入',
          value: round(income, 0)
        },
        {
          label: '成本',
          value: round(cost_, 0)
        },
        {
          label: '加工成本',
          value: round(procToRare.cost, 0)
        },
        {
          label: '產量',
          value: round(yield_, 0)
        },
        {
          label: '時間',
          value: `${round(alchemyState.current.timeCost + procToRare.timeCost, 1)} 分鐘`
        },
        {
          label: '加工時間',
          value: `${round(procToRare.timeCost, 1)} 分鐘`
        },
      ]
    },
    {
      title: '每小時',
      items: [
        {
          label: '利潤',
          value: round(profit / totalTimeCost, 0)
        },
        {
          label: '收入',
          value: round(income / totalTimeCost, 0)
        },
        {
          label: '成本',
          value: round(cost_ / totalTimeCost, 0)
        },
        {
          label: '產量',
          value: round(yield_ / totalTimeCost, 0)
        },
      ]
    }
  ];
});
</script>

<template>
  <template
    v-for="(state, i) in [basicStats, hourlyStats, procToRare]"
    :key="i"
  >
    <ExpansionPanel
      v-if="state"
      :title="state[0]?.title"
      btnClass="px-3 py-1 font-weight-bold"
      textClass="px-3 pb-3 rounded-b-xl bg-surface"
      rounded="xl"
      expand
    >
      <template
        v-for="(data, j) in state"
        :key="`${i}-${j}`"
      >
        <DataTable
          v-if="data"
          :class="[
            'px-4 py-0',
            j ? 'my-1' : 'mt-n1 mb-1'
          ]"
          :title="data.title"
          :titleClass="j ? 'ms-n4' : 'd-none'"
          :data="data.items"
        />
      </template>
    </ExpansionPanel>
  </template>
</template>

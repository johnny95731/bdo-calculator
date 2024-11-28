<script setup lang="ts">
import { computed } from 'vue';
import ExpansionPanel from '../ExpansionPanel.vue';
import DataTable from '../DataTable.vue';
import useProcessingStore from '@/features/stores/useProcessingStore';
import type { tier2HourlyStats } from '@/features/types/processingType';
import { numFormat, sumAlongAttr } from '@/utils/helpers';

type Props = {
  idx: number
}
const props = defineProps<Props>();
const processingState = useProcessingStore();

// 表單上方總計資訊
// -預處理資訊
const cost = computed(() => processingState.cost(props.idx));
const timeCost = computed(() => {
  const [tier1, tier2] = processingState.timeCost(props.idx);
  return [
    tier1, tier2, tier1 + tier2
  ];
});
const tier1HourlyInfo = computed(() => {
  return processingState.hourly(props.idx, 1);
});
const tier2HourlyInfo = computed(() => {
  return processingState.hourly(props.idx, 2) as Required<tier2HourlyStats>[];
});
// -統計資料
const totalStats = computed(() => {
  const profit = processingState.allIncomes(props.idx);
  return [
    {
      title: '總計',
      items: [
        {
          label: '利潤',
          value: profit.tier2 - cost.value,
        },
        {
          label: '時間',
          value: `${numFormat(timeCost.value[2], 2)}分鐘`,
        },
      ]
    },
    {
      title: '一階加工',
      items: [
        {
          label: '利潤',
          value: profit.tier1,
        },
        {
          label: '時間',
          value: `${numFormat(timeCost.value[0], 2)}分鐘`,
        },
      ]
    },
    {
      title: '基本原料',
      items: [
        {
          label: '利潤',
          value: profit.raw - cost.value,
        },
        {
          label: '成本',
          value: cost.value,
        },
      ]
    },
  ];
});

const hourlyStats = computed(() => {
  const keys = ['profit', 'yield', 'cost', 'crafts'] as const;
  // @ts-expect-error
  const data: Record<typeof keys[number], number[]> = {};
  keys.forEach((key) => {
    data[key] = [
      sumAlongAttr(tier1HourlyInfo.value, key),
      sumAlongAttr(tier2HourlyInfo.value, key),
      sumAlongAttr(tier2HourlyInfo.value, `${key}FromRaw`),
    ];
  });
  const { profit, cost, crafts } = data;
  return [
    {
      title: '總計',
      items: [
        {
          label: '利潤',
          value: profit[2] - cost[2]
        },
        {
          label: '次數',
          value: crafts[2]
        },
        {
          label: '成本',
          value: cost[2]
        },
      ]
    },
    {
      title: '一階到二階',
      items: [
        {
          label: '利潤',
          value: profit[1] - cost[1]
        },
        {
          label: '成本',
          value: cost[1]
        },
      ]
    },
    {
      title: '一階加工',
      items: [
        {
          label: '利潤',
          value: profit[0] - cost[0]
        },
        {
          label: '成本',
          value: cost[0]
        },
      ]
    },
  ];
});
</script>

<template>
  <ExpansionPanel
    title="總計"
    btnClass="px-3 py-1 font-weight-bold"
    textClass="px-3 pb-3 rounded-b-xl bg-surface"
    rounded="xl"
    expand
  >
    <DataTable
      v-for="(data, i) in totalStats"
      :key="i"
      :class="[
        'px-4 py-0',
        i ? 'my-1' : 'mt-n1 mb-1'
      ]"
      :title="data.title"
      :titleClass="i ? 'ms-n4' : 'd-none'"
      :data="data.items"
    />
  </ExpansionPanel>
  <ExpansionPanel
    title="每小時"
    btnClass="px-3 py-1 font-weight-bold"
    textClass="px-3 pb-3 rounded-b-xl bg-surface"
    rounded="xl"
    expand
  >
    <DataTable
      v-for="(data, i) in hourlyStats"
      :key="i"
      :class="[
        'px-4 py-0',
        i ? 'my-1' : 'mt-n1 mb-1'
      ]"
      :title="data.title"
      :titleClass="i ? 'ms-n4' : 'd-none'"
      :data="data.items"
    />
  </ExpansionPanel>
</template>

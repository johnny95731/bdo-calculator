<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import DataBlock from '../DataBlock.vue';
import ItemName from '@/components/ItemName.vue';
import ExpansionPanel from '../ExpansionPanel.vue';
import useProcessingStore from 'stores/useProcessingStore';
import { numFormat, round } from '@/utils/helpers';
import { getIcon } from '@/utils/icons';
import type { tier2HourlyStats, Product } from '@/features/types/processingType';
import type { HourlyStats } from '@/features/types/commonType';

type chip = {
  title: string,
  value: number,
  unit?: string,
}

const [DefChips, ReuseChips] = createReusableTemplate<{
  label: string,
  tooltip: string,
  chips: chip[]
}>();

type Props = {
  idx: number;
  product: Product;
  lowTierNames: string[];
  selectedRaws: string[];
} & (
  {
    tier: 1;
    hourlyInfo: HourlyStats;
  } |
  {
    tier: 2;
    hourlyInfo: tier2HourlyStats;
  }
)
const props = defineProps<Props>();
const processingState = useProcessingStore();

const data = computed(() => {
  const { num, unitProfit, cost, timeCost } = props.product;
  const total = [
    {
      title: '利潤',
      value: round(num * (unitProfit - cost)),
    },
    {
      title: '成本',
      value: round(cost),
      unit: '/個'
    },
    {
      title: '產量',
      value: num,
    },
    {
      title: '',
      value: timeCost,
      unit: '分鐘'
    },
  ];
  const hourly = [
    ...(
      props.tier === 2 ? [
        {
          title: '產值(從原料)',
          value: props.hourlyInfo.profitFromRaw - props.hourlyInfo.costFromRaw,
        },
        {
          title: '產量(從原料)',
          value: props.hourlyInfo.yieldFromRaw,
        },
      ] : []
    ),
    {
      title: '產值',
      value: props.hourlyInfo.profit,
    },
    {
      title: '產量',
      value: props.hourlyInfo.yield,
    },
    {
      title: '加工',
      value: props.hourlyInfo.crafts,
      unit: '份'
    },
  ];
  return [
    total,
    hourly,
  ];
});

const rawNames = computed(() => props.product.raw.map(obj => obj.name)); // 被選取的原料
const selectableRaws = ref<string[]>([]); // 可選取的原料 (在其他產物沒被選取)
const selectedIndex = ref<boolean[]>([]); // `被選取的原料`在`可選取的原料`的index
const updateSelectRefs = () => {
  selectedIndex.value = [];
  selectableRaws.value = props.lowTierNames.filter((name) => {
    const inRawNames = rawNames.value.includes(name);
    // 可以選取 <=> 未被選取 或 被這個產物選取
    if (!props.selectedRaws.includes(name) || inRawNames) {
      selectedIndex.value.push(inRawNames);
      return true;
    } else return false; 
  });
  // 另一個算法
  // const selectedByOtherProducts: string[] = (
  //   props.selectedRaws.filter((name) => !rawNames.value.includes(name))
  // );
  // selectableRaws.value = (
  //   props.lowTierNames.filter(
  //     (name) => !selectedByOtherProducts.includes(name)
  //   )
  // );
  // selectedIndex.value = (
  //   selectableRaws.value.map((name) => rawNames.value.includes(name))
  // );
};
updateSelectRefs();
watch(() => [rawNames.value, props.selectedRaws, props.lowTierNames], () => {
  updateSelectRefs();
}, {
  deep: true
});

</script>

<template>
  <DefChips v-slot="{label, tooltip, chips}">
    <v-sheet
      class="d-flex align-center px-2 py-1 ga-2 text-caption"
    >
      <span
        :style="{
          'width': '3.1em',
          'text-align-last': 'justify'
        }"
      >{{ label }}
        <v-tooltip
          activator="parent"
          :text="tooltip"
        />
      </span>
      <v-chip
        v-for="{title, value, unit} in chips"
        :key="title"
        v-memo="[value]"
        size="small"
        variant="outlined"
        density="compact"
      >
        {{
          `${title} ${typeof value === 'number' ? numFormat(value) : value}${unit ? unit : ''}`
        }}
      </v-chip>
    </v-sheet>
  </DefChips>

  <v-sheet
    class="my-3 ps-3 pe-1 pt-4 pb-4 ga-2"
    rounded="xl"
  >
    <ReuseChips
      label="產出"
      tooltip="從原料數量估計"
      :chips="data[0]"
    />
    <ReuseChips
      label="每小時"
      tooltip="從平均產出及大量加工時間估計。"
      :chips="data[1]"
    />
    <v-sheet 
      class="d-flex align-end px-2 py-1 ga-3"
    >
      <ItemName 
        class="name-input"
        density="compact"
        :model-value="product.name"
        @change="processingState.updateName(tier, props.idx, $event || '')"
      />
      <v-select
        class="flex-1-1"
        bg-color="surface"
        multiple
        rounded="lg"
        density="compact"
        label="原料"
        :items="selectableRaws"
        :model-value="rawNames"
      >
        <template #item="{ index, item, props: itemProps }">
          <v-list-item
            v-bind="itemProps"
            title=""
            variant="flat"
          >
            <v-checkbox
              :label="itemProps.title as string"
              density="compact"
              :modelValue="selectedIndex[index]"
              @update:modelValue="
                processingState.updateRawOfProduct(
                  props.tier, props.idx, !selectedIndex[index] as boolean, item.value
                )
              "
            />
          </v-list-item>
        </template>
        <template #selection="{ item, index }">
          <v-chip
            v-if="index < 1"
            density="compact"
            size="small"
          >
            {{ item.title }}
          </v-chip>
          <span
            v-if="index === 1"
            class="text-caption"
          >
            (+{{ props.product.raw.length - 1 }} others)
          </span>
        </template>
      </v-select>
      <v-text-field
        label="平均成品數量"
        class="product-input"
        type="number"
        inputmode="decimal"
        step="0.1"
        min="0"
        density="compact"
        :model-value="product.avgyield"
        @update:model-value="
          processingState.updateProduct('avgyield', props.tier, props.idx, $event)
        "
      />
      <v-text-field
        label="售出價"
        :class="`product-input`"
        type="number"
        inputmode="decimal"
        min="0"
        density="compact"
        :model-value="product.price"
        @update:model-value="
          processingState.updateProduct('price', props.tier, props.idx, $event)
        "
      >
        <v-tooltip
          activator="parent"
          location="top"
        >
          <DataBlock
            title="實際領取"
            :value="product.unitProfit"
          />
        </v-tooltip>
      </v-text-field>
      <v-text-field
        label="大量加工時間"
        class="product-input"
        type="number"
        inputmode="decimal"
        min="60"
        max="90"
        density="compact"
        :model-value="product.mpTime"
        @update:model-value="
          processingState.updateProduct('mpTime', props.tier, props.idx, $event)
        "
      />
      <v-icon
        v-once
        class="align-self-center"
        :icon="getIcon('close')"
        @click="processingState.removeGoods(props.tier, idx)"
      />
    </v-sheet>
    <ExpansionPanel
      class="mt-2"
      btnClass="px-2 py-1 text-caption font-weight-bold"
      text-class="ps-4 text-left"
      baseColor="transparent"
      rounded="lg"
      :title="`原料消耗量(預設為${ tier === 1 ? '5' : '10' })`"
      aria-label="原料消耗量"
    >
      <v-text-field
        v-for="({name, consumption}, i) in product.raw"
        :key="i"
        v-memo="[consumption]"
        class="d-inline-block mr-3 consumption"
        :label="name"
        type="number"
        inputmode="decimal"
        min="1"
        density="compact"
        :model-value="consumption"
        @update:model-value="
          processingState.updateProduct(
            'consumption', props.tier, props.idx, [i, $event]
          )
        "
      />
    </ExpansionPanel>
  </v-sheet>
</template>

<style lang="scss" src="./materialSetting.scss" />

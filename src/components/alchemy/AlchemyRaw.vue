<script setup lang="ts">
import ItemName from '@/components/ItemName.vue';
import CommonBtn from '@/components/CommonBtn.vue';
import DataBlock from '@/components/DataBlock.vue';
import useAlchemyStore from 'stores/useAlchemyStore';
import type { Raw } from '@/features/types/alchemyType';

type Props = {
  idx: number,
  raw: Raw,
}
defineProps<Props>();
const alchemyState = useAlchemyStore();
</script>

<template>
  <div
    class="d-flex my-3 ps-5 pe-3 pt-5 pb-4 ga-3 rounded-xl bg-surface"
  >
    <ItemName
      class="name-input"
      density="compact"
      :model-value="raw.name"
      @update:model-value="
        alchemyState.updateRaw(idx, 'name', $event ?? '')
      "
    />
    <v-text-field
      label="擁有數量"
      density="compact"
      type="number"
      inputmode="decimal"
      min="0"
      :model-value="raw.num"
      @update:model-value="
        alchemyState.updateRaw(idx, 'num', $event)
      "
    />
    <v-text-field
      label="消耗"
      density="compact"
      type="number"
      inputmode="decimal"
      min="0"
      :model-value="raw.consumption"
      @update:model-value="
        alchemyState.updateRaw(idx, 'consumption', $event)
      "
    />
    <v-text-field
      label="售出價"
      density="compact"
      type="number"
      inputmode="decimal"
      min="0"
      :model-value="raw.price"
      @update:model-value="
        alchemyState.updateRaw(idx, 'price', $event)
      "
    >
      <v-tooltip
        activator="parent"
        location="top"
      >
        <DataBlock
          title="實際領取"
          :value="raw.unitProfit"
        />
      </v-tooltip>
    </v-text-field>
    <v-text-field
      label="成本"
      density="compact"
      type="number"
      inputmode="decimal"
      min="0"
      :model-value="raw.cost"
      @update:model-value="
        alchemyState.updateRaw(idx, 'cost', $event)
      "
    />
    <CommonBtn
      type="close"
      @click="alchemyState.removeRaw(idx)"
    />
  </div>
</template>
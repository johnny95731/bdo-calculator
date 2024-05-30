<script lang="ts" setup>
import CommonBtn from '../CommonBtn.vue';
import DataBlock from '../DataBlock.vue';
import ItemName from '../ItemName.vue';
import useProcessingStore from 'stores/useProcessingStore';
import type { Goods } from 'types/commonType';

type Props = {
  idx: number
  raw: Goods
}
defineProps<Props>();
const processingState = useProcessingStore();
</script>

<template>
  <v-sheet
    class="d-flex align-center my-3 ps-5 pe-3 pt-5 pb-4 ga-2"
    rounded="xl"
  >
    <ItemName
      class="name-input"
      density="compact"
      :model-value="raw.name"
      @change="processingState.updateName(0, idx, $event || '')"
    />
    <v-text-field
      label="數量"
      density="compact"
      type="number"
      inputmode="decimal"
      min="0"
      :model-value="raw.num"
      @update:model-value="processingState.updateRaw('num', idx, $event)"
    />
    <v-text-field
      label="售出價"
      density="compact"
      type="number"
      inputmode="decimal"
      min="0"
      :model-value="raw.price"
      @update:model-value="processingState.updateRaw('price', idx, $event)"
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
      @update:model-value="processingState.updateRaw('cost', idx, $event)"
    />
    <CommonBtn
      type="close" 
      @click="processingState.removeGoods(0, idx)"
    />
  </v-sheet>
</template>

<style lang="scss" src="./materialSetting.scss" />

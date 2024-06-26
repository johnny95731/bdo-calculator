<script lang="ts" setup>
import { computed, defineAsyncComponent, reactive, ref, toRef, watch } from 'vue';
// Custom components
import DataBlock from '@/components/DataBlock.vue';
import RegionHeader from '@/components/RegionHeader.vue';
const TheDialog = defineAsyncComponent({
  loader: () => import('@/components/TheDialog.vue')
});
import CommonBtn from '@/components/CommonBtn.vue';
import TheRaw from '@/components/massProcessing/TheRaw.vue';
import TheProduct from '@/components/massProcessing/TheProduct.vue';
const MPFavs = defineAsyncComponent({
  loader: () => import('@/components/massProcessing/MPFavs.vue')
});
const MPResult = defineAsyncComponent({
  loader: () => import('@/components/massProcessing/MPResult.vue')
});
// Utils and stores
import useProcessingStore from 'stores/useProcessingStore';
import useEstimationStore from 'stores/useEstimationStore';
import { nextPage, prevPage } from '@/utils/helpers.ts';
import { processingExample } from '@/utils/examples';
// Keys
import type { tier2HourlyStats } from '@/features/types/processingType';

const windowItemClass = {
  panel: 'h-100 px-4 py-3',
};

// 頁面切換
type pageIndices = 1 | 2 | 3;
const INIT_PAGE: pageIndices = 1;
const page = ref<pageIndices>(INIT_PAGE);
const titles = ['基本材料', '一階加工', '二階加工'] as const;
const pageTitle = ref<typeof titles[number]>(titles[INIT_PAGE - 1]);
watch(page, (newVal) => {
  pageTitle.value = titles[newVal - 1];
});

const processingState = useProcessingStore();

// 處理未被選取之名稱
const names = computed(() => {
  const raws = processingState.raw.map((obj) => obj.name);
  return [
    raws,
    raws.concat(processingState.tier1.map((obj) => obj.name)),
  ];
});
const selectedRaws = computed<string[]>(() => {
  const selected: string[] = [];
  processingState.tier1.forEach((obj) => {
    selected.push(...obj.raw.map(obj => obj.name));
  });
  return selected;
});
const selectedRawNTier1 = computed<string[]>(() => {
  const selected: string[] = [];
  processingState.tier2.forEach((obj) => {
    selected.push(...obj.raw.map(obj => obj.name));
  });
  return selected.concat(selectedRaws.value);
});

// 傳給原料欄及產物欄的資訊
const tier1HourlyInfo = computed(() => {
  return processingState.hourly(-1, 1);
});
const tier2HourlyInfo = computed(() => {
  return processingState.hourly(-1, 2) as Required<tier2HourlyStats>[];
});

// const btnActionState = reactive<{
//   show: boolean,
//   isSaving: boolean,
//   data?: ProcessingExampleKey,
//   callback: (arg?: string) => void,
//     }>({
//       show: false,
//       isSaving: false,
//       data: 'wood',
//       callback: () => {}
//     });
// function clickBtn(data?: ProcessingExampleKey) {
//   const isSaving = !!data;
//   Object.assign(btnActionState, {
//     show: true,
//     isSaving,
//     data,
//     callback: isSaving ? handleSaveComfirm : handleExampleConfirm,
//   });
// }

// // 使用範例(覆蓋表格)
// const exampleActions = [
//   {
//     text: '範例一',
//     target: 'wood'
//   },
//   {
//     text: '範例二',
//     target: 'alloy'
//   },
//   {
//     text: '清空',
//     target: 'empty'
//   },
// ] as const;
// function handleExampleConfirm() {
//   processingState.overrideCurrent(btnActionState.data as ProcessingExampleKey);
//   Object.assign(btnActionState, { show: false });
// }

// // 儲存表單
// const favName = ref(processingState.tier2[0].name);
// watch(
//   () => processingState.tier2[0]?.name,
//   (newVal, oldVal) => {
//     if (!newVal) return;
//     if (!favName.value || oldVal === favName.value) favName.value = newVal;
//   }
// );
// function handleSaveComfirm() {
//   processingState.appendFav(favName.value);
//   Object.assign(btnActionState, { show: false });
// }

// // 使用範例(覆蓋表格)
const exampleConfirm = reactive<{
  show: boolean,
  example: 'wood' | 'alloy' | 'empty'
}>({
  show: false,
  example: 'wood'
});
const exampleActions = [
  {
    text: '範例一',
    target: 'wood'
  },
  {
    text: '範例二',
    target: 'alloy'
  },
  {
    text: '清空',
    target: 'empty'
  },
] as const;
function clickExample(action: typeof exampleConfirm['example']) {
  Object.assign(exampleConfirm, {
    show: true,
    example: action
  });
}
function handleExampleConfirm() {
  processingState.overrideCurrent(exampleConfirm.example);
  Object.assign(exampleConfirm, { show: false });
}

// 儲存表單
const saveFavConfirm = ref(false);
const favName = ref(processingState.tier2[0].name);
function clickSave() {
  saveFavConfirm.value = true;
  if (!favName.value) favName.value = processingState.tier2[0]?.name;
}
watch(
  () => processingState.tier2[0]?.name,
  (newVal, oldVal) => {
    if (!newVal) return;
    if (!favName.value || oldVal === favName.value) favName.value = newVal;
  }
);
function handleSaveComfirm() {
  if (!favName.value.length) return;
  processingState.appendFav(favName.value);
  saveFavConfirm.value = false;
}

// 原料需求估計
const estimationState = useEstimationStore();
const inverseMethodTier2 = toRef(() => estimationState.processing.tier2);
const inverseMethodTier1 = toRef(() => estimationState.processing.tier1);
</script>

<template>
  <section
    class="full-height column-flow"
  >
    <RegionHeader
      tag="h2"
      title="加工"
      icon="processing"
      color="processing"
    />
    <v-row class="bg-processing-lighten-2">
      <!-- col 1 -->
      <v-col
        class="column-flow"
      >
        <RegionHeader
          v-memo="[page]"
          tag="h3"
          :title="pageTitle"
          color="processing-lighten-1"
          rounded="0"
        />
        <v-window
          class="flex-1-1 overflow-y-scroll"
          style="height: 0;"
          v-model="page"
        >
          <v-window-item
            :class="windowItemClass.panel"
            :value="1"
          >
            <v-sheet 
              class="bg-transparent text-center"
              rounded="lg"
            >
              <TheRaw
                v-for="(raw, i) in processingState.raw"
                :key="i"
                :raw="raw"
                :idx="i"
              />
              <CommonBtn
                type="append" 
                @click="processingState.appendGoods(0)"
                :disabled="processingState.raw.length >= 25"
              />
            </v-sheet>
          </v-window-item>
          <v-window-item
            :class="windowItemClass.panel"
            :value="2"
          >
            <v-sheet 
              class="rounded-lg bg-brown-lighten-4 text-center"
            >
              <TheProduct
                v-for="(product, i) in processingState.tier1"
                :key="i"
                :tier="1"
                :product="product"
                :hourlyInfo="tier1HourlyInfo[i]"
                :idx="i"
                :lowTierNames="names[0]"
                :selectedRaws="selectedRaws"
              />
              <CommonBtn
                type="append" 
                @click="processingState.appendGoods(1)"
                :disabled="processingState.tier1.length >= 10"
              />
            </v-sheet>
          </v-window-item>
          <v-window-item
            :class="windowItemClass.panel"
            :value="3"
          >
            <v-sheet 
              class="rounded-lg bg-transparent text-center"
            >
              <TheProduct
                v-for="(product, i) in processingState.tier2"
                :key="i"
                :tier="2"
                :product="product"
                :hourlyInfo="tier2HourlyInfo[i]"
                :idx="i"
                :lowTierNames="names[1]"
                :selectedRaws="selectedRawNTier1"
              />
              <CommonBtn
                type="append" 
                @click="processingState.appendGoods(2)"
                :disabled="processingState.tier2.length >= 5"
              />
            </v-sheet>
          </v-window-item>
        </v-window>
        <v-card-actions
          class="justify-space-between px-4 py-2 bg-processing-lighten-1"
        >
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click="page = prevPage(page, 3) as pageIndices"
          />
          <v-item-group
            v-model="page"
            class="text-center"
            mandatory
          >
            <v-item
              v-for="n in 3"
              :key="`btn-${n}`"
              v-slot="{ isSelected, toggle }"
              :value="n"
            >
              <v-btn
                :variant="isSelected ? 'outlined' : 'text'"
                icon="mdi-record"
                @click="toggle"
              />
            </v-item>
          </v-item-group>
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            @click="page = nextPage(page, 3) as pageIndices"
          />
        </v-card-actions>
      </v-col>

      <v-divider
        v-once
        vertical 
        thickness="3"
        opacity="1"
        color="surface"
      />

      <!-- col 2 -->
      <v-col
        class="column-flow h-100"
        cols="3"
      >
        <RegionHeader
          v-once
          tag="h3"
          title="結果"
          color="processing-lighten-1"
          rounded="0"
        />
        <div
          class="column-flow flex-1-1 ga-3 px-2 py-3 overflow-y-auto"
          style="height: 0;"
        >
          <MPResult :idx="-1" />
        </div>
      </v-col>
    </v-row>
    <v-btn-group
      v-once
      class="ga-5 px-4 py-2 bg-processing"
      variant="text"
      rounded="b-lg t-0"
    >
      <v-btn
        v-for="act in exampleActions"
        :key="act.target"
        :prepend-icon="act.target === 'empty' ? 'mdi-broom' : 'mdi-lightbulb-outline'"
        rounded="lg"
        class="font-weight-bold"
        @click="clickExample(act.target)"
      >
        {{ act.text }}
        <v-tooltip
          v-if="act.target !== 'empty'" 
          :text="processingExample[act.target].name"
          activator="parent"
          location="bottom"
        />
      </v-btn>
      <v-spacer />
      <v-btn
        prepend-icon="mdi-file"
        density="compact"
        rounded="lg"
        class="font-weight-bold"
        variant="elevated"
        base-color="processing-darken-1"
        @click="clickSave"
      >
        儲存
      </v-btn>
    </v-btn-group>
    <TheDialog 
      v-if="exampleConfirm.show"
      title="覆蓋表單?"
      :text="`範例 ${processingExample[exampleConfirm.example].name}`"
      v-model="exampleConfirm.show"
      @confirm="handleExampleConfirm()"
    />
    <TheDialog 
      v-if="saveFavConfirm"
      title="儲存最愛"
      v-model="saveFavConfirm"
      :confirm-disabled="favName.length === 0"
      @confirm="handleSaveComfirm()"
    >
      <v-text-field
        label="名稱"
        v-model="favName"
      />
    </TheDialog>
    <!-- <v-btn-group
      v-once
      class="flex-0-0 ga-5 px-4 py-2 bg-processing"
      variant="text"
      rounded="b-lg t-0"
    >
      <v-btn
        v-for="act in exampleActions"
        :key="act.target"
        prepend-icon="mdi-broom"
        rounded="lg"
        @click="clickBtn(act.target)"
      >
        {{ act.text }}
        <v-tooltip
          :text="processingExample[act.target].name"
          activator="parent"
          location="bottom"
        />
      </v-btn>
      <v-spacer />
      <v-btn
        prepend-icon="mdi-knob"
        density="compact"
        rounded="lg"
        variant="elevated"
        base-color="processing-darken-1"
      >
        製作次數
      </v-btn>
      <v-btn
        prepend-icon="mdi-file"
        density="compact"
        rounded="lg"
        variant="elevated"
        base-color="processing-darken-1"
        @click="clickBtn()"
      >
        儲存
      </v-btn>
    </v-btn-group>
    <TheDialog 
      v-if="btnActionState.show"
      :title="btnActionState.isSaving ? '儲存最愛' : '覆蓋表單?'"
      :text="
        btnActionState.isSaving ?
          undefined :
          `範例 ${processingExample[btnActionState.data as ProcessingExampleKey].name}`
      "
      v-model="btnActionState.show"
      @confirm="btnActionState.callback()"
    >
      <v-text-field
        v-if="btnActionState.isSaving"
        label="名稱"
        v-model="favName"
      />
    </TheDialog> -->
  </section>
  <v-lazy
    tag="section"
    :min-height="400"
    :options="{'threshold': 0.5}"
    transition="fade-transition"
  >
    <MPFavs class="full-height column-flow" />
  </v-lazy>
  <v-lazy
    tag="section"
    :min-height="50"
    :options="{'threshold': 1}"
    transition="fade-transition"
  >
    <v-container class="my-4 pa-0 overflow-hidden rounded-t-xl rounded-b-lg">
      <RegionHeader
        v-once
        tag="h3"
        title="原料需求估計"
        icon="mdi-calculator-variant-outline"
        color="title"
      />
      <v-row
        class="h-100 bg-surface px-2 py-2 ga-2 bg-content"
      >
        <v-col class="d-flex align-center ga-3 px-5 pt-4 pb-2 rounded-xl bg-surface">
          <v-text-field
            label="產量需求"
            density="compact"
            type="number"
            inputmode="decimal"
            min="1"
            v-model="inverseMethodTier2.demand"
          />
          <v-text-field
            label="二階加工產量"
            density="compact"
            type="number"
            inputmode="decimal"
            min="1"
            step="any"
            v-model="inverseMethodTier2.avgyield"
          />
          <v-text-field
            label="一階原料消耗量"
            density="compact"
            type="number"
            inputmode="decimal"
            min="1"
            v-model="inverseMethodTier2.consumption"
          />
          <v-text-field
            label="一階加工產量"
            density="compact"
            type="number"
            inputmode="decimal"
            min="1"
            step="any"
            v-model="inverseMethodTier1.avgyield"
          />
          <v-text-field
            label="基本材料消耗量"
            density="compact"
            type="number"
            inputmode="decimal"
            min="1"
            v-model="inverseMethodTier1.consumption"
          />
        </v-col>
        <v-col
          class="text-subtitle-2 px-5 py-3 rounded-xl bg-surface"
          cols="3"
        >
          <DataBlock
            title="基本材料需求量"
            :value="estimationState.processingT0Req"
            titleSize="body-2"
          />
          <DataBlock
            title="一階產物需求量"
            :value="estimationState.processingT1Req"
            titleSize="body-2"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-lazy>
</template>
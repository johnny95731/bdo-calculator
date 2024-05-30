<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
// components
import CommonBtn from '@/components/CommonBtn.vue';
import RegionHeader from '@/components/RegionHeader.vue';
import TheDialog from '@/components/TheDialog.vue';
import DataTable from '@/components/DataTable.vue';
const DataBlock = defineAsyncComponent({
  loader: () => import('@/components/DataBlock.vue')
});
const AlchemyFav = defineAsyncComponent({
  loader: () => import('@/components/alchemy/AlchemyFav.vue')
});
const AlchemyRaw = defineAsyncComponent({
  loader: () => import('@/components/alchemy/AlchemyRaw.vue')
});
import AlchemyResult from '@/components/alchemy/AlchemyResult.vue';
// stores and utils
import useAlchemyStore from 'stores/useAlchemyStore';
import useEstimationStore from '@/features/stores/useEstimationStore';
import { alchemyExample } from '@/utils/examples';
import type { AlchemyExampleKey } from '@/utils/examples';
import { computed } from 'vue';

const alchemyState = useAlchemyStore();
const { current } = storeToRefs(alchemyState);

const rareProd = reactive<{
  show: boolean,
  price: string | number,
  rate: string | number
}>((() => {
  const state = {
    show: !!current.value.rareProd || !!alchemyExample.elixir.rareProd,
    ...(current.value.rareProd ?? alchemyExample.elixir.rareProd)
  };
  // @ts-expect-error 'num' may exists in current.value.rareProd
  if (state.num !== undefined) delete state.num;
  return state;
})());
watch(rareProd, (newVals) => {
  if (!newVals.show) {
    alchemyState.updateRareProd();
    return; 
  }
  alchemyState.updateRareProd(
    {
      price: newVals.price ? +newVals.price : 0,
      rate: newVals.rate ? +newVals.rate : 0,
    }
  );
});
watch(() => current.value.rareProd, (newVals) => {
  Object.assign(rareProd, { show: !!newVals });
  if (!newVals) return;
  Object.assign(rareProd, {
    price: newVals.price,
    rate: newVals.rate,
  });
}, {
  deep: true
});

const btnActionState = reactive<{
  show: boolean,
  type: 'example' | 'save',
  data?: AlchemyExampleKey,
  callback: (arg?: string) => void,
    }>({
      show: false,
      type: 'example',
      data: 'reagent',
      callback: () => {}
    });
function clickBtn(type: typeof btnActionState['type'], data?: AlchemyExampleKey) {
  Object.assign(btnActionState, {
    show: true,
    type,
    data,
    callback: type === 'save' ? handleSaveComfirm : handleExampleConfirm,
  });
}

// 使用範例(覆蓋表格)
const exampleActions = [
  {
    text: '範例一',
    tooltip: alchemyExample.reagent.name,
    target: 'reagent'
  },
  {
    text: '範例二',
    tooltip: alchemyExample.elixir.name,
    target: 'elixir'
  },
] as const;
function handleExampleConfirm() {
  alchemyState.overrideCurrent(btnActionState.data as AlchemyExampleKey);
  Object.assign(btnActionState, { show: false });
}

// 儲存表單
function handleSaveComfirm() {
  if (!current.value.name) return;
  alchemyState.saveRecipe();
  Object.assign(btnActionState, { show: false });
}

// 調整製作次數
const craftsState = reactive<{
  show: boolean,
  crafts: number
}>({
  show: false,
  crafts: current.value.crafts,
});
watch( // 更新原料數量時調整craftsState
  () => current.value.crafts,
  (newVal) => Object.assign(craftsState, { crafts: newVal }),
);

const rawRequiredHeader = { // DataTable 標籤
  title: {
    name: '名稱'
  },
  value: {
    name: '需求量'
  },
};
const rawRequiredNum = ref<{
  /**
   * 名稱
   */
  label: string,
  /**
   * 需求量
   */
  value: number
}[]>(
  current.value.raw.map((obj) => ({
    label: obj.name,
    value: current.value.crafts * obj.consumption,
  }))
);
const updateRequiredNum = () => {
  rawRequiredNum.value = current.value.raw.map((obj) => ({
    label: obj.name,
    value: craftsState.crafts * obj.consumption,
  }));
};
watch(
  () => craftsState.crafts,
  (newVal, oldVal) => newVal !== oldVal && updateRequiredNum()
);

const clickSetCrafts = () => {
  Object.assign(craftsState, { show: !craftsState.show });
  if (!craftsState.show) 
    alchemyState.setCrafts(rawRequiredNum.value.map((obj) => obj.value));
};

const estimationState = useEstimationStore();
const { alchemy: alchemyEsti, alchemyReqRaw, alchemyCrafts } = storeToRefs(estimationState);
const alchemyReqRawData = computed(() => {
  return alchemyReqRaw.value.map((num, i) => ({
    label: `原料${i+1}`,
    value: num,
  }));
});
</script>

<template>
  <section
    class="column-flow full-height"
  >
    <RegionHeader
      v-once
      tag="h2"
      title="煉金"
      icon="alchemy"
      color="alchemy"
    />
    <v-row class="flex-1-1 h-100 bg-alchemy-lighten-2">
      <!-- col 1 -->
      <v-col
        class="h-100 column-flow"
        :cols="2"
      >
        <RegionHeader
          v-once
          tag="h3"
          title="配方"
          color="alchemy-lighten-1"
          rounded="0"
        />
        <div
          class="column-flow flex-1-1 ga-3 px-4 py-3"
        >
          <v-sheet
            class="px-3 py-4"
            rounded="xl"
          >
            <v-text-field
              class="mb-3"
              label="名稱"
              dirty
              density="compact"
              :model-value="current.name"
              @update:model-value="alchemyState.updateRecipe('name', $event)"
            />
            <v-text-field
              class="my-3"
              label="出售價"
              type="number"
              inputmode="decimal"
              min="0"
              density="compact"
              :model-value="current.price"
              @update:model-value="alchemyState.updateRecipe('price', $event)"
            />
            <div class="my-1">
              <v-label
                v-once
                class="d-block text-caption mb-n2"
              >
                產量範圍
              </v-label>
              <div class="d-flex align-end ga-2">
                <v-text-field
                  class="flex-1-1-100"
                  label="最小值"
                  single-line
                  type="number"
                  inputmode="decimal"
                  min="0"
                  density="compact"
                  :max="current.yieldRange[1]"
                  :model-value="current.yieldRange[0]"
                  @update:model-value="alchemyState.updateRecipe('yieldRange', $event, 0)"
                />
                ~
                <v-text-field
                  class="flex-1-1-100"
                  label="最大值"
                  single-line
                  type="number"
                  inputmode="decimal"
                  density="compact"
                  :min="current.yieldRange[0]"
                  :model-value="current.yieldRange[1]"
                  @update:model-value="alchemyState.updateRecipe('yieldRange', $event, 1)"
                />
              </div>
            </div>
            <v-checkbox
              class="ms-n1 mb-n1"
              label="稀有產物"
              density="compact"
              :ripple="false"
              v-model="rareProd.show"
            />
            <v-scroll-y-transition>
              <div
                v-if="rareProd.show"
                class="ml-2 pl-2 py-2"
                :style="{
                  'border-left': '2px solid black'
                }"
              >
                <v-text-field
                  class="mb-3"
                  label="稀有產物比例"
                  type="number"
                  min="0"
                  step="0.01"
                  density="compact"
                  v-model="rareProd.rate"
                >
                  <v-tooltip
                    activator="parent"
                    location="top"
                    text="取決於製作次數"
                  />
                </v-text-field>
                <v-text-field
                  label="售出價"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  density="compact"
                  :model-value="rareProd.price"
                  @update:model-value="rareProd.price = $event"
                />
              </div>
            </v-scroll-y-transition>
          </v-sheet>
        </div>
      </v-col>

      <v-divider
        v-once
        vertical 
        thickness="2"
        opacity="1"
        color="surface"
      />
        
      <!-- col 2 -->
      <v-col
        class="column-flow h-100"
      >
        <RegionHeader
          v-once
          tag="h3"
          title="原料"
          color="alchemy-lighten-1"
          rounded="0"
        />
        <v-sheet 
          class="flex-1-1 px-4 bg-transparent text-center"
        >
          <AlchemyRaw
            v-for="(raw, i) in current.raw"
            :key="i"
            :idx="i"
            :raw="raw"
          />
          <CommonBtn 
            type="append"
            @click="alchemyState.appendRaw"
            :disabled="current.raw.length >= 5"
          />
        </v-sheet>
      </v-col>
  
      <v-divider
        v-once
        vertical 
        thickness="3"
        opacity="1"
        color="surface"
      />
        
      <!-- col 3 -->
      <v-col
        class="column-flow h-100"
        cols="3"
      >
        <RegionHeader
          v-once
          tag="h3"
          title="結果"
          color="alchemy-lighten-1"
          rounded="0"
        />
          
        <div
          class="column-flow flex-1-1 ga-3 px-2 py-3 overflow-y-auto"
          style="height: 0;"
        >
          <AlchemyResult :idx="-1" />
        </div>
      </v-col>
    </v-row>
    <v-btn-group
      v-once
      class="flex-0-0 ga-5 px-4 py-2 bg-alchemy"
      variant="text"
      rounded="b-lg t-0"
    >
      <v-btn
        v-for="act in exampleActions"
        :key="act.target"
        prepend-icon="mdi-broom"
        rounded="lg"
        @click="clickBtn('example', act.target)"
      >
        {{ act.text }}
        <v-tooltip
          v-if="act.tooltip" 
          :text="act.tooltip"
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
        base-color="alchemy-darken-1"
        @click="clickSetCrafts"
      >
        製作次數
      </v-btn>
      <v-btn
        prepend-icon="mdi-file"
        density="compact"
        rounded="lg"
        variant="elevated"
        base-color="alchemy-darken-1"
        :disabled="!current.name"
        @click="clickBtn('save')"
      >
        儲存
      </v-btn>
    </v-btn-group>
    <TheDialog 
      v-if="btnActionState.show"
      v-memo="[btnActionState.show]"
      :title="btnActionState.type === 'save' ? '儲存最愛' : '覆蓋表單?'"
      :text="
        btnActionState.type === 'save' ?
          undefined :
          `範例 ${alchemyExample[btnActionState.data as AlchemyExampleKey].name}`
      "
      v-model="btnActionState.show"
      @confirm="btnActionState.callback()"
    />
    <TheDialog 
      v-if="craftsState.show"
      title="製作次數"
      :model-value="craftsState.show"
      @update:model-value="clickSetCrafts"
    >
      <DataTable
        class="pa-0"
        :headers="rawRequiredHeader"
        :data="rawRequiredNum"
        :label-width="10"
      />
      <v-text-field
        class="pt-4"
        label="製作次數"
        type="number"
        inputmode="decimal"
        min="0"
        density="compact"
        v-model="craftsState.crafts"
      />
    </TheDialog>
  </section>
  <v-lazy
    tag="section"
    :min-height="400"
    :options="{'threshold': 0.5}"
    :transition="undefined"
  >
    <AlchemyFav class="full-height column-flow" />
  </v-lazy>
  <v-lazy
    class="v-container pa-0"
    tag="section"
    :min-height="100"
    :options="{'threshold': 1}"
    transition="fade-transition"
  >
    <div class="my-4 pa-0 overflow-hidden rounded-t-xl rounded-b-lg">
      <RegionHeader
        v-once
        tag="h3"
        title="原料需求估計"
        icon="mdi-calculator-variant-outline"
        color="title"
      />
      <v-row
        class="h-100 justify-center bg-surface px-2 py-2 ga-4 bg-content"
      >
        <v-col
          class="px-5 pt-4 pb-2 rounded-xl bg-surface"
          cols="3"
        >
          <label class="font-weight-bold d-block mb-3">
            期望產物量
          </label>
          <v-text-field
            label="一般產物"
            density="compact"
            type="number"
            inputmode="decimal"
            dirty
            min="1"
            v-model.number="alchemyEsti.demand.regular"
          />
          <v-checkbox
            class="ms-n1 mb-n1"
            label="稀有產物"
            density="compact"
            v-model="alchemyEsti.hasRare"
          />
          <v-scroll-y-transition>
            <div
              v-if="alchemyEsti.hasRare"
              class="ml-2 pl-2 py-2"
              :style="{
                'border-left': '2px solid black'
              }"
            >
              <v-text-field
                class="mb-3"
                label="稀有產物"
                density="compact"
                type="number"
                inputmode="decimal"
                dirty
                min="1"
                v-model.number="alchemyEsti.demand.rare"
              />
              <v-text-field
                class="mb-2"
                label="稀有產物比例"
                density="compact"
                type="number"
                inputmode="decimal"
                dirty
                min="0"
                step="0.01"
                v-model.number="alchemyEsti.rareRate"
              >
                <v-tooltip
                  activator="parent"
                  location="top"
                  text="取決於製作次數"
                />
              </v-text-field>
              <v-checkbox-btn
                id="to-rare"
                class="ms-n1 mb-n2"
                label="全製作為稀有產物"
                density="compact"
                v-model="alchemyEsti.toRare"
              >
                <template #label>
                  全製作為稀有產物
                  <v-tooltip
                    activator="parent"
                    location="top"
                    text="忽略一般產物數量要求"
                  />
                </template>
              </v-checkbox-btn>
            </div>
          </v-scroll-y-transition>
        </v-col>
        <v-col
          class="px-5 pt-4 pb-2 rounded-xl bg-surface"
          cols="3"
        >
          <label class="font-weight-bold d-block mb-3">
            原料消耗量
          </label>
          <v-text-field
            v-for="(consumption, i) in alchemyEsti.raw"
            :key="i"
            v-memo="[consumption]"
            class="mb-4"
            :label="`原料${i + 1}`"
            density="compact"
            type="number"
            inputmode="decimal"
            min="1"
            :model-value="consumption"
            @update:model-value="alchemyEsti.raw[i] = +$event"
          />
        </v-col>
        <v-col
          class="text-subtitle-2 px-5 py-3 rounded-xl bg-surface"
          cols="3"
        >
          <DataBlock
            title="製作次數"
            :value="alchemyCrafts"
          />
          <DataTable
            class="mt-2 ml-3"
            title="原料需求量"
            titleClass="text-body-1 font-weight-bold ms-n3"
            itemSize="body-1"
            :data="alchemyReqRawData"
          />
        </v-col>
      </v-row>
    </div>
  </v-lazy>
</template>
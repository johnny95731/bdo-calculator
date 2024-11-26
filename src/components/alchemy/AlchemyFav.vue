<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue';
// components
const RegionHeader = defineAsyncComponent({
  loader: () => import('@/components/RegionHeader.vue')
});
const TheDialog = defineAsyncComponent({
  loader: () => import('@/components/TheDialog.vue')
});
const AlchemyResult = defineAsyncComponent({
  loader: () => import('./AlchemyResult.vue')
});
// Stores and utils
import useCharacterStore from '~/features/stores/useCharacterStore';
import useAlchemyStore from '~/features/stores/useAlchemyStore';
import { numFormat } from '@/utils/helpers';
import { getIcon } from '@/utils/icons';
import type { VDataTable } from 'vuetify/lib/components/index.mjs';
import type { IconKeys } from '@/utils/icons';

const characterState = useCharacterStore();
const alchemyState = useAlchemyStore();

const headers: InstanceType<typeof VDataTable>['$props']['headers'] = [
  { title: '名稱', key: 'name', width: '150px' },
  { title: '利潤', key: 'profit' },
  {
    title: '產量',
    width: '210px',
    children: [
      { title: '一般產物', key: 'yield.regular', width: '90px' },
      { title: '稀有產物', key: 'yield.rare', width: '90px' },
    ] as {[key: string]: unknown}[]
  },
  { title: '製作時間(分鐘)', key: 'time' },
  { title: '每小時產值', key: 'hourlyProfit' },
  { title: '功能', key: 'actions', sortable: false, width: '100px' },
].map((header) => {
  if (header.children) header.children.forEach(obj => obj.align = 'center');
  return {
    ...header,
    align: 'center'
  };
});

// Table資料
function calcTableData() {
  return alchemyState.recipes.map((obj, i) => {
    const hourly = alchemyState.hourly(i);
    const cost = alchemyState.cost(i);
    return {
      name: obj.name,
      profit: numFormat(alchemyState.allIncomes(i).total - cost, 0),
      time: numFormat(obj.timeCost, 0),
      yield: {
        regular: numFormat(obj.num, 1),
        rare: obj.rareProd ? numFormat(obj.rareProd.num, 1) : null,
      },
      hourlyProfit: numFormat(hourly.profit + (hourly.rareProd?.profit ?? 0) - hourly.cost, 0),
      hourlyYield: numFormat(hourly.yield, 0),
    };
  });
}
const displayedData = ref(calcTableData());
watch(() => [
  alchemyState.recipes,
  characterState.alchemy,
  characterState.profitMargin,
], () => {
  displayedData.value = calcTableData();
}, {
  deep: true
});

// Actions
const actionState = reactive<{
  activity: boolean,
  title: '覆蓋表單' | '從我的最愛移除' | '詳細資訊' | null,
  action: 'edit' | 'del' | 'info' | null,
  idx: number | null,
  callback: ((idx: number) => void) | null,
    }>({
      activity: false,
      title: null,
      action: null,
      idx: null,
      callback: null
    });
const resetAction = (ev: 'confirm' | 'cancel') => {
  if (ev === 'confirm' && actionState.callback !== null) {
    actionState.callback(actionState.idx as number);
  }
  Object.assign(actionState, {
    activity: false,
  });
};
const editFav = (idx: number) => {
  Object.assign(actionState, {
    activity: true,
    title: '覆蓋表單?',
    action: 'edit',
    idx: idx,
    callback: alchemyState.overrideCurrent,
  });
};
const delFav = (idx: number) => {
  Object.assign(actionState, {
    activity: true,
    title: '確定移除?',
    action: 'del',
    idx: idx,
    callback: alchemyState.removeRecipe,
  });
};
const showFavInfo = (idx: number) => {
  Object.assign(actionState, {
    activity: true,
    title: '詳細資訊',
    action: 'info',
    idx: idx,
    callback: null,
  });
};
const isShowInfo = computed(() => actionState.action === 'info');
const actions: {
  tooltip: string,
  icon: IconKeys,
  callback: (idx: number) => void,
}[] = [
  {
    tooltip: '編輯(覆蓋表單)',
    icon: 'editable',
    callback: editFav,
  },
  {
    tooltip: '刪除',
    icon: 'delete',
    callback: delFav,
  },
  {
    tooltip: '詳細資訊',
    icon: 'info',
    callback: showFavInfo,
  }
];
</script>

<template>
  <div>
    <RegionHeader
      v-once
      tag="h3"
      title="我的最愛"
      icon="favorite"
      color="title"
    />
    <v-data-table-virtual
      class="flex-1-1 h-0 bg-surface"
      :headers="headers"
      :items="displayedData"
      fixed-header
      hover
    >
      <template #headers="prop">
        <tr>
          <th
            v-for="(column, i) in prop.headers[0]"
            :key="column.title"
            :colspan="column.children ? 2 : 1"
            :rowSpan="column.children ? 1 : 2"
            :class="[
              'v-data-table-column--align-center',
              'v-data-table__th',
              'v-data-table__th--sortable',
              prop.isSorted(column) ? 'v-data-table__th--sorted' : '',
              'header-item bg-content',
            ]"
            :style="{
              width: column.width,
              borderLeft: i === 0 ? 'none' : undefined,
            }"
            @click.stop="prop.toggleSort(column)"
          >
            <span>{{ column.title }}</span>
            <v-icon
              v-if="column.sortable !== false"
              class="v-data-table-header__sort-icon sort-icon"
              :icon="
                prop.sortBy[0]?.key === column.key
                  && prop.sortBy[0]?.order === 'desc' ?
                    'mdi-arrow-down' :
                    'mdi-arrow-up'
              "
            />
          </th>
        </tr>
        <tr>
          <th
            v-for="column in prop.headers[1]"
            :key="column.title"
            colspan="1"
            :rowSpan="1"
            :class="[
              'v-data-table-column--align-center',
              'v-data-table__th',
              'v-data-table__th--sortable',
              prop.isSorted(column) ? 'v-data-table__th--sorted' : '',
              'header-item bg-content'
            ]"
            :style="{
              width: column.width
            }"
            @click.stop="prop.toggleSort(column)"
          >
            <span>{{ column.title }}</span>
            <v-icon
              v-if="column.sortable !== false"
              class="v-data-table-header__sort-icon sort-icon"
              :icon="
                prop.sortBy[0]?.key === column.key
                  && prop.sortBy[0]?.order === 'desc' ?
                    'mdi-arrow-down' :
                    'mdi-arrow-up'
              "
            />
          </th>
        </tr>
      </template>
      <template #item.actions="{ index }">
        <div class="d-flex justify-space-between">
          <v-tooltip
            v-for="act in actions"
            :key="act.icon"
            location="top"
            :eager="false"
          >
            <template #activator="{props: tipProp}">
              <v-icon
                v-bind="tipProp"
                :icon="getIcon(act.icon)"
                @click="act.callback(index)"
              />
            </template>
            {{ act.tooltip }}
          </v-tooltip>
        </div>
      </template>
      <template #bottom>
        <div
          class="bg-content rounded-b-lg"
          style="min-height: 40px;"
        />
      </template>
    </v-data-table-virtual>
    <TheDialog
      v-if="actionState.activity"
      v-model="actionState.activity"
      :height="isShowInfo ? 500 : undefined"
    >
      <template #title>
        <v-card-title
          :class="[
            'font-weight-bold px-4 py-2 my-0',
            isShowInfo ? 'bg-title' : ''
          ]"
        >
          {{ actionState.title }}
        </v-card-title>
      </template>
      <template
        v-if="isShowInfo"
        #text
      >
        <v-card-text
          :class="[
            'column-flow flex-1-1 ga-3 px-2 py-3 overflow-y-auto',
            isShowInfo ? 'bg-content' : ''
          ]"
          style="height: 0;"
        >
          <AlchemyResult
            :idx="actionState.idx ?? 0"
          />
        </v-card-text>
      </template>
      <template #actions>
        <v-spacer />
        <v-btn @click="resetAction('cancel')">
          {{ isShowInfo ? '關閉' : '取消' }}
        </v-btn>
        <v-btn
          v-if="!isShowInfo"
          @click="resetAction('confirm')"
        >
          確定
        </v-btn>
      </template>
    </TheDialog>
  </div>
</template>

<style lang="scss" scoped>
.header-item {
  border-left: 1px solid grey;
}
.sort-icon {
  position: absolute;
}

:deep(.v-table__wrapper) > table {
  --v-table-header-height: 33px;
  table-layout: fixed;
  border-collapse: collapse;
}
</style>

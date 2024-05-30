<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue';
const TheDialog = defineAsyncComponent({
  loader: () => import('@/components/TheDialog.vue')
});
import RegionHeader from '@/components/RegionHeader.vue';
const MPResult = defineAsyncComponent({
  loader: () => import('@/components/massProcessing/MPResult.vue')
});
import useCharacterStore from 'stores/useCharacterStore';
import useProcessingStore from 'stores/useProcessingStore';
import { numFormat, round, sumAlongAttr, prevPage, nextPage } from '@/utils/helpers';
import { getIcon, IconKeys } from '@/utils/icons';
import type { VDataTable } from 'vuetify/lib/components/index.mjs';
import type { tier2HourlyStats } from '@/features/types/processingType';

const characterState = useCharacterStore();
const processingState = useProcessingStore();
const tablePage = ref<number>(1);
const itemsInPage = ref<number>(1);
const ITEMS_PER_PAGE = 10;
function calcItemsInPage(page: number) {
  const pageCount = Math.ceil(processingState.recipes.length / ITEMS_PER_PAGE);
  itemsInPage.value = (
    page !== pageCount ?
      ITEMS_PER_PAGE :
      processingState.recipes.length % ITEMS_PER_PAGE
  );
}
calcItemsInPage(tablePage.value);
watch(tablePage, (newVal) => calcItemsInPage(newVal));

const headers: InstanceType<typeof VDataTable>['$props']['headers'] = [
  { title: '名稱', key: 'name', width: '150px' },
  { title: '總利潤', key: 'profit' },
  { title: '加工時間(分鐘)', key: 'time' },
  { title: '每小時產值', key: 'hourlyProfit' },
  { title: '功能', key: 'actions', sortable: false, width: '100px' },
].map((header) => ({
  ...header,
  align: 'center',
  class: 'bg-black'
}));

// Table資料
function calcTableData() {
  return processingState.recipes.map((obj, i) => {
    const hourly = (processingState.hourly(i, 2) as tier2HourlyStats[])
      .reduce((prev, hrObj) => {
        prev.profit += hrObj.profitFromRaw as number;
        prev.yield += hrObj.yieldFromRaw as number;
        return prev;
      }, { profit: 0, yield: 0 });
    const timeCost = processingState.timeCost(i);
    return {
      name: obj.name,
      profit: numFormat(processingState.allIncomes(i).tier2),
      time: numFormat(timeCost[0] + timeCost[1]),
      hourlyProfit: numFormat(hourly.profit),
      hourlyYield: numFormat(hourly.yield),
    };
  });
}
const displayedData = ref(calcTableData());


// 詳細資訊(透過Info按鈕開啟)
function calcDetailData() {
  return processingState.recipes.map((favObj, i) => {
    const timeCost = (() => {
      const [tier1, tier2] = processingState.timeCost(i);
      return [
        tier1, tier2, tier1 + tier2
      ];
    })();
    const tier1HourlyInfo = processingState.hourly(i, 1);
    const incomes = processingState.allIncomes(i);
    return [
      {
        class: 'text-grey-darken-1',
        textSize: 'h6',
        label: '基本材料',
        value: ''
      },
      {
        label: '出售利潤',
        value: incomes.raw,
      },
      {
        label: '總數量',
        value: sumAlongAttr(favObj.raw, 'num'),
      },

      {
        class: 'mt-3 text-grey-darken-1',
        textSize: 'h6',
        label: '一階加工',
        value: ''
      },
      {
        label: '利潤',
        value: incomes.tier1,
      },
      {
        label: '加工時間',
        value: `${round(timeCost[0])}分鐘`,
      },
      {
        label: '估計產量',
        value: sumAlongAttr(favObj.tier1, 'num'),
      },
      {
        label: '每小時產值',
        value: sumAlongAttr(tier1HourlyInfo, 'profit'),
      },
      {
        label: '每小時產量',
        value: sumAlongAttr(tier1HourlyInfo, 'yield'),
      },

      {
        class: 'mt-3 text-grey-darken-1',
        textSize: 'h6',
        label: '二階加工',
        value: ''
      },
      {
        label: '加工利潤',
        value: incomes.tier2,
      },
      {
        label: '加工時間',
        value: `${round(timeCost[1])}分鐘`,
      },
      {
        label: '估計產量',
        value: sumAlongAttr(favObj.tier2, 'num'),
      },
      {
        label: '從原料加工',
        value: `${round(timeCost[0] + timeCost[1])}分鐘`,
      },
      {
        label: '每小時產值',
        value: displayedData.value[i].hourlyProfit,
      },
      {
        label: '每小時產量',
        value: displayedData.value[i].hourlyYield,
      },
    ];
  });
}
const extraData = ref(calcDetailData());

watch(() => [
  processingState.recipes,
  characterState.avgCraft,
  characterState.profitMargin,
], () => {
  displayedData.value = calcTableData();
  extraData.value = calcDetailData();
}, {
  deep: true
});

// action's dialog
const showConfirmDialog = ref(false);
const actionInfo = reactive<{
  title: '覆蓋表單' | '從我的最愛移除' | '詳細資訊' | null,
  action: 'edit' | 'del' | 'info' | null,
  idx: number | null,
  callback: ((idx: number) => void) | null,
    }>({
      title: null,
      action: null,
      idx: null,
      callback: null
    });
const resetAction = (ev: 'confirm' | 'cancel') => {
  if (ev === 'confirm' && actionInfo.callback !== null) {
    actionInfo.callback(actionInfo.idx as number);
  }
  showConfirmDialog.value = false;
};
const editFav = (idx: number) => {
  Object.assign(actionInfo, {
    title: '覆蓋表單?',
    action: 'edit',
    idx: idx,
    callback: processingState.overrideCurrent,
  });
  showConfirmDialog.value = true;
};
const delFav = (idx: number) => {
  Object.assign(actionInfo, {
    title: '確定移除?',
    action: 'del',
    idx: idx,
    callback: processingState.removeFav,
  });
  showConfirmDialog.value = true;
};
const showFavInfo = (idx: number) => {
  Object.assign(actionInfo, {
    title: '詳細資訊',
    action: 'info',
    idx: idx,
    callback: null,
  });
  showConfirmDialog.value = true;
};
const isShowInfo = computed(() => actionInfo.action === 'info');
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
  <v-container 
    fluid
    class="d-flex"
  >
    <RegionHeader
      v-once
      tag="h3"
      title="我的最愛"
      icon="favorite"
      color="title"
    />
    <v-data-table
      class="flex-1-1 bg-surface"
      :headers="headers"
      :items="displayedData"
      :page="tablePage"
    >
      <template #headers="prop">
        <tr class="bg-content">
          <th 
            v-for="column in prop.columns"
            :key="column.title"
            @click.stop="prop.toggleSort(column)"
            :class="[
              'v-data-table-column--align-center',
              'v-data-table__th',
              'v-data-table__th--sortable',
              prop.isSorted(column) ? 'v-data-table__th--sorted' : ''
            ]"
            :style="{
              width: column.width
            }"
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
      <template #bottom="bottomProp">
        <v-btn-group
          class="bg-content rounded-b-lg"
          divided
        >
          <v-spacer />
          <v-select
            class="flex-0-0 mr-2 align-self-center"
            density="compact"
            variant="plain"
            :modelValue="bottomProp.page"
            :items="[...Array(bottomProp.pageCount).keys()].map(i => i+1)"
            @update:model-value="tablePage = $event"
          />
          <v-btn
            icon="mdi-page-first" 
            variant="text"
            size="large"
            :disabled="tablePage === 1"
            @click="tablePage = 1"
          />
          <v-btn
            icon="mdi-chevron-left" 
            variant="text"
            :disabled="tablePage === 1"
            @click="
              tablePage = prevPage(tablePage, bottomProp.pageCount);
            "
          />
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            :disabled="tablePage === bottomProp.pageCount"
            @click="tablePage = nextPage(tablePage, bottomProp.pageCount)"
          />
          <v-btn
            icon="mdi-page-last"
            variant="text"
            :disabled="tablePage === bottomProp.pageCount"
            @click="tablePage = bottomProp.pageCount"
          />
        </v-btn-group>
      </template>
    </v-data-table>
    <TheDialog
      v-if="showConfirmDialog"
      v-model="showConfirmDialog"
      :height="isShowInfo ? 500 : undefined"
    >
      <template #title>
        <v-card-title 
          :class="[
            'font-weight-bold px-4 py-2 my-0',
            isShowInfo ? 'bg-title' : ''
          ]"
        >
          {{ actionInfo.title }}
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
          <MPResult :idx="actionInfo.idx ?? 0" />
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
  </v-container>
</template>

<style lang="scss" scoped>
.header-item {
  position: relative;
  height: 100%;
  width: 100%;
}
.sort-icon {
  position: absolute;
}

:deep(.v-table__wrapper) > table {
  height: calc((100% - var(--v-table-header-height)) * (v-bind(itemsInPage) / 10) + var(--v-table-header-height));
}
</style>

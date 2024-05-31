<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { createReusableTemplate } from '@vueuse/core';
import RegionHeader from './RegionHeader.vue';
import DataBlock from './DataBlock.vue';
import ExpansionPanel from './ExpansionPanel.vue';
import useCharacterStore from 'stores//useCharacterStore';
import { numFormat, round } from '@/utils/helpers';
import { calcAvgYield } from '@/utils/bdo';
import { getIcon } from '@/utils/icons';

const [DefTooltip, ReuseTooltip] = createReusableTemplate();

const dialogTitle = '角色設定';
defineExpose({
  title: dialogTitle
});
const childAttrs = {
  panel: {
    btnClass: 'px-3 py-1',
    textClass: 'column-flow ga-3 bg-surface px-5 pb-4 rounded-b-xl',
    rounded: 'xl',
    expand: true
  },
  info: {
    tag: 'h4',
    class: 'mb-2 text-center',
    titleSize: 'body-2',
    noSpace: true
  },
  textField: {
    type: 'number',
    inputmode: 'decimal',
    density: 'compact',
  },
} as const;

const characterState = useCharacterStore();
const { 
  crafts: craft, extraSuccessRate, profitMargin, valuePack, bonusValue,
} = storeToRefs(characterState);
const model = defineModel<boolean>();

const hourlyCrafts = computed(() => { // 每小時大量加工的材料份數
  // 大量加工時間介於 60 ~ 90 (秒/次)
  // 48 = 3600(秒/小時) / 75(秒/次)
  return {
    mid: round(characterState.avgCraft * 48, 0), // 48 = 3600 / 75
    min: round(characterState.avgCraft * 40, 0), // 40 = 3600 / 90
    max: round(characterState.avgCraft * 60, 0), // 60 = 3600 / 60
  };
});

const alchemyAvgYields = computed(() => {
  return calcAvgYield([1, 4], characterState.alchemy.extractMaxRate);
});
</script>

<template>
  <DefTooltip>
    <v-tooltip
      location="top"
      :eager="false"
    >
      <template #activator="{ props: actProps }">
        <v-icon
          v-bind="actProps"
          class="ml-1"
          :icon="getIcon('info')"
          size="x-small"
        />
      </template>
      <div
        class="text-center"
      >
        <component :is="$slots.default" />
      </div>
    </v-tooltip>
  </DefTooltip>

  <v-dialog
    width="450px"
    max-width="100vw"
    height="600px"
    max-height="100vh"
    v-model="model"
  >
    <div class="column-flow h-100 w-100">
      <RegionHeader
        v-once
        tag="h2"
        color="title"
      >
        {{ dialogTitle }}
      </RegionHeader>
      <v-sheet
        :class="[
          'flex-1-1-100 column-flow',
          'bg-content',
          'ga-3 px-2 py-3 rounded-b-lg',
          'overflow-auto',
        ]"
      >
        <ExpansionPanel
          v-bind="childAttrs.panel"
        >
          <template #title>
            <div
              class="d-flex align-center w-100"
            >
              <h3 class="flex-0-0 mx-1 text-body-1 font-weight-bold">
                交易所
              </h3>
              <v-divider
                opacity="1"
                color="black"
              />
            </div>
          </template>
          <div>
            <DataBlock
              v-memo="[profitMargin]"
              v-bind="childAttrs.info"
              title="實際領取"
              :value="`${round(100 * profitMargin, 3)}%`"
            />
            <v-checkbox-btn
              class="mt-0 ms-n1 text-body-2"
              density="compact"
              :model-value="valuePack"
              @update:model-value="
                characterState.updateCharacter('valuePack', $event as boolean)
              "
            >
              <template #label>
                <label
                  v-once
                  class="text-body-2 font-weight-bold"
                >價值禮包</label>
              </template>
            </v-checkbox-btn>
            <v-tooltip
              text="巨商之戒及家門名聲等"
              location="top"
              :eager="false"
            >
              <template #activator="{ props: actProps }">
                <v-combobox
                  v-memo="[bonusValue]"
                  label="其他額外領取額(%)"
                  v-bind="Object.assign({}, actProps, childAttrs.textField)"
                  class="mt-2"
                  step="0.1"
                  min="0"
                  :items="[0, 0.5, 1, 1.5, 5, 5.5, 6, 6.5]"
                  :model-value="bonusValue"
                  @update:model-value="
                    characterState.updateCharacter('bonusValue', $event)
                  "
                />
              </template>
            </v-tooltip>
          </div>
        </ExpansionPanel>

        <ExpansionPanel
          v-bind="childAttrs.panel"
        >
          <template #title>
            <div
              class="d-flex align-center w-100"
            >
              <h3 class="flex-0-0 mx-1 text-body-1 font-weight-bold">
                加工
              </h3>
              <v-divider
                opacity="1"
                color="black"
              />
            </div>
          </template>
          <div>
            <DataBlock 
              v-bind="childAttrs.info"
              title="每小時加工"
              :value="`約 ${numFormat(hourlyCrafts.mid)}份`"
            >
              <template #append>
                <ReuseTooltip>
                  <div>
                    以75秒估計，實際由被加工物決定。<br>
                    介於{{ numFormat(hourlyCrafts.min) }}份(90秒)至{{
                      numFormat(hourlyCrafts.max) }}份(60秒)。
                  </div>
                </ReuseTooltip>
              </template>
            </DataBlock>
            <v-text-field
              label="單次大量加工份數"
              v-bind="childAttrs.textField"
              min="1"
              :model-value="craft"
              @update:model-value="
                characterState.updateCharacter('crafts', $event)
              "
            />
          </div>
          <div>
            <v-label
              v-memo="[characterState.successRate]"
              class="mb-2 text-body-2 opacity-80"
              :text="`加工成功率 ${round(100 * characterState.successRate)}%`"
            />
            <v-text-field
              label="額外加工成功率(%)"
              v-bind="childAttrs.textField"
              step="any"
              min="0"
              max="100"
              :model-value="extraSuccessRate"
              @update:model-value="
                characterState.updateCharacter('extraSuccessRate', $event)
              "
            />
          </div>
        </ExpansionPanel>

        <ExpansionPanel
          v-bind="childAttrs.panel"
        >
          <template #title>
            <div
              class="d-flex align-center w-100"
            >
              <h3 class="flex-0-0 mx-1 text-body-1 font-weight-bold">
                煉金
              </h3>
              <v-divider
                opacity="1"
                color="black"
              />
            </div>
          </template>
          <div>
            <DataBlock 
              v-memo="[characterState.alchemyHourlyCrafts]"
              v-bind="childAttrs.info"
              title="每小時製作"
              :value="`約 ${numFormat(round(characterState.alchemyHourlyCrafts, 0))}次`"
            />
            <v-text-field
              label="製作時間(秒)"
              v-bind="childAttrs.textField"
              min="1"
              max="20"
              step="any"
              :model-value="characterState.alchemy.time"
              @update:model-value="
                characterState.updateCharacter('alchemy.time', $event)
              "
            />
          </div>
          <div>
            <DataBlock
              v-memo="[alchemyAvgYields]"
              v-bind="childAttrs.info"
              title="平均產出"
              :value="` ${numFormat(round(alchemyAvgYields))} 個/次`"
            >
              <template #append>
                <ReuseTooltip>
                  以產量範圍1~4估計。
                </ReuseTooltip>
              </template>
            </DataBlock>
            <v-text-field
              v-bind="childAttrs.textField"
              label="最大數量製作額外機率(%)"
              min="0"
              step="any"
              :model-value="characterState.alchemy.extractMaxRate"
              @update:model-value="
                characterState.updateCharacter('alchemy.extractMaxRate', $event)
              "
            />
          </div>
        </ExpansionPanel>
      </v-sheet>
    </div>
  </v-dialog>
</template>
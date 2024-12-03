<script setup lang="ts">
import RegionHeader from '@/components/RegionHeader.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';

const dialogTitle = '額外資訊';
defineExpose({
  title: dialogTitle
});
const model = defineModel<boolean>({
  default: true
});

const tabLists = [
  ['processing', '加工'],
  ['alchemy', '煉金']
] as const;
const tab = ref<typeof tabLists[number][0]>('processing');

</script>

<template>
  <v-dialog
    v-model="model"
    width="450px"
    max-width="100vw"
    height="600px"
    max-height="100vh"
    eager
  >
    <div
      class="
        column-flow h-100 w-100
        bg-content
        rounded-t-xl rounded-b-lg
      "
    >
      <RegionHeader
        tag="h2"
        color="title"
      >
        {{ dialogTitle }}
      </RegionHeader>

      <v-tabs
        v-model="tab"
        class="flex-0-0"
        bg-color="subtitle"
        density="compact"
      >
        <v-tab
          v-for="([tabKey, tabName]) in tabLists"
          :key="tabKey"
          class="font-weight-bold"
          base-color="black"
          color="white"
          :value="tabKey"
        >
          {{ tabName }}
        </v-tab>
      </v-tabs>

      <v-tabs-window
        v-model="tab"
        class="overflow-y-auto"
      >
        <v-tabs-window-item
          :value="tabLists[0][0]"
        >
          <v-sheet
            class="
              column-flow
              bg-content
              ga-3 px-2 py-3
            "
          >
            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  平均成品數量
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    成品數量為一個範圍內的隨機值，通常為1~4個。加工等級達到匠人1之後，每個數量的機率相等。而等級較低時，最大數量的機率較低。
                  </p>
                  <p class="mt-2">
                    每個數量的機率相等時，平均值為(最大值+最小值)/2。
                  </p>
                </div>
              </template>
            </ExpansionPanel>

            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  加工成功率
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    基礎成功率為70%，可透過食物、靈藥、煉金石/精靈石及文物與光明石增加成功率。實際成功率為70%*(1+額外成功率)。額外成功率43%時達到實際成功率100%
                  </p>
                </div>
              </template>
            </ExpansionPanel>

            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  大量加工時間
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    加工時間介於6秒~9秒，只與加工配方有關，例如木頭類6秒、羽毛類8秒、多數原礦石9秒、鋅礦石及熔化的金屬碎片6秒等。
                  </p>
                  <p>
                    而加工秒數乘以10倍即為大量加工所需時間，可透過測量加工時間得出或取中間值75秒。
                  </p>
                </div>
              </template>
            </ExpansionPanel>

            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  成本
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    一階加工及二階加工產物由原料價格及消耗量計算成本。
                  </p>
                </div>
              </template>
            </ExpansionPanel>

            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  原料
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    一階加工的材料由基本材料欄位選取。二階加工的材料由基本材料及一階加工欄位選取。
                  </p>
                </div>
              </template>
            </ExpansionPanel>
          </v-sheet>
        </v-tabs-window-item>


        <v-tabs-window-item
          :value="tabLists[1][0]"
        >
          <v-sheet
            class="
              flex-1-1-100 column-flow
              bg-content
              ga-3 px-2 py-3
            "
          >
            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  平均產量
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    成品數量為一個範圍內的隨機值，通常為1~4個，基本機率為每個數量相等，例如範圍1~4個基本機率即為100%/4=25%，而實際機率受到煉金熟練度加成影響。
                  </p>
                  <p class="mt-2">
                    煉金熟練度增加一般產物的最大產量機率，剩餘的機率由剩下的範圍均分。例如：產量範圍為1~4，最大數量機率增加9%，則產出4個的機率為(25+9)%=34%，剩下66%由1~3個均分為22%，平均值2.68個。公式可寫為
                    <code class="d-inline-block w-100 text-center">
                      基本平均產量+額外機率*(最大值-基本平均產量+0.5)
                    </code>
                    其中<code>基本平均產量=(最大值+最小值)/2</code>為未受熟練度加成的平均產量
                  </p>
                  <p class="mt-2">
                    煉金稀有產物多為1~2個，不受熟練度影響，詳見「稀有產物(藍色祕藥)產量」。
                  </p>
                </div>
              </template>
            </ExpansionPanel>

            <!-- https://grumpygreen.cricket/alchemy/ -->
            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h4 class="text-body-1 font-weight-bold">
                  稀有產物(藍色祕藥)比例
                </h4>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    根據國外論壇討論，煉金稀有產物產量平均為製作次數的30%。
                  </p>
                  <p>
                    因料理熟練度的說明包括「增加效果更好的料理獲得機率」，而煉金熟練度則沒有說明，推測熟練度不影響煉金稀有產物機率與數量。
                  </p>
                  <p class="mt-2">
                    煉金達到可獲得稀有產物的等級時，產量為製作次數的15%，再提高10級後達到30%。例如：「生命力的秘藥」於熟練1可獲得「強大生命力的秘藥」，此時可獲得製作次數的15%，而再專家1之後平均值即達到30%。
                  </p>
                </div>
              </template>
            </ExpansionPanel>
            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  稀有產物比例(延伸)
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    因煉金稀有產物數量介於1~2個，且不受熟練度影響觸發機率與產量機率。推測觸發製作稀有產物機率為20%，且1個與2個均為50%，平均值即為製作次數的30%。
                  </p>
                  <p>
                    料理可參考此基本值，以計算一般產物與稀有產物經過熟練度加成後的產量。
                  </p>
                </div>
              </template>
            </ExpansionPanel>

            <ExpansionPanel
              btnClass="px-3 py-2"
              textClass="bg-surface rounded-b-xl"
              baseColor="surface"
              rounded="xl"
            >
              <template #title>
                <h3 class="text-body-1 font-weight-bold">
                  原料需求估計
                </h3>
              </template>
              <template #text>
                <div class="mb-2 px-3 text-body-2">
                  <p>
                    一般產物與稀有產物階設定時，會計算所需製作次數較高的作為基準。而勾選「全製作為稀有產物」時僅考慮稀有產物需求量，並且會將一般產物量轉為稀有產物(註)，以此估計所需的製作次數。<br>
                    <span class="text-caption">
                      註：透過簡易臉金可將三瓶綠色靈藥與藍色液體試藥合成為藍色靈藥。
                    </span>
                  </p>
                  <p class="mt-2">
                    勾選「全製作為稀有產物」時，所需的製作次數為<br>
                    <code class="d-inline-block w-100 text-center">
                      需求量 / (一般產物平均產量/3 + 0.3)
                    </code>
                  </p>
                </div>
              </template>
            </ExpansionPanel>
          </v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-dialog>
</template>

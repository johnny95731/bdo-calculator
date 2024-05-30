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
</script>

<template>
  <v-dialog
    width="450px"
    max-width="100vw"
    height="600px"
    max-height="100vh"
    v-model="model"
  >
    <div class="column-flow h-100 w-100">
      <RegionHeader

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
          btnClass="px-3 py-2 text-caption"
          textClass="bg-surface rounded-b-xl"
          baseColor="surface"
          rounded="xl"
          title="大量加工"
        >
          <template #title>
            <h3 class="text-body-1 font-weight-bold">
              大量加工時間
            </h3>
          </template>
          <template #text>
            <p
              class="mb-2 px-3 text-body-2"
            >
              每種材料有固定加工時間，介於6秒~9秒，例如木頭6秒、羽毛8秒、多數礦石9秒、鋅礦石及熔化的金屬碎片6秒等。<br>
              秒數乘以10倍即為大量加工所耗費的時間。
            </p>
          </template>
        </ExpansionPanel>
      </v-sheet>
    </div>
  </v-dialog>
</template>
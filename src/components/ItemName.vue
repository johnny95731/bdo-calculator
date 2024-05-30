<script setup lang="ts">
import npcItem_ from '@/utils/npcSellingItems.json';

const npcItem = npcItem_.map((item) => {
  return {
    name: item.name,
    price: item.price,
  };
});
const model = defineModel<string | undefined>();
model.value = model.value || '';
defineEmits<{
  (e: 'change', val: string): void
}>();
</script>

<template>
  <v-combobox
    label="名稱"
    maxlength="15"
    :items="npcItem"
    item-title="name"
    v-model="model"
    @change="$emit('change', model || '')"
  >
    <template #item="{ item }">
      <v-list-item
        :title="item.raw.name as string"
        @Click="model = item.raw.name"
      />
    </template>
  </v-combobox>
</template>
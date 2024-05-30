<script setup lang="ts">
import { getIcon } from '@/utils/icons';
import { computed } from 'vue';

type Props = {
  type: 'append' | 'close'
}
const props = defineProps<Props>();
const attrs = computed(() => (
  props.type === 'append' ? {
    icon: getIcon(props.type),
    class: 'bg-surface mt-1 mb-3',
    size: 'large',
  } : {
    icon: getIcon(props.type),
  }
));
</script>

<template>
  <v-btn
    v-bind="attrs"
    variant="plain"
    density="compact"
  />
</template>

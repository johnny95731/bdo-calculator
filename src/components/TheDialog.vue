<script setup lang="ts">
import { getCurrentInstance } from 'vue';
type Props = {
  title?: string,
  text?: string,
  width?: number,
  height?: number,
  icon?: string,
  confirmDisabled?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  title: 'title',
  text: undefined,
  width: 300,
  height: undefined,
  icon: undefined,
  confirmDisabled: false
});
const model = defineModel<boolean>({
  default: true,
});
const emits = defineEmits(['confirm']);
const thisInstance = getCurrentInstance();

function confirm() {
  if (thisInstance?.vnode?.props?.onConfirm) emits('confirm');
  else model.value = false;
}
</script>

<template>
  <v-dialog
    :width="props.width"
    :height="props.height"
    :model-value="model"
    @update:model-value="model = $event"
  >
    <v-card
      :prepend-icon="props.icon ? `mdi-${props.icon}` : undefined"
      :width="props.width"
      :height="props.height"
    >
      <v-card-item class="pa-0">
        <slot name="title">
          <v-card-title
            tag="h6"
            class="font-weight-bold px-4 py-3"
          >
            {{ props.title }}
          </v-card-title>
        </slot>
      </v-card-item>
      <slot name="text">
        <v-card-text>
          <slot>{{ props.text }}</slot>
        </v-card-text>
      </slot>
      <template #actions>
        <slot name="actions">
          <v-spacer />
          <v-btn @click="model = false">
            取消
          </v-btn>
          <v-btn 
            :disabled="props.confirmDisabled"
            @click="confirm"
          >
            確定
          </v-btn>
        </slot>
      </template>
    </v-card>
  </v-dialog>
</template>

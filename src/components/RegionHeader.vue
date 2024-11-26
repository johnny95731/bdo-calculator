<script setup lang="ts">
import { computed } from 'vue';
import { getRoundedClass } from '@/utils/helpers.ts';
import { getIcon } from '@/utils/icons.ts';
import type { IconKeys } from '@/utils/icons.ts';

type Props = {
  tag?: string,
  title?: string,
  icon?: string | IconKeys,
  rounded?: string,
  color?: string,
  textColor?: string,
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'label',
  title: undefined,
  icon: undefined,
  rounded: 't-xl',
  color: undefined,
  textColor: undefined,
});

const validRounded = computed(() => {
  return props.rounded === '' ? 'rounded' : getRoundedClass(props.rounded);
});
// @ts-expect-error
const icon_ = getIcon(props.icon) ?? props.icon;
</script>

<template>
  <component
    :is="tag"
    :class="[
      'px-4 py-1',
      'font-weight-bold text-h6 text-left',
      color ? `bg-${color}` : '',
      textColor ? `text-${textColor}` : '',
      validRounded
    ]"
  >
    <v-icon
      v-if="icon"
      class="mr-1"
    >
      {{ icon_ }}
    </v-icon>
    <slot>{{ title ?? '標題' }}</slot>
    <slot name="append" />
  </component>
</template>

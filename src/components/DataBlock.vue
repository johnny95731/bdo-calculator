<script lang="ts" setup>
import { computed } from 'vue';
import { numFormat } from '@/utils/helpers';
type Props = {
  tag?: string;
  class?: string;
  title: string;
  value?: number | string;
  titleSize?: string;
  titleWeight?: string;
  valueSize?: string | null;
  valueWeight?: string | null;
  stack?: boolean;
  noSpace?: boolean;
  spaceLength?: number | string;
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  class: undefined,
  value: undefined,
  titleSize: 'body-1',
  titleWeight: 'bold',
  valueSize: undefined,
  valueWeight: undefined,
  stack: false,
  noSpace: false,
  spaceLength: undefined,
});

const valueText = computed(() => {
  const text = typeof props.value === 'number' ?
    numFormat(props.value) :
    props.value;
  return text || null;
});

const stack_ = computed(() => {
  return props.stack ? '' : 'd-inline';
});
const space = computed(() => {
  if (props.noSpace) return null;
  if (props.spaceLength && !isNaN(+props.spaceLength)) {
    let length = +props.spaceLength;
    let space = '';
    while (length >= 1) {
      length--;
      space += '&emsp;';
    }
    if (length > 0) space += '&ensp;'; // length has decimal
    return space;
  }
  return ' ';
});

const titleClass = computed(() => {
  const size = props.titleSize ? `text-${props.titleSize}` : 'text-body-1';
  const weight = props.titleWeight ?
    `font-weight-${props.titleWeight}` :
    'font-weight-bold';
  return [stack_.value, size, weight];
});
const valueClass = computed(() => {
  const size = (
    props.valueSize ? `text-${props.valueSize}` :
      props.titleSize ? `text-${props.titleSize}` :
        ''
  );
  const weight = (
    props.valueWeight ? `font-weight-${props.valueWeight}` :
      props.titleWeight ?`font-weight-${props.titleWeight}` :
        ''
  );
  return [stack_.value, size, weight];
});

</script>

<template>
  <div
    :class="props.class"
  >
    <component
      :is="props.tag"
      :class="titleClass"
    >
      {{ title }}
    </component>
    <!-- eslint-disable vue/no-v-html -->
    <span
      v-if="space"
      v-html="space"
    />
    <div
      v-if="valueText"
      :class="valueClass"
    >
      {{ valueText }}<slot />
    </div><slot name="append" />
  </div>
</template>

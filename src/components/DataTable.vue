<script lang="ts" setup>
import { numFormat } from '@/utils/helpers';
import { computed } from 'vue';

type header = {
  name: string,
  class?: string,
}
type Props = {
  title?: string,
  titleTag?: string,
  titleClass?: string,
  headerClass?: string,
  headers?: {
    title: header,
    value: header,
  },
  data: Array<{
    textSize?: string
    label: string,
    value?: string | number,
    class?: string,
    noSpace?: boolean,
  }>
  itemSize?: string,
  labelWidth?: number | string
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  titleTag: 'label',
  titleClass: undefined,
  headerClass: undefined,
  headers: undefined,
  itemSize: 'body-2',
  labelWidth: '5rem',
});

const labelWidth = computed(() => 
  typeof props.labelWidth === 'number' ?
    `${props.labelWidth}rem` :
    props.labelWidth
);

const itemTextSize = computed(() => {
  return `text-${props.itemSize}`;
});
</script>

<template>
  <div>
    <table
      class="data-table"
    >
      <caption
        v-if="title"
        :class="titleClass"
      >
        <slot name="title">
          <component
            :is="titleTag"
          >
            {{ title }}
          </component>
        </slot>
      </caption>
      <slot name="cols">
        <colgroup>
          <col
            :style="{width: labelWidth}"
            colspan="1"
          >
          <col colspan="1">
        </colgroup>
      </slot>
      <thead v-if="headers">
        <tr :class="headerClass">
          <th>
            {{ headers.title.name }}
          </th>
          <th>{{ headers.value.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in props.data"
          :key="i"
          :class="[
            itemTextSize,
            item.class
          ]"
        >
          <th class="font-weight-bold">
            {{ item.label }}
          </th>
          <td>
            {{ typeof item.value === 'number' ? numFormat(item.value) : item.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.data-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  caption-side: top;
  caption {
    text-align: left;
    margin-bottom: 4px;
  }
  th {
    text-align: left;
  }
  td {
    white-space: pre-wrap;
  }
  tr > td:first-child {
    width: 10px;
  }
}
</style>
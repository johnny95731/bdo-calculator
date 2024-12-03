<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getIcon } from '@/utils/icons';

type Props = {
  title?: string
  baseColor?: string,
  panelColor?: string,
  hoverColor?: string,
  rounded?: string,
  class?: string,
  btnClass?: string,
  textClass?: string,
  absolute?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  class: undefined,
  baseColor: undefined,
  panelColor: undefined,
  hoverColor: undefined,
  rounded: undefined,
  btnClass: undefined,
  textClass: 'bg-surface',
  absolute: false,
});

const isHovering = ref(false);
// 展開panel
const expand = defineModel<boolean>('expand', { default: false });

const rounded = computed(() => {
  if (props.rounded) {
    return expand.value ?
      `rounded-t-${props.rounded}` :
      `rounded-${props.rounded}`;
  } else return '';
});

const btnColor_ = computed(() => {
  let bgColor = (
    isHovering.value ?
      props.hoverColor || 'hover' :
      props.baseColor
  );
  if (bgColor && !bgColor.startsWith('bg-') && bgColor !== 'hover') bgColor = `bg-${bgColor}`;
  return bgColor;
});

const textClass_ = computed(() => {
  let css: string = '';
  if (props.textClass.length) css = css.concat(props.textClass);
  if (props.panelColor) css = css.concat(` bg-${props.panelColor}`);
  return css;});
</script>

<template>
  <div
    :class="[
      'panel',
      props.class,
      props.rounded ? `rounded-${props.rounded}` : ''
    ]"
  >
    <v-hover
      v-slot="{ props: hoverProps }"
      @update:model-value="isHovering = $event"
    >
      <button
        v-bind="hoverProps"
        :class="[
          'activator justify-space-between',
          props.btnClass,
          rounded,
        ]"
        type="button"
        @click="expand = !expand"
      >
        <div
          :class="[
            'overlay',
            btnColor_
          ]"
        />
        <slot name="title">
          <div>
            {{ props.title }}
          </div>
        </slot>
        <v-icon
          :class="[
            'chevron flex-0-0',
            expand ? 'rotate' : '',
            props.rounded === 'shaped' ? 'mr-3' : 0,
          ]"
          :icon="getIcon('expandable')"
          end
        />
      </button>
    </v-hover>
    <v-expand-transition>
      <div
        v-show="expand"
        :class="[
          'content pa-2',
          textClass_,
          props.absolute ? 'absolute' : ''
        ]"
      >
        <slot />
        <slot name="text" />
      </div>
    </v-expand-transition>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  position: relative;
  width: 100%;
}
.activator {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  >:deep(*) {
    z-index: 0;
  }
}

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: white;
}

.hover {
  opacity: calc(0.04 + var(--v-hover-opacity) * var(--v-theme-surface-overlay-multiplier));
  background-color: currentColor;
}

.absolute {
  position: absolute;
  width: 100%;
}

.chevron {
  transition: rotate .3s;
}
.rotate {
  rotate: 180deg;
}
</style>

<script setup lang="ts">
import { pages } from '@/plugins/route';
import { IconKeys, getIcon } from '@/utils/icons';
</script>

<template>
  <v-container
    v-once
    class="h-100"
  >
    <div
      v-once
      class="px-2 py-2 text-center"
    >
      <h2>
        黑色沙漠生活計算機
      </h2>
      簡易估計利潤、花費時間、產量，以及從產量估計需求。
    </div>
    <div class="d-flex justify-center ga-16 my-3">
      <v-card
        v-for="page in pages.slice(1)"
        :key="page.title"
        class="d-flex flex-column"
        width="300"
        :to="page.path"
      >
        <v-card-title
          tag="h2"
          :class="[
            'mb-2 py-1 font-weight-black',
            `bg-${page.name}`
          ]"
        >
          <v-icon :icon="getIcon(page.name as IconKeys)" />
          {{ page.title }}
        </v-card-title>
        <v-card-text
          class="pb-0 flex-1-1"
        >
          {{ page.description }}
        </v-card-text>
        <v-card-actions
          class="px-3"
          style="min-height: auto;"
        >
          <v-spacer />
          <v-icon
            density="comfortable"
            size="small"
          >
            {{ getIcon('goto') }}
          </v-icon>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
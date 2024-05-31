<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const ExtraDescriptions = defineAsyncComponent({
  loader: () => import('@/components/ExtraDescriptions.vue')
});
const CharacterSetting = defineAsyncComponent({
  loader: () => import('@/components/CharacterSetting.vue')
});
import useCharacterStore from 'stores//useCharacterStore';
import useProcessingStore from 'stores//useProcessingStore';
import useAlchemyStore from 'stores//useAlchemyStore';
import { pages } from './plugins/route';
import { IconKeys, getIcon } from './utils/icons';
import links from '@/utils/links.json';

// 遊戲額外資訊
const showExtraDescriptions = ref(false);
const extraDescriptionsFist = ref(false); // 第一次開啟
// 角色設定欄
const showCharacterSetting = ref(false);
const characterSettingFist = ref(false);

const route = useRoute();
const navDrawerState = reactive({
  rail: false,
  temporary: route.path !== '/',
  model: route.path === '/'
});
const clickAppBarNavIcon = () => {
  const key = navDrawerState.temporary ? 'model' : 'rail';
  Object.assign(navDrawerState, { [key]: !navDrawerState[key] });
};

const router = useRouter();
router.beforeEach((to) => {
  // navigation-drawer，以類似youtube方式執行
  // 首頁為`rail`方式，完整 <--> 縮小到剩icon
  // 其他頁以temporary，完整+overlay <--> 完全收起(看不見)
  const isHome = to.path === '/';
  Object.assign(navDrawerState, { 
    temporary: !isHome,
    model: isHome,
  });
});

// update localstorage when leave.
const characterState = useCharacterStore();
const processingState = useProcessingStore();
const alchemyState = useAlchemyStore();
window.addEventListener('beforeunload', () => {
  characterState.updateStorage();
  processingState.updateStorage();
  alchemyState.updateStorage();
});
</script>

<template>
  <v-app>
    <v-app-bar
      v-once
      flat
      density="compact"
    >
      <v-app-bar-nav-icon @click="clickAppBarNavIcon" />
      <v-app-bar-title
        tag="h1"
        :class="[
          'overflow-hidden text-no-wrap',
          'text-h6 font-weight-bold',
          'py-2'
        ]"
        style="user-select: none;"
      >
        黑色沙漠生活計算機
      </v-app-bar-title>
      <template #append>
        <v-btn
          :icon="getIcon('info')"
          density="compact"
          size="large"
          @click.once="extraDescriptionsFist = true"
          @click="showExtraDescriptions = !showExtraDescriptions"
        />
        <v-btn
          :icon="getIcon('gear')"
          density="compact"
          size="large"
          @click.once="characterSettingFist = true"
          @click="showCharacterSetting = !showCharacterSetting"
        />
      </template>
    </v-app-bar>
    <ExtraDescriptions
      v-if="extraDescriptionsFist"
      v-model="showExtraDescriptions"
    />
    <CharacterSetting
      v-if="characterSettingFist"
      v-model="showCharacterSetting"
    />

    <v-navigation-drawer
      width="180"
      :temporary="navDrawerState.temporary"
      v-model:rail="navDrawerState.rail"
      v-model="navDrawerState.model"
    >
      <nav
        v-once
        class="h-100 my-n1 column-flow ga-1"
      >
        <v-list-item
          v-for="page in pages"
          :key="page.title"
          link
          :to="page.path"
          :prepend-icon="page.name && getIcon(page.name as IconKeys)"
        >
          <v-list-item-title
            class="w-auto text-left"
          >
            <label
              class="text-body-1 font-weight-bold"
            >
              {{ page.title }}
            </label>
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          tag="button"
          id="link"
          :prepend-icon="getIcon('link')"
        >
          <v-list-item-title
            class="w-auto text-left"
          >
            <label
              class="text-body-1 font-weight-bold"
            >
              相關連結
            </label>
          </v-list-item-title>
        </v-list-item>
        <v-menu
          open-on-hover
          location="end"
          activator="#link"
        >
          <v-list>
            <v-list-item
              v-for="link in links"
              :key="link.name"
              link
              :href="link.href"
            >
              <v-list-item-title
                class="w-auto text-left"
              >
                <label
                  class="text-body-1 font-weight-bold"
                >
                  {{ link.name }}
                </label>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </nav>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
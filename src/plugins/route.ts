import { createRouter, createWebHashHistory } from 'vue-router';
import TheIntro from '../views/TheIntro.vue';
const MassProcessing = () => import('@/views/MassProcessing.vue');
const TheAlchemy = () => import('@/views/TheAlchemy.vue');

const base = process.env.NODE_ENV === 'production' ? '/bdo-calculator' : '';

export const pages: {
  component: typeof TheIntro | typeof MassProcessing | typeof TheAlchemy,
  path: string,
  name: string,
  title: string,
  description?: string,
}[] = [
  {
    component: TheIntro,
    path: '/',
    name: 'home',
    title: '首頁',
  },
  {
    component: MassProcessing,
    path: '/processing',
    name: 'processing',
    title: '加工',
    description: '一般物品大量加工，包含混和、研磨、砍柴、曬乾、過濾、加熱。',
  },
  {
    component: TheAlchemy,
    path: '/alchemy',
    name: 'alchemy',
    title: '煉金',
    description: '靈藥製作、高級秘藥合成(簡易煉金)。',
  },
] as const;

export const router = createRouter({
  history: createWebHashHistory(base),
  routes: pages.map((obj) => ({
    component: obj.component,
    path: obj.path,
    name: obj.name,
  }))
});

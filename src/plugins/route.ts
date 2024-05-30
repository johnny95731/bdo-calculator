import { createRouter, createWebHistory } from 'vue-router';
import TheIntro from '../views/TheIntro.vue';
const MassProcessing = () => import('@/views/MassProcessing.vue');
const TheAlchemy = () => import('@/views/TheAlchemy.vue');
import type { IconKeys } from '@/utils/icons';

export const routePages: {
  component: typeof TheIntro | typeof MassProcessing,
  href: `/${string}`,
  title: string,
  description?: string,
  icon: IconKeys,
  color?: string,
}[] = [
  {
    component: TheIntro,
    href: '/',
    title: '首頁',
    icon: 'home',
  },
  {
    component: MassProcessing,
    href: '/processing',
    title: '加工',
    description: '一般物品大量加工，包含混和、研磨、砍柴、曬乾、過濾、加熱。',
    icon: 'processing',
    color: 'bg-processing'
  },
  {
    component: TheAlchemy,
    href: '/alchemy',
    title: '煉金',
    description: '靈藥製作、高級秘藥合成(簡易煉金)。',
    icon: 'alchemy',
    color: 'bg-alchemy',
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routePages.map((obj) => ({
    path: obj.href, component: obj.component
  }))
});
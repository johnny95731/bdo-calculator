export const pages: {
  path: string,
  name: string,
  title: string,
  description?: string,
}[] = [
  {
    path: '/',
    name: 'home',
    title: '首頁',
  },
  {
    path: '/processing',
    name: 'processing',
    title: '加工',
    description: '一般物品大量加工，包含混和、研磨、砍柴、曬乾、過濾、加熱。',
  },
  {
    path: '/alchemy',
    name: 'alchemy',
    title: '煉金',
    description: '靈藥製作、高級秘藥合成(簡易煉金)。',
  },
] as const;


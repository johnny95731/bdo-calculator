const iconMap = {
  'alchemy': 'mdi-flask-empty',
  'append': 'mdi-plus',
  'character': 'mdi-account-circle',
  'close': 'mdi-close',
  'delete': 'mdi-delete',
  'editable': 'mdi-pencil',
  'expandable': 'mdi-chevron-down',
  'gear': 'mdi-cog',
  'favorite': 'mdi-star',
  'goto': 'mdi-arrow-right',
  'home': 'mdi-home',
  'info': 'mdi-information-outline',
  'link': 'mdi-link',
  'processing': 'mdi-hammer',
  'save': 'mdi-file',
};

export type IconKeys = keyof typeof iconMap

export const getIcon = (name: IconKeys) => {
  return iconMap[name];
};
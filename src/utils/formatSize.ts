// size 类的 name
const SIZE_STYLE_NAMES = [
  'width',
  'height',
  'left',
  'right',
  'top',
  'bottom',
  'textIndent',
  'borderWidth',
  'lineHeight',
  'backgroundSize',
  'fontSize',
  'flexBasis',
  'letterSpacing',
];

// size 类包含的 name
const SIZE_INCLUDED_NAMES = ['width', 'height', 'margin', 'padding'];

// 格式化 size 类型属性值为 px
export const formatSize = (propName: string, size: string) => {
  const lowerPropName = propName.toLowerCase();
  if (
    SIZE_STYLE_NAMES.includes(propName) ||
    SIZE_INCLUDED_NAMES.findIndex((item) => lowerPropName.indexOf(item) > -1) >
      -1
  ) {
    return /^\d+$/.test(size) ? `${size}px` : size;
  }
  return size;
};

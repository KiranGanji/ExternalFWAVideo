import {Easing} from 'remotion';

export const colors = {
  bgDeep: '#F8FBFF',
  bgMid: '#E8F3FF',
  bgGlow: '#B9E0FF',
  uhgBlue: '#002677',
  brightBlue: '#0097E6',
  cyanGlow: '#32C5FF',
  optumGold: '#F2B544',
  alertRed: '#FF5A5F',
  alertAmber: '#FFA94D',
  signalGreen: '#12B76A',
  nodeSurface: '#FFFFFF',
  nodeBorder: '#A8D8F8',
  nodeBorderHot: '#36B3F7',
  codeSurface: '#FFFFFF',
  codeBorder: '#CFE5F8',
  textPrimary: '#102A43',
  textSecondary: '#486581',
  textMuted: '#829AB1',
} as const;

export const fonts = {
  display: '"Aptos Display", "Segoe UI", sans-serif',
  body: '"Aptos", "Segoe UI", sans-serif',
  mono: '"Cascadia Code", "Consolas", monospace',
} as const;

export const fontSizes = {
  hero: 84,
  subHero: 48,
  body: 28,
  chip: 22,
  mono: 18,
  stat: 160,
} as const;

export const easings = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  outQuart: Easing.bezier(0.25, 1, 0.5, 1),
  inOutSine: Easing.bezier(0.37, 0, 0.63, 1),
} as const;

export const springs = {
  gentle: {damping: 20, stiffness: 90, mass: 1},
  standard: {damping: 18, stiffness: 120, mass: 1},
  snappy: {damping: 14, stiffness: 180, mass: 0.8},
} as const;

export const shadows = {
  soft: '0 18px 42px rgba(85, 119, 157, 0.16)',
  glow: '0 0 40px rgba(50, 197, 255, 0.22)',
} as const;

export const rgba = (hex: string, alpha: number) => {
  const cleaned = hex.replace('#', '');
  const normalized =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((value) => value + value)
          .join('')
      : cleaned;

  const bigint = Number.parseInt(normalized, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

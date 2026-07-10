import {interpolate} from 'remotion';

type UseStaggerOptions = {
  frame: number;
  start: number;
  step: number;
  duration: number;
  index: number;
};

export const useStagger = ({
  frame,
  start,
  step,
  duration,
  index,
}: UseStaggerOptions) => {
  const itemStart = start + index * step;
  return interpolate(frame, [itemStart, itemStart + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

import {interpolate, type EasingFunction} from 'remotion';
import {easings} from '../../config/tokens';

type UseEasedFrameOptions = {
  frame: number;
  start: number;
  duration: number;
  easing?: EasingFunction;
};

export const useEasedFrame = ({
  frame,
  start,
  duration,
  easing = easings.outExpo,
}: UseEasedFrameOptions) => {
  return interpolate(frame, [start, start + duration], [0, 1], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

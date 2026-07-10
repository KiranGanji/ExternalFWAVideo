import {interpolate, useCurrentFrame} from 'remotion';

type CounterProps = {
  to: number;
  durationInFrames?: number;
  suffix?: string;
  format?: 'comma' | 'plain';
};

export const Counter = ({
  to,
  durationInFrames = 70,
  suffix = '',
  format = 'plain',
}: CounterProps) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const value = Math.round(to * progress);
  const output = format === 'comma' ? value.toLocaleString('en-US') : String(value);
  return <>{`${output}${suffix}`}</>;
};

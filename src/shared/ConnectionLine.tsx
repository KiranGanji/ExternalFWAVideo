import {interpolate, useCurrentFrame} from 'remotion';
import {colors, rgba} from '../config/tokens';

type Point = {
  x: number;
  y: number;
};

type ConnectionLineProps = {
  start: Point;
  end: Point;
  control?: Point;
  color?: string;
  pulsing?: boolean;
  strokeWidth?: number;
  startFrame?: number;
  duration?: number;
};

export const ConnectionLine = ({
  start,
  end,
  control,
  color = colors.cyanGlow,
  pulsing = false,
  strokeWidth = 2,
  startFrame = 0,
  duration = 24,
}: ConnectionLineProps) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctrl = control ?? {
    x: (start.x + end.x) / 2,
    y: Math.min(start.y, end.y) - 80,
  };
  const path = `M ${start.x} ${start.y} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`;
  const packetT = ((frame - startFrame) / 40) % 1;
  const point = {
    x:
      (1 - packetT) * (1 - packetT) * start.x +
      2 * (1 - packetT) * packetT * ctrl.x +
      packetT * packetT * end.x,
    y:
      (1 - packetT) * (1 - packetT) * start.y +
      2 * (1 - packetT) * packetT * ctrl.y +
      packetT * packetT * end.y,
  };

  return (
    <svg
      style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}
      viewBox="0 0 1920 1080"
    >
      <path
        d={path}
        fill="none"
        stroke={rgba(color, 0.72)}
        strokeWidth={strokeWidth}
        strokeDasharray="900"
        strokeDashoffset={900 - progress * 900}
        strokeLinecap="round"
      />
      {pulsing ? (
        <circle cx={point.x} cy={point.y} r={4} fill={rgba(color, 0.95)} />
      ) : null}
    </svg>
  );
};

import type {ReactNode} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fonts, rgba} from '../config/tokens';

type ReasoningBranchProps = {
  label: string;
  icon?: ReactNode;
  angle: number;
  color?: string;
  appearAtFrame: number;
  origin?: {x: number; y: number};
  length?: number;
};

export const ReasoningBranch = ({
  label,
  icon,
  angle,
  color = colors.cyanGlow,
  appearAtFrame,
  origin = {x: 960, y: 372},
  length = 320,
}: ReasoningBranchProps) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [appearAtFrame, appearAtFrame + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const travel = interpolate(frame, [appearAtFrame + 26, appearAtFrame + 74], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rad = (angle * Math.PI) / 180;
  const end = {
    x: origin.x + Math.cos(rad) * length,
    y: origin.y + Math.sin(rad) * length * 0.7 - 18,
  };
  const ctrl = {
    x: origin.x + Math.cos(rad) * length * 0.48,
    y: origin.y + Math.sin(rad) * length * 0.16 - 120,
  };
  const packet = {
    x:
      (1 - travel) * (1 - travel) * origin.x +
      2 * (1 - travel) * travel * ctrl.x +
      travel * travel * end.x,
    y:
      (1 - travel) * (1 - travel) * origin.y +
      2 * (1 - travel) * travel * ctrl.y +
      travel * travel * end.y,
  };
  const labelScale = interpolate(frame, [appearAtFrame + 18, appearAtFrame + 50], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <>
      <svg
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
        viewBox="0 0 1920 1080"
      >
        <path
          d={`M ${origin.x} ${origin.y} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`}
          fill="none"
          stroke={rgba(color, 0.78)}
          strokeWidth={2.5}
          strokeDasharray="900"
          strokeDashoffset={900 - progress * 900}
          strokeLinecap="round"
        />
        <circle cx={packet.x} cy={packet.y} r={4.5} fill={rgba(color, 0.94)} />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: end.x - 100,
          top: end.y - 24,
          transform: `scale(${labelScale})`,
          opacity: progress,
          minWidth: 200,
          padding: '12px 16px',
          borderRadius: 999,
          border: `1px solid ${rgba(color, 0.35)}`,
          background: `linear-gradient(90deg, ${rgba(color, 0.16)} 0%, ${rgba(
            colors.bgMid,
            0.72,
          )} 100%)`,
          color: colors.textPrimary,
          fontFamily: fonts.body,
          fontSize: 21,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 12px 28px ${rgba(color, 0.16)}`,
        }}
      >
        {icon ? <span>{icon}</span> : null}
        <span>{label}</span>
      </div>
    </>
  );
};

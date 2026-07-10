import type {CSSProperties, ReactNode} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../config/tokens';

type GradientTextProps = {
  children: ReactNode;
  from?: number;
  duration?: number;
  style?: CSSProperties;
};

export const GradientText = ({
  children,
  from = 0,
  duration = 40,
  style,
}: GradientTextProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [from, from + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 18}px) scale(${0.96 + reveal * 0.04})`,
        background: `linear-gradient(90deg, ${colors.textPrimary} 0%, ${colors.cyanGlow} 55%, ${colors.optumGold} 100%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        filter: `drop-shadow(0 0 22px rgba(126, 232, 250, ${reveal * 0.18}))`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

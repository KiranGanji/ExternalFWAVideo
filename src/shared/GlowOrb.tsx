import type {CSSProperties} from 'react';
import {colors, rgba} from '../config/tokens';

type GlowOrbProps = {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  style?: CSSProperties;
};

export const GlowOrb = ({
  size = 360,
  color = colors.brightBlue,
  opacity = 0.3,
  blur = 30,
  style,
}: GlowOrbProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${rgba(color, opacity)} 0%, ${rgba(
          color,
          opacity * 0.32,
        )} 38%, ${rgba(color, 0)} 72%)`,
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
};

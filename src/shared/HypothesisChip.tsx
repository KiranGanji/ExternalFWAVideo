import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fonts, rgba} from '../config/tokens';

type HypothesisChipProps = {
  label: string;
  state?: 'forming' | 'idle' | 'selected';
  size?: 'sm' | 'md';
};

export const HypothesisChip = ({
  label,
  state = 'idle',
  size = 'md',
}: HypothesisChipProps) => {
  const frame = useCurrentFrame();
  const shimmer = ((frame * 7) % 160) - 50;
  const height = size === 'sm' ? 48 : 60;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: size === 'sm' ? '12px 18px' : '15px 22px',
        minHeight: height,
        borderRadius: 999,
        border: `1px solid ${
          state === 'selected' ? colors.nodeBorderHot : colors.nodeBorder
        }`,
        background:
          state === 'selected'
            ? `linear-gradient(90deg, ${rgba(colors.brightBlue, 0.22)} 0%, ${rgba(
                colors.optumGold,
                0.14,
              )} 100%)`
            : `linear-gradient(135deg, ${rgba(colors.nodeSurface, 0.96)} 0%, ${rgba(
                colors.bgMid,
                0.92,
              )} 100%)`,
        boxShadow:
          state === 'selected'
            ? `0 0 28px ${rgba(colors.cyanGlow, 0.16)}`
            : '0 12px 28px rgba(85, 119, 157, 0.14)',
        display: 'inline-flex',
        alignItems: 'center',
        color: colors.textPrimary,
        fontFamily: fonts.mono,
        fontSize: size === 'sm' ? 18 : 20,
        letterSpacing: '0.015em',
      }}
    >
      {state === 'forming' ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${shimmer}px)`,
            background: `linear-gradient(90deg, transparent 0%, ${rgba(
              colors.cyanGlow,
              0.18,
            )} 50%, transparent 100%)`,
            width: 90,
          }}
        />
      ) : null}
      <span
        style={{
          opacity: interpolate(frame, [0, 10], [0.65, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          position: 'relative',
          zIndex: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
};

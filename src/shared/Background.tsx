import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, rgba} from '../config/tokens';
import {GlowOrb} from './GlowOrb';

type BackgroundProps = {
  glowPosition?: 'center' | 'topLeft' | 'topRight';
  intensity?: number;
  tint?: 'blue' | 'alert';
  alertMix?: number;
};

const glowStyles = {
  center: {left: '50%', top: '50%', transform: 'translate(-50%, -50%)'},
  topLeft: {left: '14%', top: '18%', transform: 'translate(-50%, -50%)'},
  topRight: {left: '84%', top: '18%', transform: 'translate(-50%, -50%)'},
} as const;

export const Background = ({
  glowPosition = 'center',
  intensity = 1,
  tint = 'blue',
  alertMix = 0,
}: BackgroundProps) => {
  const frame = useCurrentFrame();
  const pulse = 0.88 + Math.sin(frame / 38) * 0.06;
  const mix = tint === 'alert' ? Math.max(alertMix, 0.38) : alertMix;
  const alertOpacity = interpolate(mix, [0, 1], [0, 0.34]);

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at 18% 16%, ${rgba(colors.optumGold, 0.12 * intensity)} 0%, transparent 32%),
          radial-gradient(circle at 50% 50%, ${rgba(colors.bgGlow, 0.56 * intensity)} 0%, transparent 50%),
          radial-gradient(circle at 86% 18%, ${rgba(colors.cyanGlow, 0.14 * intensity)} 0%, transparent 30%),
          linear-gradient(180deg, ${colors.bgDeep} 0%, ${colors.bgMid} 100%)
        `,
        overflow: 'hidden',
      }}
    >
      <GlowOrb
        size={640}
        opacity={0.2 * intensity * pulse}
        style={glowStyles[glowPosition]}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 28% 22%, ${rgba(
            colors.alertRed,
            alertOpacity * 0.7,
          )} 0%, transparent 34%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(0, 151, 230, 0.08) 0 1px, transparent 1px),
            radial-gradient(circle at 80% 60%, rgba(50, 197, 255, 0.07) 0 1px, transparent 1px),
            linear-gradient(125deg, rgba(255,255,255,0.45), transparent 24%)
          `,
          backgroundSize: '18px 18px, 24px 24px, 100% 100%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, transparent 56%, rgba(0, 80, 140, 0.08) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

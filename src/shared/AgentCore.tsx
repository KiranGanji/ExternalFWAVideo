import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, springs, rgba} from '../config/tokens';

type AgentCoreProps = {
  size?: number;
  state?: 'idle' | 'reading' | 'reasoning' | 'emitting';
  intensity?: number;
  ringCount?: number;
};

export const AgentCore = ({
  size = 160,
  state = 'idle',
  intensity = 1,
  ringCount = 3,
}: AgentCoreProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const appear = spring({frame, fps, config: springs.standard});
  const statePulse =
    state === 'reasoning'
      ? 0.86 + Math.sin(frame / 10) * 0.14
      : 0.9 + Math.sin(frame / 22) * 0.08;
  const flicker = 0.74 + Math.sin(frame / 8) * 0.08 + Math.sin(frame / 17) * 0.06;
  const scale = 0.86 + appear * 0.14;

  return (
    <div
      style={{
        position: 'relative',
        width: size * 2,
        height: size * 2,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: size * 0.22,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${rgba(colors.cyanGlow, 0.62 * intensity * flicker)} 0%, ${rgba(
            colors.brightBlue,
            0.28 * intensity * flicker,
          )} 38%, ${rgba(colors.bgDeep, 0)} 72%)`,
          filter: `blur(${18 + intensity * 14}px)`,
        }}
      />
      <svg
        width={size * 2}
        height={size * 2}
        viewBox="0 0 320 320"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'visible',
          filter: 'drop-shadow(0 0 24px rgba(126, 232, 250, 0.28))',
        }}
      >
        <defs>
          <linearGradient id="agent-hex" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.cyanGlow} />
            <stop offset="60%" stopColor={colors.brightBlue} />
            <stop offset="100%" stopColor={colors.optumGold} />
          </linearGradient>
        </defs>
        <g transform={`rotate(${frame * 0.18}, 160, 160)`}>
          <polygon
            points="160,26 275,93 275,227 160,294 45,227 45,93"
            fill="none"
            stroke="url(#agent-hex)"
            strokeWidth={3.5}
            opacity={0.92}
          />
          <polygon
            points="160,78 230,118 230,202 160,242 90,202 90,118"
            fill="none"
            stroke={rgba(colors.cyanGlow, 0.85)}
            strokeWidth={2}
            opacity={0.78}
          />
          {[0, 1, 2].map((index) => {
            const radius = 48 + index * 26;
            const angle = frame * 0.02 + index * 2.1;
            const x = 160 + Math.cos(angle) * radius;
            const y = 160 + Math.sin(angle) * radius * 0.7;
            const active =
              state === 'reasoning'
                ? interpolate(Math.sin(frame / 7 + index), [-1, 1], [0.35, 1])
                : 0.6;

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={5 + index}
                fill={rgba(colors.optumGold, active * 0.78)}
              />
            );
          })}
          {[
            [160, 26],
            [275, 93],
            [275, 227],
            [160, 294],
            [45, 227],
            [45, 93],
          ].map(([x, y], index) => {
            const nodePulse = interpolate(
              Math.sin(frame / 9 + index * 0.9),
              [-1, 1],
              [0.42, 1],
            );

            return (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={5}
                fill={rgba(colors.cyanGlow, nodePulse)}
              />
            );
          })}
        </g>
      </svg>
      {Array.from({length: ringCount}, (_, index) => {
        const angle = frame * (0.5 + index * 0.18);
        const opacity = 0.22 + statePulse * 0.16 - index * 0.03;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: size * 0.08 - index * 4,
              borderRadius: '50%',
              border: `1px solid ${rgba(colors.cyanGlow, opacity)}`,
              transform: `rotate(${angle}deg) scaleY(${0.66 + index * 0.07})`,
              boxShadow: `0 0 ${18 + index * 6}px ${rgba(colors.brightBlue, opacity * 0.4)}`,
            }}
          />
        );
      })}
    </div>
  );
};

import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Background} from '../shared/Background';
import {ParticleField} from '../shared/ParticleField';
import {Counter} from '../shared/Counter';
import {colors, fonts, rgba} from '../config/tokens';

type Scene07Props = {
  hypothesisTotal?: number;
  pillarLabels?: [string, string];
  tagline?: string;
  subTagline?: string;
  showLogo?: boolean;
};

const descriptors = ['SCALE', 'SPEED', 'PRECISION'];

export const Scene07_ImpactScale = ({
  hypothesisTotal = 2500,
  pillarLabels = ['PAYMENT INTEGRITY', 'AFFORDABILITY'],
  tagline = 'Intelligence that never sleeps.',
  subTagline = 'Protecting the integrity of healthcare - for everyone.',
  showLogo = true,
}: Scene07Props) => {
  const frame = useCurrentFrame();
  const pullback = interpolate(frame, [0, 120], [1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pillarsReveal = interpolate(frame, [240, 330], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const closeReveal = interpolate(frame, [430, 520], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fieldOpacity = 1 - closeReveal;

  return (
    <AbsoluteFill>
      <Background glowPosition="center" intensity={1} />
      <ParticleField count={96} color={colors.cyanGlow} opacity={0.14} speed={0.45} direction="radial" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${pullback})`,
          opacity: fieldOpacity,
        }}
      >
        {Array.from({length: 300}, (_, index) => {
          const x = 220 + random(`impact-x-${index}`) * 1480;
          const y = 190 + random(`impact-y-${index}`) * 700;
          const size = 1.6 + random(`impact-size-${index}`) * 3.8;
          const pulse = interpolate(
            Math.sin(frame / (16 + (index % 7)) + index * 0.2),
            [-1, 1],
            [0.2, 1],
          );

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: rgba(colors.cyanGlow, pulse * 0.55),
                boxShadow: `0 0 ${size * 8}px ${rgba(colors.brightBlue, pulse * 0.2)}`,
              }}
            />
          );
        })}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '43%',
            transform: 'translate(-50%, -50%)',
            display: 'grid',
            justifyItems: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 164,
              fontWeight: 700,
              lineHeight: 1,
              color: colors.textPrimary,
            }}
          >
            <Counter to={hypothesisTotal} durationInFrames={110} format="comma" suffix="+" />
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 28,
              color: colors.textSecondary,
            }}
          >
            hypotheses generated - and counting
          </div>
        </div>
        {descriptors.map((descriptor, index) => {
          const start = 96 + index * 58;
          const descriptorOpacity =
            interpolate(frame, [start, start + 18], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }) *
            (1 -
              interpolate(frame, [start + 40, start + 70], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }));

          return (
            <div
              key={descriptor}
              style={{
                position: 'absolute',
                left: index === 1 ? '50%' : index === 0 ? 360 : 1320,
                top: index === 0 ? 274 : index === 1 ? 188 : 296,
                transform: 'translateX(-50%)',
                opacity: descriptorOpacity,
                color: colors.textSecondary,
                fontFamily: fonts.mono,
                fontSize: 18,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {descriptor}
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '58%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 180,
            opacity: pillarsReveal,
          }}
        >
          {pillarLabels.map((label, index) => (
            <div key={label} style={{display: 'grid', justifyItems: 'center', gap: 16}}>
              <div
                style={{
                  width: 130,
                  height: 300,
                  borderRadius: 999,
                  background: `linear-gradient(180deg, ${rgba(
                    index === 0 ? colors.brightBlue : colors.signalGreen,
                    0.84,
                  )} 0%, ${rgba(colors.bgDeep, 0.08)} 100%)`,
                  boxShadow: `0 0 54px ${rgba(
                    index === 0 ? colors.brightBlue : colors.signalGreen,
                    0.22,
                  )}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: ((frame * 8 + index * 90) % 340) - 170,
                    height: 110,
                    background: `linear-gradient(180deg, transparent 0%, ${rgba(
                      colors.textPrimary,
                      0.16,
                    )} 50%, transparent 100%)`,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 34,
                  fontWeight: 600,
                  color: colors.textPrimary,
                  textAlign: 'center',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
        {Array.from({length: 9}, (_, index) => {
          const flowStart = 306 + index * 8;
          const flow = interpolate(frame, [flowStart, flowStart + 44], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const x = 760 + flow * 370;
          const y = 620 + Math.sin(index) * 90 - flow * 48;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 90,
                height: 6,
                borderRadius: 999,
                opacity: pillarsReveal * (1 - flow * 0.5),
                background: `linear-gradient(90deg, ${rgba(colors.brightBlue, 0)} 0%, ${rgba(
                  colors.signalGreen,
                  0.8,
                )} 100%)`,
                filter: 'blur(1px)',
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          justifyItems: 'center',
          alignContent: 'center',
          gap: 18,
          opacity: closeReveal,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 66,
            fontWeight: 700,
            color: colors.textPrimary,
            textAlign: 'center',
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 30,
            color: colors.textSecondary,
            textAlign: 'center',
          }}
        >
          {subTagline}
        </div>
        {showLogo ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              marginTop: 22,
              color: colors.textPrimary,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                border: `1px solid ${rgba(colors.cyanGlow, 0.34)}`,
                display: 'grid',
                placeItems: 'center',
                background: `linear-gradient(180deg, ${rgba(colors.brightBlue, 0.16)} 0%, ${rgba(
                  colors.bgDeep,
                  0.16,
                )} 100%)`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 24,
                  letterSpacing: '0.08em',
                }}
              >
                UHG
              </div>
            </div>
            <div style={{display: 'grid', gap: 4}}>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 26,
                }}
              >
                Fraud Analytics
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 20,
                  color: colors.textSecondary,
                }}
              >
                AI Defense Team
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

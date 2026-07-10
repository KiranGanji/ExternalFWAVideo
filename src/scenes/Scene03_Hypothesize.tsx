import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../shared/Background';
import {ParticleField} from '../shared/ParticleField';
import {ArticleCard} from '../shared/ArticleCard';
import {AgentCore} from '../shared/AgentCore';
import {ConnectionLine} from '../shared/ConnectionLine';
import {HypothesisChip} from '../shared/HypothesisChip';
import {colors, fonts, rgba} from '../config/tokens';

const chips = [
  'H1: same provider pattern in local claims',
  'H2: skipped prerequisites before surgery',
  'H3: reimbursement inflated through modifiers',
];

export const Scene03_Hypothesize = () => {
  const frame = useCurrentFrame();
  const beamProgress = interpolate(frame, [64, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const questionOpacity = interpolate(frame, [410, 500], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background glowPosition="center" intensity={0.95} />
      <ParticleField count={64} color={colors.cyanGlow} opacity={0.2} direction="inward" />
      <div
        style={{
          position: 'absolute',
          left: 132,
          top: 210,
          opacity: interpolate(frame, [0, 30], [0.6, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          transform: `translateY(${interpolate(frame, [0, 28], [18, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}px)`,
        }}
      >
        <ArticleCard
          headline="Prerequisite steps skipped before costly surgeries"
          source="HHS-OIG"
          tone="alert"
          size="lg"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: 22,
          }}
        >
          {Array.from({length: 3}, (_, index) => {
            const sweep = ((frame * 9 + index * 90) % 380) - 190;

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: sweep,
                  top: 0,
                  bottom: 0,
                  width: 60,
                  background: `linear-gradient(90deg, transparent 0%, ${rgba(
                    colors.optumGold,
                    0.18,
                  )} 50%, transparent 100%)`,
                  transform: 'skewX(-18deg)',
                }}
              />
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '43%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <AgentCore size={170} state="reading" intensity={1} />
      </div>
      <ConnectionLine
        start={{x: 530, y: 380}}
        end={{x: 930, y: 430}}
        color={colors.optumGold}
        pulsing
        startFrame={46}
        duration={44}
      />
      <div
        style={{
          position: 'absolute',
          left: 780,
          top: 232,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${rgba(colors.cyanGlow, 0.1 * beamProgress)} 0%, transparent 70%)`,
          filter: 'blur(12px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 1170,
          top: 210,
          display: 'grid',
          gap: 18,
        }}
      >
        {chips.map((label, index) => {
          const chipReveal = interpolate(frame, [160 + index * 44, 192 + index * 44], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const collapse = interpolate(frame, [360, 430], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const isSelected = index === 1;
          const y = index * 78;
          const selectedX = isSelected ? -350 : 0;
          const selectedY = isSelected ? 156 : 0;

          return (
            <div
              key={label}
              style={{
                opacity: isSelected ? chipReveal : chipReveal * (1 - collapse),
                transform: `translate(${collapse * selectedX}px, ${y + collapse * selectedY}px) scale(${
                  isSelected ? 1 + collapse * 0.08 : 1 - collapse * 0.12
                })`,
              }}
            >
              <HypothesisChip
                label={label}
                size={isSelected ? 'md' : 'sm'}
                state={collapse > 0.15 && isSelected ? 'selected' : 'forming'}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 138,
          display: 'grid',
          justifyItems: 'center',
          gap: 18,
          opacity: questionOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 16,
            color: colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          TESTABLE HYPOTHESIS
        </div>
        <div
          style={{
            maxWidth: 980,
            fontFamily: fonts.display,
            fontSize: 48,
            lineHeight: 1.18,
            color: colors.textPrimary,
            textAlign: 'center',
          }}
        >
          Could this same abuse be happening within our claims?
        </div>
      </div>
    </AbsoluteFill>
  );
};

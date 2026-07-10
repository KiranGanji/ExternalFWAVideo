import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Background} from '../shared/Background';
import {ParticleField} from '../shared/ParticleField';
import {ArticleCard} from '../shared/ArticleCard';
import {AgentCore} from '../shared/AgentCore';
import {GradientText} from '../shared/GradientText';
import {colors, fonts, rgba} from '../config/tokens';

const orbitHeadlines = [
  'Telehealth billing fraud spikes post-pandemic',
  'Modifier abuse inflates reimbursement, audit finds',
  'Claims clusters suggest coordinated abuse pattern',
  'Provider network shows synchronized coding drift',
  'Prerequisite steps skipped before costly surgeries',
  '$40M upcoding scheme uncovered at clinic chain',
  'Policy loophole exploited across specialty network',
  'Pattern-matched fraud tactics surface in new filings',
];

const descriptors = ['ALWAYS ON', 'AGENTIC', 'AT SCALE'];

export const Scene02_TheVision = () => {
  const frame = useCurrentFrame();
  const order = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const coreScale = interpolate(frame, [30, 90], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background glowPosition="center" alertMix={1 - order} />
      <ParticleField count={70} color={colors.cyanGlow} opacity={0.24} speed={0.85} />
      {orbitHeadlines.map((headline, index) => {
        const finalAngle = index * ((Math.PI * 2) / orbitHeadlines.length);
        const orbit = finalAngle + frame * 0.012;
        const radius = 320 + (index % 2) * 70;
        const orbitX = 960 + Math.cos(orbit) * radius;
        const orbitY = 520 + Math.sin(orbit) * radius * 0.42;
        const startX = 220 + random(`vision-x-${index}`) * 1480;
        const startY = 140 + random(`vision-y-${index}`) * 700;
        const x = startX * (1 - order) + orbitX * order;
        const y = startY * (1 - order) + orbitY * order;

        return (
          <div
            key={headline}
            style={{
              position: 'absolute',
              left: x - 160,
              top: y - 90,
              transform: `rotate(${interpolate(order, [0, 1], [random(`vision-tilt-${index}`) * 10 - 5, finalAngle * (180 / Math.PI)])}deg) scale(${0.78 + order * 0.08})`,
              opacity: 0.2 + order * 0.55,
              filter: `saturate(${0.68 + order * 0.4}) blur(${(1 - order) * 5}px)`,
            }}
          >
            <ArticleCard
              headline={headline}
              source="Health News"
              size="sm"
              tone={index % 3 === 0 ? 'alert' : 'neutral'}
            />
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          transform: `translate(-50%, -50%) scale(${coreScale})`,
        }}
      >
        <AgentCore size={168} state="emitting" intensity={1} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 230,
          right: 230,
          top: 150,
          display: 'grid',
          justifyItems: 'center',
          gap: 18,
        }}
      >
        <GradientText
          from={116}
          duration={34}
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 74,
            letterSpacing: '-0.04em',
            textAlign: 'center',
          }}
        >
          Always-on agentic intelligence
        </GradientText>
        <div
          style={{
            opacity: interpolate(frame, [146, 184], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [146, 184], [16, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
            color: colors.textSecondary,
            fontFamily: fonts.body,
            fontSize: 30,
            textAlign: 'center',
            maxWidth: 1040,
            lineHeight: 1.35,
          }}
        >
          Turning the world&apos;s fraud reporting into tested signals inside our own ecosystem.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 170,
          display: 'flex',
          justifyContent: 'center',
          gap: 18,
        }}
      >
        {descriptors.map((descriptor, index) => {
          const reveal = interpolate(frame, [212 + index * 14, 240 + index * 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={descriptor}
              style={{
                opacity: reveal,
                transform: `translateY(${(1 - reveal) * 12}px)`,
                padding: '13px 22px',
                borderRadius: 999,
                border: `1px solid ${colors.nodeBorder}`,
                background: `linear-gradient(90deg, ${rgba(colors.brightBlue, 0.14)} 0%, ${rgba(
                  colors.bgDeep,
                  0.28,
                )} 100%)`,
                color: colors.cyanGlow,
                fontFamily: fonts.mono,
                fontSize: 16,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {descriptor}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 96,
          display: 'grid',
          justifyItems: 'center',
          gap: 10,
          opacity: interpolate(frame, [260, 320], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div
          style={{
            width: 760,
            height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${rgba(
              colors.cyanGlow,
              0.6,
            )} 40%, ${rgba(colors.optumGold, 0.6)} 100%)`,
          }}
        />
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 16,
            color: colors.textSecondary,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          From global reporting to tested signals - automatically
        </div>
      </div>
    </AbsoluteFill>
  );
};

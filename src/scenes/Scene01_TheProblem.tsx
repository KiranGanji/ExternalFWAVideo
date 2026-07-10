import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Background} from '../shared/Background';
import {ParticleField} from '../shared/ParticleField';
import {ArticleCard} from '../shared/ArticleCard';
import {colors, fonts, rgba} from '../config/tokens';
import {useStagger} from '../shared/hooks/useStagger';

const headlines = [
  'Provider billed for surgeries never performed',
  '$40M upcoding scheme uncovered at clinic chain',
  'Unnecessary procedures flagged in federal probe',
  'Phantom patients, real claims: DME fraud ring charged',
  'Modifier abuse inflates reimbursement, audit finds',
  'Genetic testing kickback scheme reaches settlement',
  'Telehealth billing fraud spikes post-pandemic',
  'Prerequisite steps skipped before costly surgeries',
  'Claims clusters suggest coordinated abuse pattern',
  'Policy loophole exploited across specialty network',
  'High-cost implants triggered without review trail',
  'Repeated emergency claims raise billing questions',
  'Outlier provider billing spreads across markets',
  'Procedure bundles trigger improper payment concern',
  'Pattern-matched fraud tactics surface in new filings',
  'Rapid claim growth tied to suspect utilization',
  'Regional audit reveals repeat billing anomalies',
  'Provider network shows synchronized coding drift',
];

const sources = ['DOJ', 'HHS-OIG', 'Health News', 'State AG'];

const flarePoints = [
  {x: 510, y: 475},
  {x: 645, y: 438},
  {x: 780, y: 476},
  {x: 920, y: 458},
  {x: 1085, y: 492},
  {x: 1195, y: 566},
  {x: 935, y: 608},
  {x: 708, y: 585},
  {x: 1190, y: 415},
];

const questionWords = [
  'What',
  'if',
  'we',
  'could',
  'catch',
  'it',
  'the',
  'moment',
  'it',
  'emerges?',
];

const UsBackdrop = () => {
  return (
    <svg
      width={1140}
      height={600}
      viewBox="0 0 1140 600"
      style={{
        position: 'absolute',
        left: '50%',
        top: '51%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.15,
      }}
    >
      <path
        d="M122 320 L170 260 L258 244 L332 214 L432 190 L544 192 L632 168 L716 156 L822 176 L932 222 L1000 286 L1012 356 L978 408 L922 454 L822 486 L724 478 L632 452 L548 458 L474 438 L392 442 L302 426 L210 394 L148 360 Z"
        fill={rgba(colors.textSecondary, 0.12)}
        stroke={rgba(colors.textSecondary, 0.22)}
        strokeWidth={2}
      />
      {Array.from({length: 62}, (_, index) => {
        const x = 170 + (index % 11) * 72 + ((index * 17) % 28);
        const y = 220 + Math.floor(index / 11) * 52 + ((index * 23) % 18);

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={2.3}
            fill={rgba(colors.textSecondary, 0.26)}
          />
        );
      })}
    </svg>
  );
};

type Scene01Props = {
  headlineCount?: number;
  showMapFlares?: boolean;
  alertIntensity?: number;
};

export const Scene01_TheProblem = ({
  headlineCount = 18,
  showMapFlares = true,
  alertIntensity = 0.35,
}: Scene01Props) => {
  const frame = useCurrentFrame();
  const cameraScale = interpolate(frame, [0, 360, 480, 600], [1.08, 1.015, 1.03, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraY = interpolate(frame, [0, 600], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const settle = interpolate(frame, [480, 600], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const overwhelm = interpolate(frame, [340, 460], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background glowPosition="topLeft" tint="alert" alertMix={alertIntensity} />
      <ParticleField count={50} color={colors.alertAmber} opacity={0.16} speed={0.7} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        }}
      >
        <UsBackdrop />
        {showMapFlares
          ? flarePoints.map((point, index) => {
              const startFrame = 120 + index * 24;
              const active = interpolate(frame, [startFrame, startFrame + 40], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const ring = interpolate(frame, [startFrame, startFrame + 40], [0, 150], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <div key={index}>
                  <div
                    style={{
                      position: 'absolute',
                      left: point.x - 9,
                      top: point.y - 9,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: rgba(colors.alertRed, active * 0.75),
                      boxShadow: `0 0 24px ${rgba(colors.alertRed, active * 0.42)}`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: point.x - ring / 2,
                      top: point.y - ring / 2,
                      width: ring,
                      height: ring,
                      borderRadius: '50%',
                      border: `1.5px solid ${rgba(colors.alertAmber, active * 0.46 * (1 - active))}`,
                    }}
                  />
                </div>
              );
            })
          : null}
        {Array.from({length: headlineCount}, (_, index) => {
          const ratio = index / Math.max(1, headlineCount - 1);
          const startFrame = 30 + Math.floor(330 * Math.pow(ratio, 1.8));
          const appear = interpolate(frame, [startFrame, startFrame + 22], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const phase = random(`problem-phase-${index}`) * Math.PI * 2;
          const layer = index % 3;
          const size = layer === 0 ? 'lg' : layer === 1 ? 'md' : 'sm';
          const tilt = random(`problem-tilt-${index}`) * 8 - 4;
          const baseX = 140 + random(`problem-x-${index}`) * 1520;
          const baseY = 120 + random(`problem-y-${index}`) * 680;
          const driftX = Math.sin(frame / (35 + layer * 8) + phase) * (18 + layer * 10);
          const driftY = Math.cos(frame / (46 + layer * 10) + phase) * (12 + layer * 6);
          const jitter = overwhelm * (random(`problem-jitter-${index}`) * 10 - 5);
          const opacity = appear * (1 - settle * 0.55) * (layer === 2 ? 0.48 : layer === 1 ? 0.72 : 1);
          const scale = 0.85 + appear * 0.15;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: baseX + driftX + jitter - 140,
                top: baseY + driftY + jitter - 90,
                transform: `rotate(${tilt}deg) scale(${scale})`,
                opacity,
                filter: `blur(${(1 - appear) * 12 + layer * 2}px) saturate(${1 - settle * 0.3})`,
              }}
            >
              <ArticleCard
                headline={headlines[index % headlines.length]}
                source={sources[index % sources.length]}
                tone={index % 4 === 0 ? 'alert' : 'neutral'}
                size={size}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 240,
          right: 240,
          bottom: 126,
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {questionWords.map((word, index) => {
          const progress = useStagger({
            frame,
            start: 498,
            step: 5,
            duration: 18,
            index,
          });

          return (
            <span
              key={index}
              style={{
                opacity: progress,
                transform: `translateY(${(1 - progress) * 8}px)`,
                color: colors.textPrimary,
                fontFamily: fonts.body,
                fontStyle: 'italic',
                fontSize: 40,
                letterSpacing: '-0.03em',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

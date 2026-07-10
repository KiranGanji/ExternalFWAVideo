import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../shared/Background';
import {ParticleField} from '../shared/ParticleField';
import {SignalReport} from '../shared/SignalReport';
import {colors, fonts, rgba} from '../config/tokens';

const articleRows = [
  'Prerequisite steps skipped before surgery',
  'Modifier abuse inflates reimbursement',
  'Telehealth billing anomalies surface',
  'High-cost implants trigger review',
];

const stages = ['Article', 'Hypotheses', 'Reasoning', 'Databricks', 'Signal'];

type Scene06Props = {
  productName?: string;
  elapsedLabel?: string;
};

export const Scene06_HumanInLoop = ({
  productName = 'Fraud Signal Engine',
  elapsedLabel = '~ 3 min',
}: Scene06Props) => {
  const frame = useCurrentFrame();
  const cursorX = interpolate(frame, [60, 118], [320, 364], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [60, 118], [270, 332], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const clickScale = frame >= 118 && frame <= 130 ? 0.82 : 1;

  return (
    <AbsoluteFill>
      <Background glowPosition="topRight" intensity={0.92} />
      <ParticleField count={34} color={colors.cyanGlow} opacity={0.12} speed={0.5} />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1440,
          height: 760,
          borderRadius: 34,
          border: `1px solid ${colors.nodeBorder}`,
          background: `linear-gradient(180deg, ${rgba(colors.bgMid, 0.9)} 0%, ${rgba(
            colors.bgDeep,
            0.96,
          )} 100%)`,
          boxShadow: '0 28px 70px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            borderBottom: `1px solid ${rgba(colors.cyanGlow, 0.12)}`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: colors.signalGreen,
                boxShadow: `0 0 18px ${rgba(colors.signalGreen, 0.45)}`,
              }}
            />
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 26,
                color: colors.textPrimary,
                fontWeight: 700,
              }}
            >
              {productName}
            </div>
          </div>
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 999,
              border: `1px solid ${rgba(colors.signalGreen, 0.3)}`,
              color: colors.signalGreen,
              fontFamily: fonts.mono,
              fontSize: 14,
            }}
          >
            Analyst mode
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 80,
            bottom: 0,
            width: 380,
            borderRight: `1px solid ${rgba(colors.cyanGlow, 0.12)}`,
            padding: 22,
            display: 'grid',
            alignContent: 'start',
            gap: 12,
          }}
        >
          {articleRows.map((row, index) => {
            const selected = frame >= 92 && index === 1;

            return (
              <div
                key={row}
                style={{
                  padding: '16px 18px',
                  borderRadius: 20,
                  border: `1px solid ${
                    selected ? colors.nodeBorderHot : rgba(colors.cyanGlow, 0.08)
                  }`,
                  backgroundColor: selected
                    ? rgba(colors.brightBlue, 0.16)
                    : rgba(colors.nodeSurface, 1),
                  color: selected ? colors.textPrimary : colors.textSecondary,
                  fontFamily: fonts.body,
                  fontSize: 22,
                  lineHeight: 1.3,
                }}
              >
                {row}
              </div>
            );
          })}
          <div
            style={{
              marginTop: 14,
              padding: '16px 18px',
              borderRadius: 18,
              border: `1px solid ${rgba(colors.signalGreen, 0.34)}`,
              backgroundColor:
                frame >= 118
                  ? rgba(colors.signalGreen, 0.18)
                  : rgba(colors.signalGreen, 0.08),
              color: colors.signalGreen,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 22,
              transform: `scale(${clickScale})`,
              width: 'fit-content',
            }}
          >
            Run Signal
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 380,
            right: 0,
            top: 80,
            bottom: 0,
            padding: 34,
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 28,
              border: `1px solid ${rgba(colors.cyanGlow, 0.14)}`,
              background: `linear-gradient(180deg, ${rgba(colors.bgDeep, 0.48)} 0%, ${rgba(
                colors.bgMid,
                0.32,
              )} 100%)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 68,
                right: 68,
                top: 120,
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 18,
                alignItems: 'start',
              }}
            >
              {stages.map((stage, index) => {
                const stepReveal = interpolate(
                  frame,
                  [126 + index * 24, 150 + index * 24],
                  [0, 1],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  },
                );
                const complete = frame >= 150 + index * 24;

                return (
                  <div key={stage} style={{display: 'grid', justifyItems: 'center', gap: 14}}>
                    <div
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: '50%',
                        border: `1px solid ${
                          complete ? rgba(colors.signalGreen, 0.46) : colors.nodeBorder
                        }`,
                        backgroundColor: complete
                          ? rgba(colors.signalGreen, 0.16)
                          : rgba(colors.nodeSurface, 1),
                        color: complete ? colors.signalGreen : colors.textSecondary,
                        fontFamily: fonts.mono,
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: stepReveal,
                        transform: `scale(${0.9 + stepReveal * 0.1})`,
                      }}
                    >
                      {complete ? 'OK' : '...'}
                    </div>
                    <div
                      style={{
                        opacity: stepReveal,
                        color: colors.textPrimary,
                        fontFamily: fonts.body,
                        fontSize: 20,
                        textAlign: 'center',
                      }}
                    >
                      {stage}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                position: 'absolute',
                left: 108,
                right: 108,
                top: 256,
                height: 2,
                backgroundColor: rgba(colors.cyanGlow, 0.16),
              }}
            >
              <div
                style={{
                  width: `${interpolate(frame, [126, 246], [0, 100], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${colors.brightBlue} 0%, ${colors.signalGreen} 100%)`,
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: 68,
                right: 68,
                top: 304,
                display: 'grid',
                gap: 12,
              }}
            >
              {[
                'Reading article...',
                'Generating hypotheses...',
                'Reasoning across evidence...',
                'Running on Databricks...',
                'Signal ready.',
              ].map((status, index) => {
                const visible = frame >= 132 + index * 24 && frame < 156 + index * 24 + 70;

                return (
                  <div
                    key={status}
                    style={{
                      opacity: visible ? 1 : 0,
                      color: colors.textSecondary,
                      fontFamily: fonts.mono,
                      fontSize: 18,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {status}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                position: 'absolute',
                right: 70,
                bottom: 48,
                opacity: interpolate(frame, [226, 274], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `scale(${interpolate(frame, [226, 274], [0.84, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })})`,
              }}
            >
              <SignalReport
                compact
                providers={[
                  {id: 'PRV-****2931', score: 0.94},
                  {id: 'PRV-****8107', score: 0.91},
                ]}
                claimsCount={1284}
                confidence={0.87}
                verifyAtFrame={20}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: 68,
                bottom: 54,
                padding: '10px 16px',
                borderRadius: 999,
                border: `1px solid ${rgba(colors.optumGold, 0.28)}`,
                backgroundColor: rgba(colors.optumGold, 0.08),
                color: colors.optumGold,
                fontFamily: fonts.mono,
                fontSize: 16,
              }}
            >
              Investigation time: {elapsedLabel}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          width: 18,
          height: 24,
          backgroundColor: colors.textPrimary,
          clipPath: 'polygon(0 0, 0 100%, 36% 74%, 62% 100%, 76% 92%, 52% 66%, 100% 66%)',
          filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.34))',
        }}
      />
    </AbsoluteFill>
  );
};

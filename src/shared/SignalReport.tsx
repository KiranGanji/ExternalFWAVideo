import {Counter} from './Counter';
import {colors, fonts, rgba} from '../config/tokens';
import {interpolate, useCurrentFrame} from 'remotion';

type Provider = {
  id: string;
  score: number;
};

type SignalReportProps = {
  providers: Provider[];
  claimsCount?: number;
  verifyAtFrame?: number;
  confidence?: number;
  subtitle?: string;
  compact?: boolean;
};

export const SignalReport = ({
  providers,
  claimsCount = 1284,
  verifyAtFrame = 300,
  confidence = 0.87,
  subtitle = 'Hypothesis H2 | historical claims scan',
  compact = false,
}: SignalReportProps) => {
  const frame = useCurrentFrame();
  const meter = interpolate(frame, [60, 160], [0, confidence], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const verified = interpolate(frame, [verifyAtFrame, verifyAtFrame + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: compact ? 420 : 820,
        borderRadius: compact ? 22 : 30,
        border: `1px solid ${rgba(colors.signalGreen, 0.34)}`,
        background: `linear-gradient(160deg, ${rgba(colors.nodeSurface, 0.98)} 0%, ${rgba(
          colors.bgMid,
          0.98,
        )} 68%, ${rgba(colors.signalGreen, 0.08)} 100%)`,
        boxShadow: `0 26px 60px ${rgba(colors.signalGreen, 0.12)}`,
        padding: compact ? 20 : 30,
        color: colors.textPrimary,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: compact ? 18 : 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: compact ? 34 : 54,
              letterSpacing: '0.05em',
            }}
          >
            SIGNAL
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: compact ? 12 : 15,
              color: colors.textSecondary,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            padding: compact ? '8px 12px' : '10px 16px',
            borderRadius: 999,
            backgroundColor: rgba(colors.signalGreen, 0.14 * verified),
            border: `1px solid ${rgba(colors.signalGreen, 0.34)}`,
            color: colors.signalGreen,
            fontFamily: fonts.mono,
            fontSize: compact ? 12 : 15,
            transform: `scale(${0.92 + verified * 0.08})`,
            opacity: verified,
          }}
        >
          VERIFIED
        </div>
      </div>
      <div style={{display: 'grid', gap: compact ? 16 : 22}}>
        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: compact ? 12 : 14,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 10,
            }}
          >
            Confidence
          </div>
          <div
            style={{
              height: compact ? 12 : 16,
              borderRadius: 999,
              backgroundColor: rgba(colors.textSecondary, 0.12),
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${meter * 100}%`,
                height: '100%',
                borderRadius: 999,
                background: `linear-gradient(90deg, ${colors.brightBlue} 0%, ${colors.signalGreen} 100%)`,
                boxShadow: `0 0 20px ${rgba(colors.signalGreen, 0.42)}`,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: fonts.mono,
              fontSize: compact ? 16 : 20,
              color: colors.signalGreen,
            }}
          >
            {(meter * 100).toFixed(0)}%
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: compact ? '1fr' : '1fr auto',
            gap: compact ? 18 : 26,
          }}
        >
          <div style={{display: 'grid', gap: compact ? 10 : 12}}>
            {providers.map((provider, index) => (
              <div
                key={provider.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '8px 1fr auto',
                  alignItems: 'center',
                  gap: 14,
                  padding: compact ? '10px 12px' : '12px 16px',
                  borderRadius: 18,
                  backgroundColor: rgba(colors.nodeSurface, 0.92),
                  border: `1px solid ${rgba(colors.brightBlue, 0.16)}`,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: 999,
                    backgroundColor: index < 2 ? colors.alertRed : rgba(colors.cyanGlow, 0.4),
                  }}
                />
                <div style={{fontFamily: fonts.mono, fontSize: compact ? 15 : 18}}>
                  {provider.id}
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: compact ? 14 : 18,
                    color: index < 2 ? colors.alertAmber : colors.cyanGlow,
                  }}
                >
                  risk {provider.score.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div style={{display: 'grid', alignContent: 'start', gap: 8}}>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: compact ? 12 : 14,
                color: colors.textSecondary,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Claims flagged
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: compact ? 42 : 62,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              <Counter to={claimsCount} durationInFrames={90} format="comma" />
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: compact ? 14 : 18,
                color: colors.textSecondary,
              }}
            >
              Ready for investigator review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

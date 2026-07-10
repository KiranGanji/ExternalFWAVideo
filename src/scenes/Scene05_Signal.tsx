import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../shared/Background';
import {ParticleField} from '../shared/ParticleField';
import {SignalReport} from '../shared/SignalReport';
import {colors, fonts, rgba} from '../config/tokens';

const providers = [
  {id: 'PRV-****2931', score: 0.94},
  {id: 'PRV-****8107', score: 0.91},
  {id: 'PRV-****4460', score: 0.88},
  {id: 'PRV-****7324', score: 0.84},
];

type Scene05Props = {
  claimsCount?: number;
  confidence?: number;
};

export const Scene05_Signal = ({
  claimsCount = 1284,
  confidence = 0.87,
}: Scene05Props) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background glowPosition="center" intensity={0.92} />
      <ParticleField count={42} color={colors.signalGreen} opacity={0.14} speed={0.6} />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${0.94 + reveal * 0.06})`,
          opacity: reveal,
        }}
      >
        <SignalReport
          providers={providers}
          claimsCount={claimsCount}
          confidence={confidence}
          verifyAtFrame={300}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 108,
          display: 'grid',
          justifyItems: 'center',
          gap: 10,
          opacity: interpolate(frame, [292, 340], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 15,
            color: colors.signalGreen,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          EVIDENCE-BACKED. READY FOR ACTION.
        </div>
        <div
          style={{
            width: 420,
            height: 1,
            backgroundColor: rgba(colors.signalGreen, 0.4),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

import {useMemo} from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, rgba} from '../config/tokens';

type ParticleFieldProps = {
  count?: number;
  color?: string;
  speed?: number;
  direction?: 'up' | 'inward' | 'radial';
  opacity?: number;
};

export const ParticleField = ({
  count = 80,
  color = colors.cyanGlow,
  speed = 1,
  direction = 'up',
  opacity = 0.32,
}: ParticleFieldProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  const particles = useMemo(() => {
    return Array.from({length: count}, (_, index) => {
      const depth = index % 3;
      return {
        baseX: random(`particle-x-${index}`) * width,
        baseY: random(`particle-y-${index}`) * height,
        drift: random(`particle-drift-${index}`) * 120 + 30,
        phase: random(`particle-phase-${index}`) * Math.PI * 2,
        size: 1 + depth + random(`particle-size-${index}`) * 1.8,
        layerSpeed: 0.3 + depth * 0.45 + random(`particle-speed-${index}`) * 0.4,
        blur: depth === 2 ? 3 : depth === 1 ? 1.5 : 0,
      };
    });
  }, [count, height, width]);

  return (
    <>
      {particles.map((particle, index) => {
        const travel = frame * speed * particle.layerSpeed;
        let x = particle.baseX;
        let y = particle.baseY;

        if (direction === 'up') {
          x += Math.sin(frame / 48 + particle.phase) * particle.drift * 0.12;
          y = (particle.baseY + height - travel * 2) % (height + 180) - 90;
        } else if (direction === 'inward') {
          const distanceX = width / 2 - particle.baseX;
          const distanceY = height / 2 - particle.baseY;
          const progress = ((travel * 0.0025) % 1) + 0.02;
          x = particle.baseX + distanceX * progress;
          y = particle.baseY + distanceY * progress;
        } else {
          const orbit = frame / 80 + particle.phase;
          x += Math.cos(orbit) * particle.drift * 0.18;
          y += Math.sin(orbit) * particle.drift * 0.12;
        }

        const twinkle = interpolate(
          Math.sin(frame / 18 + particle.phase),
          [-1, 1],
          [0.25, 1],
        );

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              left: x,
              top: y,
              backgroundColor: rgba(color, opacity * twinkle),
              boxShadow: `0 0 ${particle.size * 6}px ${rgba(color, opacity * 0.6)}`,
              filter: `blur(${particle.blur}px)`,
            }}
          />
        );
      })}
    </>
  );
};

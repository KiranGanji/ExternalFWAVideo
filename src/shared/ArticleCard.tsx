import type {CSSProperties} from 'react';
import {colors, fonts, rgba, shadows} from '../config/tokens';

type ArticleCardProps = {
  headline: string;
  source?: string;
  tone?: 'neutral' | 'alert';
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
};

const sizeMap = {
  sm: {width: 250, height: 146},
  md: {width: 320, height: 180},
  lg: {width: 380, height: 220},
} as const;

export const ArticleCard = ({
  headline,
  source = 'Health News',
  tone = 'neutral',
  size = 'md',
  style,
}: ArticleCardProps) => {
  const dimensions = sizeMap[size];
  const accent = tone === 'alert' ? colors.alertRed : colors.brightBlue;
  const glow = tone === 'alert' ? colors.alertAmber : colors.cyanGlow;

  return (
    <div
      style={{
        position: 'relative',
        width: dimensions.width,
        height: dimensions.height,
        padding: '18px 18px 16px',
        borderRadius: 22,
        border: `1px solid ${rgba(accent, 0.34)}`,
        background: `linear-gradient(135deg, ${rgba(accent, 0.18)} 0%, ${rgba(
          glow,
          0.12,
        )} 26%, ${rgba(colors.nodeSurface, 0.98)} 62%, ${rgba(colors.optumGold, 0.1)} 100%)`,
        boxShadow: shadows.soft,
        backdropFilter: 'blur(18px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: colors.textPrimary,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: 6,
          background: `linear-gradient(90deg, ${accent} 0%, ${glow} 100%)`,
        }}
      />
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 13,
          letterSpacing: '0.18em',
          color: tone === 'alert' ? colors.alertRed : colors.brightBlue,
          textTransform: 'uppercase',
        }}
      >
        FRAUD REPORT
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: size === 'sm' ? 22 : size === 'md' ? 27 : 31,
          lineHeight: 1.16,
          fontWeight: 700,
        }}
      >
        {headline}
      </div>
      <div style={{display: 'grid', gap: 7}}>
        {[0, 1, 2].map((line) => (
          <div
            key={line}
            style={{
              height: 6,
              borderRadius: 99,
              width: `${88 - line * 11}%`,
              backgroundColor: rgba(colors.textSecondary, 0.18),
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          padding: '7px 12px',
          borderRadius: 999,
          backgroundColor: rgba(colors.nodeSurface, 0.9),
          border: `1px solid ${rgba(accent, 0.18)}`,
          color: colors.textSecondary,
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {source}
      </div>
    </div>
  );
};

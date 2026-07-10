import {colors, fonts, rgba} from '../config/tokens';

type CaptionProps = {
  text: string;
};

export const Caption = ({text}: CaptionProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        padding: '18px 24px',
        borderRadius: 22,
        backgroundColor: rgba(colors.bgDeep, 0.56),
        border: `1px solid ${rgba(colors.cyanGlow, 0.14)}`,
        color: colors.textPrimary,
        fontFamily: fonts.body,
        fontSize: 28,
        lineHeight: 1.35,
      }}
    >
      {text}
    </div>
  );
};

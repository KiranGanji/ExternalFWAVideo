import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fonts, rgba} from '../config/tokens';

type NotebookCell = {
  type: 'code' | 'markdown' | 'output';
  lines: readonly string[];
};

type CodeNotebookProps = {
  cells: readonly NotebookCell[];
  typeOnStartFrame?: number;
  runAtFrame?: number;
  showClusterStatus?: boolean;
};

export const CodeNotebook = ({
  cells,
  typeOnStartFrame = 0,
  runAtFrame = 180,
  showClusterStatus = true,
}: CodeNotebookProps) => {
  const frame = useCurrentFrame();
  const panelOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const clusterRunning = frame >= runAtFrame;
  const clusterDone = frame >= runAtFrame + 70;

  return (
    <div
      style={{
        width: 1040,
        minHeight: 540,
        borderRadius: 30,
        border: `1px solid ${colors.codeBorder}`,
        background: `linear-gradient(180deg, ${rgba(colors.codeSurface, 0.98)} 0%, ${rgba(
          colors.bgMid,
          0.98,
        )} 100%)`,
        boxShadow: '0 30px 70px rgba(85, 119, 157, 0.18)',
        padding: 24,
        opacity: panelOpacity,
        color: colors.textPrimary,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              backgroundColor: clusterDone
                ? colors.signalGreen
                : clusterRunning
                  ? colors.optumGold
                  : rgba(colors.textMuted, 0.7),
              boxShadow: clusterDone
                ? `0 0 18px ${rgba(colors.signalGreen, 0.5)}`
                : 'none',
            }}
          />
          <div
            style={{
              color: colors.textSecondary,
              fontFamily: fonts.mono,
              fontSize: 15,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Databricks cluster
          </div>
          {showClusterStatus ? (
            <div
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                backgroundColor: rgba(colors.nodeSurface, 0.92),
                border: `1px solid ${colors.nodeBorder}`,
                fontFamily: fonts.mono,
                fontSize: 14,
                color: clusterDone
                  ? colors.signalGreen
                  : clusterRunning
                    ? colors.optumGold
                    : colors.textMuted,
              }}
            >
              {clusterDone ? 'RUN COMPLETE' : clusterRunning ? 'RUNNING' : 'IDLE'}
            </div>
          ) : null}
        </div>
        <div
          style={{
            padding: '8px 14px',
            borderRadius: 999,
            border: `1px solid ${colors.nodeBorder}`,
            fontFamily: fonts.mono,
            fontSize: 14,
            color: colors.cyanGlow,
          }}
        >
          Python
        </div>
      </div>
      <div style={{display: 'grid', gap: 14}}>
        {cells.map((cell, cellIndex) => {
          const cellStart = typeOnStartFrame + cellIndex * 36;
          const visibleLines = Math.max(0, Math.floor((frame - cellStart) / 5) + 1);
          const reveal = interpolate(frame, [cellStart, cellStart + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const isOutput = cell.type === 'output';
          const canShowOutput = !isOutput || frame >= runAtFrame + 40;

          return (
            <div
              key={cellIndex}
              style={{
                opacity: canShowOutput ? reveal : 0,
                transform: `translateY(${(1 - reveal) * 12}px)`,
                borderRadius: 22,
                padding: '18px 20px',
                backgroundColor:
                  cell.type === 'markdown'
                    ? rgba(colors.nodeSurface, 0.98)
                    : rgba(colors.bgMid, 0.84),
                border: `1px solid ${
                  cell.type === 'output' ? rgba(colors.signalGreen, 0.18) : colors.codeBorder
                }`,
              }}
            >
              {cell.lines.slice(0, canShowOutput ? visibleLines : 0).map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  style={{
                    display: 'flex',
                    gap: 14,
                    marginBottom: 8,
                    fontFamily: cell.type === 'markdown' ? fonts.body : fonts.mono,
                    fontSize: cell.type === 'markdown' ? 18 : 17,
                    color:
                      cell.type === 'output'
                        ? colors.textSecondary
                        : cell.type === 'markdown'
                          ? colors.textPrimary
                          : colors.uhgBlue,
                  }}
                >
                  {cell.type === 'code' ? (
                    <span style={{minWidth: 26, color: colors.textMuted}}>{lineIndex + 1}</span>
                  ) : null}
                  <span>{line}</span>
                </div>
              ))}
              {cell.type === 'output' && canShowOutput ? (
                <div style={{display: 'grid', gap: 12, marginTop: 10}}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 8,
                    }}
                  >
                    {[71, 83, 58, 92].map((value, index) => (
                      <div
                        key={index}
                        style={{
                          height: 88,
                          borderRadius: 14,
                          background: `linear-gradient(180deg, ${rgba(
                            colors.brightBlue,
                            0.12,
                          )} 0%, ${rgba(colors.nodeSurface, 0.98)} 100%)`,
                          border: `1px solid ${colors.codeBorder}`,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: `${value}%`,
                            background: `linear-gradient(180deg, ${rgba(
                              colors.signalGreen,
                              0.9,
                            )} 0%, ${rgba(colors.brightBlue, 0.35)} 100%)`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

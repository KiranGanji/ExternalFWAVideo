import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../shared/Background';
import {ParticleField} from '../shared/ParticleField';
import {AgentCore} from '../shared/AgentCore';
import {ReasoningBranch} from '../shared/ReasoningBranch';
import {CodeNotebook} from '../shared/CodeNotebook';
import {colors, fonts, rgba} from '../config/tokens';

const branches = [
  {label: 'Statistical proof', angle: -42, color: colors.brightBlue, appearAtFrame: 30},
  {label: 'Surgical prerequisites', angle: -18, color: colors.optumGold, appearAtFrame: 108},
  {label: 'Policy mapping', angle: 8, color: colors.cyanGlow, appearAtFrame: 190},
  {label: 'Known fraud comparison', angle: 34, color: colors.cyanGlow, appearAtFrame: 270},
  {label: 'Ontology layer', angle: 58, color: colors.optumGold, appearAtFrame: 350},
];

const notebookCells = [
  {type: 'markdown', lines: ['# Hypothesis H2 - prerequisite steps skipped before surgery']},
  {
    type: 'code',
    lines: [
      'claims = spark.read.table("prod.claims.historical")',
      'surg = claims.filter(col("proc_cpt").isin(TARGET_SURGERIES))',
      'flagged = surg.join(prereq_map, "member_id", "left") \\',
      '  .filter(col("prereq_present") == False)',
      'provider_scores = score_anomaly(flagged, baseline="peer_specialty")',
      'display(provider_scores.orderBy(desc("risk_score")))',
    ],
  },
  {type: 'output', lines: ['provider_id   risk_score   flagged_claims']},
] as const;

type Scene04Props = {
  showOntologyLattice?: boolean;
  runFrame?: number;
};

export const Scene04_ReasonAndBuild = ({
  showOntologyLattice = true,
  runFrame = 760,
}: Scene04Props) => {
  const frame = useCurrentFrame();
  const buildCharge = interpolate(frame, [480, 620], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const notebookReveal = interpolate(frame, [648, 720], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background glowPosition="center" intensity={1.05} />
      <ParticleField count={88} color={colors.cyanGlow} opacity={0.18} direction="radial" />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 110,
          transform: 'translateX(-50%)',
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            gap: 14,
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
            REASON ACROSS MULTIPLE ANGLES
          </div>
          <AgentCore size={128} state="reasoning" intensity={1} />
        </div>
      </div>
      {branches.map((branch) => (
        <ReasoningBranch
          key={branch.label}
          label={branch.label}
          angle={branch.angle}
          color={branch.color}
          appearAtFrame={branch.appearAtFrame}
          origin={{x: 960, y: 366}}
          length={branch.label === 'Ontology layer' ? 260 : 330}
        />
      ))}
      {showOntologyLattice ? (
        <svg
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
          viewBox="0 0 1920 1080"
        >
          {[
            {x: 772, y: 730, label: 'BUSINESS'},
            {x: 914, y: 690, label: 'CPT'},
            {x: 1024, y: 734, label: 'POLICY'},
            {x: 1130, y: 688, label: 'DATA'},
            {x: 870, y: 790, label: 'TAXONOMY'},
            {x: 1048, y: 806, label: 'SCHEMA'},
            {x: 1198, y: 758, label: 'PEERS'},
          ].map((node, index, nodes) => {
            const nodeGlow = interpolate(
              Math.sin(frame / 18 + index),
              [-1, 1],
              [0.3, 1],
            );

            return (
              <g key={node.label}>
                {nodes
                  .slice(index + 1)
                  .filter((_, innerIndex) => innerIndex % 2 === 0)
                  .map((target) => (
                    <line
                      key={`${node.label}-${target.label}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={rgba(colors.cyanGlow, 0.12)}
                      strokeWidth={1}
                    />
                  ))}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={9}
                  fill={rgba(colors.optumGold, nodeGlow * 0.42)}
                />
                <text
                  x={node.x}
                  y={node.y + 34}
                  fill={colors.textSecondary}
                  textAnchor="middle"
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    letterSpacing: '0.08em',
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '53%',
          transform: 'translate(-50%, -50%)',
          opacity: 1 - notebookReveal * 0.2,
        }}
      >
        <div
          style={{
            width: 112 + buildCharge * 62,
            height: 112 + buildCharge * 62,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${rgba(colors.signalGreen, 0.22 * buildCharge)} 0%, ${rgba(
              colors.brightBlue,
              0.32 + buildCharge * 0.3,
            )} 40%, transparent 72%)`,
            filter: `blur(${18 + buildCharge * 10}px)`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '53%',
          transform: `translate(-50%, -50%) scale(${0.4 + notebookReveal * 0.6})`,
          opacity: notebookReveal,
        }}
      >
        <CodeNotebook cells={notebookCells} typeOnStartFrame={690} runAtFrame={runFrame} />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 122,
          top: 118,
          opacity: interpolate(frame, [710, 780], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          display: 'grid',
          justifyItems: 'end',
          gap: 8,
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
          PRODUCTION-READY NOTEBOOK
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 24,
            color: colors.textSecondary,
            maxWidth: 380,
            textAlign: 'right',
            lineHeight: 1.32,
          }}
        >
          Writes and runs its own Python against historical claims.
        </div>
      </div>
    </AbsoluteFill>
  );
};

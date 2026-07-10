# UHG Fraud Signal Engine — Explainer Video Spec

A ~2:10 cinematic explainer built in Remotion for senior leadership. Modular scene architecture so individual scenes can be edited in isolation. Premium motion design — confident, not flashy — with deliberate use of light, particles, and camera depth to make an agentic fraud-detection system feel as significant as it is. The narrative arc moves from *chaos* (fraud spreading faster than we can track) to *control* (an always-on intelligence that reads the world, reasons, writes its own code, and returns evidence-backed Signals), landing on *impact* (2,500 hypotheses, payment integrity, and affordability).

---

## 1. Project Overview

| Item | Value |
|---|---|
| Total duration | ~130 seconds (3900 frames @ 30fps) |
| Resolution | 1920 × 1080 |
| FPS | 30 |
| Framework | Remotion 4.x |
| Language | TypeScript |
| Audience | UHG senior leadership |
| Tone | Premium, confident, cinematic — technology-power forward, never gimmicky |
| Team | UHG Fraud Analytics |

---

## 2. Tech Stack

- **Remotion 4.x** (`@remotion/core`, `@remotion/cli`, `@remotion/bundler`)
- **TypeScript** (strict mode)
- **Tailwind CSS** via `@remotion/tailwind` for utility styling
- **@remotion/google-fonts** for typography loading
- **@remotion/noise** for grain/dust textures
- **react-spring** (optional, for some scenes) — most motion uses Remotion's native `spring()` and `interpolate()`

Install:
```bash
npm create video@latest fraud-signal-video -- --template=blank-typescript
npm i @remotion/tailwind @remotion/google-fonts @remotion/noise
```

---

## 3. Project Structure

```
src/
├── Root.tsx                        # Composition registration
├── Main.tsx                        # Master composition — wires scenes together
├── config/
│   ├── tokens.ts                   # Colors, fonts, spacing, easings
│   ├── timing.ts                   # Frame ranges per scene (single source of truth)
│   └── narration.ts                # All voiceover text with timing markers
├── shared/
│   ├── Background.tsx              # Reusable layered gradient + noise background
│   ├── ParticleField.tsx           # Configurable particle/dust system
│   ├── GlowOrb.tsx                 # Animated radial glow
│   ├── GradientText.tsx            # Animated gradient text reveal
│   ├── AgentCore.tsx               # The hero agentic "brain" — glowing hex/orbital core
│   ├── ArticleCard.tsx             # Floating news/fraud-report fragment
│   ├── HypothesisChip.tsx          # Reusable hypothesis pill
│   ├── ReasoningBranch.tsx         # A labeled reasoning-angle lane + animated path
│   ├── CodeNotebook.tsx            # Simulated Databricks/Python notebook panel
│   ├── SignalReport.tsx            # The "Signal" output card (providers/claims)
│   ├── ConnectionLine.tsx          # Animated SVG line between elements
│   ├── Counter.tsx                 # Animated number roll-up (for "2,500")
│   ├── Caption.tsx                 # Lower-third narration caption (optional)
│   └── hooks/
│       ├── useEasedFrame.ts        # Eased interpolation helper
│       └── useStagger.ts           # Stagger child animations
└── scenes/
    ├── Scene01_TheProblem.tsx
    ├── Scene02_TheVision.tsx
    ├── Scene03_Hypothesize.tsx
    ├── Scene04_ReasonAndBuild.tsx
    ├── Scene05_Signal.tsx
    ├── Scene06_HumanInLoop.tsx
    └── Scene07_ImpactScale.tsx
```

**Modularity rule:** every scene is a self-contained component that receives only `durationInFrames` as a prop and reads from `config/tokens.ts` and `config/timing.ts`. To edit a scene, the agent (or you) should only need to touch one file.

---

## 4. Design System

### 4.1 Color Tokens (`config/tokens.ts`)

```ts
export const colors = {
  // Backgrounds
  bgDeep:     '#070B1F',  // deepest navy — outer space
  bgMid:      '#0E1742',  // mid navy — main scene bg
  bgGlow:     '#1A2868',  // subtle radial highlight

  // Brand
  uhgBlue:    '#002677',  // UHG primary
  brightBlue: '#00B0E2',  // accent — main glow/highlight
  cyanGlow:   '#7EE8FA',  // hot edges, particle highlights
  optumGold:  '#F2B544',  // sparingly — for "alive" pulse & human-source moments

  // Semantic accents (new for this video)
  alertRed:   '#FF5A5F',  // fraud / danger — Scene 1 flares, "abuse" highlights
  alertAmber: '#FFA94D',  // caution / spreading — transitional danger tone
  signalGreen:'#3DDC97',  // the positive "Signal found / verified" moment

  // Surfaces
  nodeSurface:  'rgba(255,255,255,0.06)',
  nodeBorder:   'rgba(126, 232, 250, 0.25)',
  nodeBorderHot:'rgba(126, 232, 250, 0.7)',
  codeSurface:  'rgba(8, 14, 34, 0.92)',   // notebook panel bg
  codeBorder:   'rgba(126, 232, 250, 0.18)',

  // Text
  textPrimary:   '#F4F7FF',
  textSecondary: '#A9B4D4',
  textMuted:     '#5D6B8F',
} as const;
```

**Color discipline:** `alertRed` / `alertAmber` belong only to Scenes 1–2 (the problem) and to "abusing provider" highlights in Scene 5. Everything the *system* does is rendered in the brand blues/cyan — this visually equates "our technology" with calm control. `signalGreen` appears exactly once as a payoff (Scene 5, Signal verified). `optumGold` is reserved for human-in-the-loop and "alive" pulse moments.

### 4.2 Typography

- **Display:** *Inter Display* (700, 600) — for headlines and the closing tagline
- **Body / Captions:** *Inter* (500, 400)
- **Mono (code / data / hypotheses / notebook):** *JetBrains Mono* (500)

Sizes (1080p baseline):
- Hero headline: 84px
- Sub headline: 48px
- Body / caption: 28px
- Node / chip label: 22px
- Mono snippet: 18px
- Big stat ("2,500"): 160px

### 4.3 Motion Principles

1. **Spring physics over linear tweens.** Default to `spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 1 } })`.
2. **Stagger.** When multiple elements enter together, offset each by 3–5 frames. Movement should feel choreographed, not synchronized.
3. **Easing.** For non-spring interpolations, use `Easing.bezier(0.16, 1, 0.3, 1)` (ease-out expo) — confident deceleration.
4. **Camera.** Implement camera moves as a parent `<div>` with `transform: scale() translate()`. Camera should always be moving subtly (drift, slow dolly), never frozen.
5. **No bounce.** Avoid playful overshoot. This is leadership-grade.
6. **Light reveals.** Most reveals should feel like *light arriving*, not objects sliding in — opacity + blur + scale, not just translate.
7. **Chaos → order as a motion language.** Scenes 1–2 use faster, more erratic, more divergent motion. From Scene 3 onward, motion becomes deliberate, converging, and clean. The *feeling* of the system taking control should be legible purely through motion, before a single word is heard.

### 4.4 Easings (`config/tokens.ts`)

```ts
import { Easing } from 'remotion';

export const easings = {
  outExpo:   Easing.bezier(0.16, 1, 0.3, 1),
  outQuart:  Easing.bezier(0.25, 1, 0.5, 1),
  inOutSine: Easing.bezier(0.37, 0, 0.63, 1),
};

export const springs = {
  gentle:    { damping: 20, stiffness: 90,  mass: 1 },
  standard:  { damping: 18, stiffness: 120, mass: 1 },
  snappy:    { damping: 14, stiffness: 180, mass: 0.8 },
};
```

---

## 5. Master Composition (`Main.tsx`)

Single source of truth for scene wiring. Edit `config/timing.ts` to reflow timing.

```ts
// config/timing.ts
export const timing = {
  scene01: { start: 0,    duration: 600 }, // 0:00 – 0:20  The Problem
  scene02: { start: 600,  duration: 450 }, // 0:20 – 0:35  The Vision
  scene03: { start: 1050, duration: 600 }, // 0:35 – 0:55  Ingest & Hypothesize
  scene04: { start: 1650, duration: 900 }, // 0:55 – 1:25  Reason & Build
  scene05: { start: 2550, duration: 450 }, // 1:25 – 1:40  Signal
  scene06: { start: 3000, duration: 300 }, // 1:40 – 1:50  Human in the Loop
  scene07: { start: 3300, duration: 600 }, // 1:50 – 2:10  Impact & Scale
};
```

```tsx
// Main.tsx
import { AbsoluteFill, Sequence } from 'remotion';
import { timing } from './config/timing';
import Scene01 from './scenes/Scene01_TheProblem';
import Scene02 from './scenes/Scene02_TheVision';
// ...etc

export const Main = () => (
  <AbsoluteFill style={{ backgroundColor: '#070B1F' }}>
    <Sequence from={timing.scene01.start} durationInFrames={timing.scene01.duration}>
      <Scene01 />
    </Sequence>
    <Sequence from={timing.scene02.start} durationInFrames={timing.scene02.duration}>
      <Scene02 />
    </Sequence>
    {/* ... scenes 03–07 ... */}
  </AbsoluteFill>
);
```

Each scene uses its **local** frame (via `useCurrentFrame()` inside the `Sequence`), so scenes are timing-agnostic and reusable.

---

## 6. Shared Components

### 6.1 `Background.tsx`
Three layered elements always present, varying intensity per scene via props:
1. Base color fill (`bgDeep`)
2. Radial gradient orb behind action (`bgGlow` at 40% opacity, position prop)
3. Subtle film grain via `@remotion/noise` at 4% opacity

Props: `glowPosition?: 'center' | 'topLeft' | 'topRight'`, `intensity?: number`, `tint?: 'blue' | 'alert'` (Scenes 1–2 can push a faint red/amber tint into the glow).

### 6.2 `ParticleField.tsx`
Renders N particles drifting with parallax. Each particle has random size (1–4px), speed, opacity oscillation, and depth layer (3 layers — closer = larger + faster + more blur).

Props: `count?: number = 80`, `color?: string`, `speed?: number = 1`, `direction?: 'up' | 'inward' | 'radial'`

### 6.3 `AgentCore.tsx`
**The hero asset of the video.** A glowing geometric "brain" — a rotating hexagonal lattice with internal light and 2–3 thin orbital rings at different inclinations. Appears (in varying scale/role) in Scenes 2, 3, 4, 6, 7. This is the visual embodiment of the agentic system; treat it as a recurring character.

Props:
```ts
interface AgentCoreProps {
  size?: number;                 // px radius, default 160
  state?: 'idle' | 'reading' | 'reasoning' | 'emitting';
  intensity?: number;            // internal glow 0–1
  ringCount?: number;            // default 3
}
```
Visual: internal light should *flicker* organically (overlay 2–3 sine waves at different frequencies on the glow opacity). Outer hex edges carry a subtle chromatic glow (1–2px cyan→magenta separation). When `state='reasoning'`, the lattice sub-cells illuminate in sequence.

### 6.4 `ArticleCard.tsx`
A frosted-glass tile representing a real-world fraud news report. Rendered as a small "clipping": a faux publication kicker, a bold headline line, 2–3 greyed body lines, and a tiny source chip. Slight random tilt.

Props:
```ts
interface ArticleCardProps {
  headline: string;
  source?: string;               // e.g. "DOJ Press Release", "Kaiser Health News"
  tone?: 'neutral' | 'alert';    // alert adds a faint red edge
  size?: 'sm' | 'md' | 'lg';
}
```

### 6.5 `HypothesisChip.tsx`
Rounded pill, frosted glass, thin cyan border, mono label. Represents one generated hypothesis. When `state='forming'`, it fades up with a brief write-on shimmer.

Props: `label: string`, `state?: 'forming' | 'idle' | 'selected'`, `size?: 'sm' | 'md'`

### 6.6 `ReasoningBranch.tsx`
A single labeled reasoning lane used in Scene 4. Renders: a label chip at the lane head, an animated Bezier path, and a traveling data packet. Used ×5 (one per reasoning angle).

Props:
```ts
interface ReasoningBranchProps {
  label: string;                 // e.g. "Statistical proof"
  icon?: ReactNode;
  angle: number;                 // fan-out angle from center
  color?: string;
  appearAtFrame: number;
}
```

### 6.7 `CodeNotebook.tsx`
A simulated Databricks/Python notebook panel. Dark `codeSurface`, thin `codeBorder`, a faux toolbar (Databricks-style cluster status dot + "Python" pill), and cells that type on line-by-line. Includes a "Run" state where a cell shows a spinner → green check, and an output area renders a small dataframe/plot.

Props:
```ts
interface CodeNotebookProps {
  cells: { type: 'code' | 'markdown' | 'output'; lines: string[] }[];
  typeOnStartFrame?: number;
  runAtFrame?: number;
  showClusterStatus?: boolean;   // default true
}
```

### 6.8 `SignalReport.tsx`
The payoff card. A clean report panel titled **SIGNAL**, with a confidence meter, a ranked list of flagged providers (masked IDs), a claims count, and a "verified" seal moment (`signalGreen`).

Props:
```ts
interface SignalReportProps {
  providers: { id: string; score: number }[];
  claimsCount?: number;
  verifyAtFrame?: number;
}
```

### 6.9 `ConnectionLine.tsx`
Animated SVG path between two `{x, y}` points. Draws on with `stroke-dasharray`. Can pulse a "data packet" (small glowing circle) along the path when `pulsing=true`.

### 6.10 `Counter.tsx`
Animated number roll-up for the "2,500 hypotheses" reveal. Eases from 0 → target, mono/display font, with digit odometer feel.

Props: `to: number`, `durationInFrames?: number`, `suffix?: string`, `format?: 'comma' | 'plain'`

---

## 7. Scene-by-Scene Specification

> **Each scene below is independently editable.** The visual concept, animation breakdown, and narration are self-contained. Frame times inside each scene are **local** (0-based within the scene's own Sequence).

---

### SCENE 01 — *The Problem*
**File:** `scenes/Scene01_TheProblem.tsx`
**Duration:** 600 frames (0:00 – 0:20)
**Narration:**
> "Healthcare fraud evolves faster than any team can manually track. Every day, new schemes surface in the news — providers exploiting surgeries, policies, and claims in ways that cost the system billions. By the time a scheme is investigated, it has often already spread. The question is: what if we could catch these patterns the moment they emerge?"

#### Visual Concept
We open in deep, dimensional dark-navy space. **Fraud headlines** — rendered as `ArticleCard` clippings — drift and multiply through 3D space across three depth layers. It begins with one or two, then accelerates: more and more clippings fade in, faster and faster, until the frame feels crowded and slightly overwhelming. A faint desaturated **US map** sits in the deep background; as headlines multiply, small `alertRed` flare points ignite across the map and spread outward in soft rings — visualizing "it has already spread." The whole scene should induce a low-grade "we can't keep up" tension. On the final line, everything decelerates and dims, and a single line of text poses the question, seeding the pivot to Scene 2.

#### Animation Breakdown

**Frames 0–60 (0:00–0:02): Establish**
- Camera starts at `scale: 1.08, translateY: -20px`, slow dolly to neutral across the full scene.
- Background `GlowOrb` top-left, 25% intensity, `tint='alert'` (very faint red-amber bleed).
- Particle field: 50 dust particles, 25% opacity, drifting.
- The desaturated US map fades in at 12% opacity in the deep background.

**Frames 30–360 (0:01–0:12): Headlines multiply, accelerating**
- Start with 2 `ArticleCard`s, then emit progressively more. Emission cadence *tightens* over time (e.g. gap between new cards shrinks from ~40 frames → ~8 frames) to convey acceleration.
- Target ~16–20 cards on screen by frame 360, distributed across 3 depth layers (back = smaller/blurred/dimmer).
- Each card enters: `opacity 0→1`, `scale 0.85→1`, `blur 12→0` over 22 frames, eased `outExpo`; slight random tilt (±4°).
- Each card drifts on independent `sin`-based vectors; nearer layers drift faster.

**Frames 120–420 (0:04–0:14): Map flares — "already spread"**
- As cards accumulate, `alertRed` flare points ignite on the US map: `scale 0→1` pinpoint, then a soft ring expands (`r: 0→140px`, `opacity 0.7→0` over 40 frames).
- Stagger flares ~25 frames apart; by the end ~8–10 flares have fired, some overlapping — the map reads as an outbreak.
- Flares are subtle (deep background, low opacity) — atmosphere, not a focal chart.

**Frames 360–480 (0:12–0:16): Peak overwhelm**
- Brief moment of maximum density + slight camera push-in (`scale 1→1.03`). Cards jitter marginally faster. This is the emotional low point: "by the time it's investigated, it's spread."

**Frames 480–600 (0:16–0:20): The question**
- Everything decelerates. Cards drift to a near-stop and desaturate further (saturation −30%), dimming to ~40% opacity.
- Map flares fade out.
- Center-frame, a single line writes on (per-word fade + `translateY 8→0`, stagger 5 frames/word): *"What if we could catch it the moment it emerges?"* — `textPrimary`, italic, 40px.

#### Headline Content (the actual text on the cards)
Use fictional-but-plausible, non-defamatory headlines — no real provider names. Mix of neutral and `tone='alert'`:
- *"Provider billed for surgeries never performed"*
- *"$40M upcoding scheme uncovered at clinic chain"*
- *"Unnecessary procedures flagged in federal probe"*
- *"Phantom patients, real claims: DME fraud ring charged"*
- *"Modifier abuse inflates reimbursement, audit finds"*
- *"Genetic testing kickback scheme reaches settlement"*
- *"Telehealth billing fraud spikes post-pandemic"*
- *"Prerequisite steps skipped before costly surgeries"*
- Source chips (small, greyed): *"DOJ"*, *"HHS-OIG"*, *"Health News"*, *"State AG"*

#### Wow factor
The **acceleration** is the whole point — the audience should *feel* the pace outrun a human team. Pair the tightening emission cadence with the spreading map flares so two independent signals both say "faster than we can track." Keep it cinematic, never cluttered-ugly: depth-of-field blur on back layers prevents the density from reading as noise.

#### Props interface
```ts
interface Scene01Props {
  headlineCount?: number;     // default 18
  showMapFlares?: boolean;    // default true
  alertIntensity?: number;    // default 0.35
}
```

---

### SCENE 02 — *The Vision*
**File:** `scenes/Scene02_TheVision.tsx`
**Duration:** 450 frames (0:20 – 0:35)
**Narration:**
> "At UHG's Fraud Analytics team, we built exactly that. An always-on, agentic intelligence system that turns the world's fraud reporting into tested signals inside our own ecosystem — automatically, and at scale."

#### Visual Concept
The scattered, dimmed headlines from Scene 1 are still present — but now they **respond**. From the center of the frame, the `AgentCore` ignites into existence (the pinpoint of "what if" becoming a real system). Its arrival calms the space: the red/amber tint drains out of the frame and is replaced by brand blue as the Core's light spreads. The drifting headlines *orient* — each card rotates to face the Core and begins a slow, orderly orbit around it. Motion transitions from chaotic to deliberate. This is the tonal hinge of the film: chaos → control.

#### Animation Breakdown

**Frames 0–45 (0:00–0:015): Carry-over**
- Inherit Scene 1's final card positions (shared deterministic `articleLayout()`), still dim/desaturated.
- Background still carries a faint alert tint.

**Frames 30–120 (0:01–0:04): The Core ignites**
- `AgentCore` births at center: `scale 0→1`, `blur 24→0`, `opacity 0→1` over 40 frames, spring `standard`, followed by a radial bloom (`r` grows, fades over 50 frames).
- As it ignites, a wash of `brightBlue` light sweeps outward; the frame's alert tint interpolates to brand blue over 60 frames. Saturation on the cards recovers.

**Frames 90–300 (0:03–0:10): The space responds**
- Every `ArticleCard` rotates so its face points toward the Core (ease `outQuart`), then eases into a slow shared orbit (very slow angular velocity — dignified, not spinning).
- Cards brighten back to full opacity as they "come under management."
- The Core's orbital rings rotate; internal light flickers organically (`state='idle'` → subtle).

**Frames 150–360 (0:05–0:12): "Always-on, at scale"**
- Thin `ConnectionLine`s draw from the Core to a handful of orbiting cards, then retract — a sense of the system continuously reaching out and reading.
- A soft, slow pulse emanates from the Core every ~90 frames (the "heartbeat" of an always-on system).

**Frames 360–450 (0:12–0:15): Title beat**
- Lower-third or center text writes on: **"An always-on agentic fraud intelligence system."** — Inter Display 600, 48px, `textPrimary`.
- Optional smaller kicker above it in `textSecondary`, small caps: *"UHG · FRAUD ANALYTICS"*.

#### Wow factor
The **tint drain** (red → blue) synced to the Core's ignition is the signature moment — it visually equates "our technology" with restored order. Don't rush it; let the color shift breathe across a full 2 seconds. The headlines snapping from random drift into a calm shared orbit sells "control" without a single explanatory word.

#### Props interface
```ts
interface Scene02Props {
  showTitle?: boolean;        // default true
  kicker?: string;            // default "UHG · FRAUD ANALYTICS"
  orbitSpeed?: number;        // default 0.4
}
```

---

### SCENE 03 — *Ingest & Hypothesize*
**File:** `scenes/Scene03_Hypothesize.tsx`
**Duration:** 600 frames (0:35 – 0:55)
**Narration:**
> "It starts by continuously scanning articles on healthcare fraud across the country. Our agents read each report and convert it into precise, testable hypotheses — asking, 'Could this same abuse be happening within our claims?'"

#### Visual Concept
We move in closer on the process. A single `ArticleCard` is drawn from the orbit into a focused position (left-of-center). The `AgentCore` (now `state='reading'`) scans it — a horizontal scan-line sweeps the article, and streams of tiny glyph/token particles flow from the article into the Core. The Core processes, then **emits hypotheses**: `HypothesisChip`s write on one by one to the right of the Core, each phrased as a testable statement. A recurring subtitle-style question hovers beneath: *"Could this be happening in our claims?"* The scene establishes the input→understanding→hypothesis transformation clearly and elegantly.

#### Animation Breakdown

**Frames 0–60 (0:00–0:02): Focus pull**
- Background orbit from Scene 2 continues but recedes (opacity → 30%, slight blur) as one `ArticleCard` scales up and moves to focus position at ~(32%, 50%).
- Core repositions to ~(50%, 50%), scales to hero size, `state='reading'`.

**Frames 60–210 (0:02–0:07): The read**
- A cyan scan-line sweeps top→bottom across the focused article twice (each sweep ~45 frames).
- Token particles (tiny glyphs / dots) stream from the article along a gentle Bezier into the Core; trails on each. Rate ramps up then settles.
- Core internal lattice illuminates in sequence as it "ingests."

**Frames 180–480 (0:06–0:16): Hypotheses emit**
- 3–4 `HypothesisChip`s appear in a vertical stack right-of-Core (~68% x), staggered ~70 frames apart:
  - F~190: *"H1: Same-day mod-25 + E&M overbilling by matching specialty"*
  - F~260: *"H2: Surgeries billed without required prerequisite steps"*
  - F~330: *"H3: Claim volume spikes vs. peer-provider baseline"*
  - F~400: *"H4: Policy-excluded procedure billed under alt code"*
- Each chip: `state='forming'` write-on shimmer, `opacity 0→1`, `scale 0.9→1`, plus a `ConnectionLine` from Core → chip that pulses one packet.
- Labels use JetBrains Mono, 18–20px, wrapped to 2 lines max. (Keep them plausible but generic.)

**Frames 240–600 (0:08–0:20): The recurring question**
- Beneath the Core, a persistent line fades in and gently pulses: *"Could this same abuse be happening in our claims?"* — `textSecondary`, italic, 30px.
- A small **"continuously scanning"** indicator (mono, tiny, `textMuted`) sits top-right with an animated ellipsis, reinforcing always-on ingestion.

#### Wow factor
The **scan-line + token stream** is what makes "the agent reads" feel literal and impressive. The hypotheses writing themselves out as clean, testable statements — in mono, like structured output — signals rigor to a technical-leaning leadership audience. Keep hypothesis text realistic to your domain; that authenticity is what lands with people who know the space.

#### Props interface
```ts
interface Scene03Props {
  hypotheses?: string[];      // override the emitted hypothesis lines
  articleHeadline?: string;   // the focused article
  showScanline?: boolean;     // default true
}
```

---

### SCENE 04 — *Reason & Build*  — **the explanatory heart / tech-power showcase**
**File:** `scenes/Scene04_ReasonAndBuild.tsx`
**Duration:** 900 frames (0:55 – 1:25) — *longest scene*
**Narration:**
> "But we don't stop at hypotheses. The system reasons across multiple angles — statistical proof, surgical prerequisites, policy mapping, and comparisons to known fraud patterns. It taps into our rich ontology layer, combining deep business and data context. Then it does something remarkable: it writes its own working code — production-ready Python notebooks that run directly on Databricks against our historical claims."

#### Visual Concept
This is the money scene — where leadership sees the *depth* of the technology. One `HypothesisChip` from Scene 3 slides to center-top and becomes the "seed." From it, **five reasoning branches fan outward** (`ReasoningBranch` ×5), each a labeled lane with an icon and an animated path: *Statistical proof*, *Surgical prerequisites*, *Policy mapping*, *Similar-fraud comparison*, and *Ontology layer*. The ontology branch is visually distinct — it connects downward to a glowing **ontology lattice** (a denser mini-constellation labeled BUSINESS ↔ DATA, echoing an internal knowledge graph). All five branches then **converge** into a single node, which materializes into a **`CodeNotebook`** that types itself out and *runs on Databricks* — cluster status dot goes live, a cell executes (spinner → green check), and an output dataframe/plot renders. The message: it doesn't just think — it builds and executes.

#### Animation Breakdown

**Frames 0–90 (0:00–0:03): Seed the reasoning**
- A single `HypothesisChip` (carry-over from Scene 3, e.g. H2) moves to center-top (~50%, 22%) and pulses once.
- Core sits just beneath it, `state='reasoning'` (lattice cells firing in sequence).

**Frames 60–420 (0:02–0:14): Branches fan out (narrator-synced)**
Five `ReasoningBranch`es draw outward from the seed, each as the narrator names it:
- F~70: **"Statistical proof"** — icon: sigma/curve — color `brightBlue`
- F~140: **"Surgical prerequisites"** — icon: checklist/steps — color `cyanGlow`
- F~210: **"Policy mapping"** — icon: document/shield — color `brightBlue`
- F~280: **"Similar-fraud comparison"** — icon: fingerprint/match — color `cyanGlow`
- F~350: **"Ontology layer"** — icon: graph/hex — color `optumGold` (distinct; the "intelligence" branch)

Each branch: label chip writes on, Bezier path draws via `stroke-dasharray` over 30 frames, then a data packet travels the path. Fan angles spread evenly (e.g. −40° to +40° across the top, ontology dropping downward).

**Frames 300–540 (0:10–0:18): The ontology layer**
- The ontology branch expands into a small **knowledge lattice** lower-center: ~8–10 interconnected `NodeChip`-style points in two faint clusters labeled **BUSINESS** (left) and **DATA** (right), thin connective lines between them.
- Packets from the hypothesis flow into this lattice and light up specific nodes (e.g. *"CPT ↔ policy"*, *"provider taxonomy"*, *"claim line schema"*), then flow back — visualizing "combining deep business and data context."
- Keep node labels small and few; this is texture, not a readable diagram.

**Frames 480–720 (0:16–0:24): Convergence**
- All five branch endpoints animate inward, their paths converging into a single bright **build node** at center (~50%, 55%). As they meet, a bright bloom fires.
- The build node briefly shows a compiling shimmer.

**Frames 660–900 (0:22–0:30): It writes and runs code**
- The build node expands into a `CodeNotebook` panel (occupies center ~55% width).
- Cells type on line-by-line (JetBrains Mono), e.g.:
  ```python
  # Hypothesis H2 — prerequisite steps skipped before surgery
  claims = spark.read.table("prod.claims.historical")
  surg = claims.filter(col("proc_cpt").isin(TARGET_SURGERIES))
  flagged = surg.join(prereq_map, "member_id", "left") \
                .filter(col("prereq_present") == False)
  provider_scores = score_anomaly(flagged, baseline="peer_specialty")
  display(provider_scores.orderBy(desc("risk_score")))
  ```
- Databricks touches: a cluster status pill turns from grey → `signalGreen` "● Running", a "Python" language chip, cell run indicator (spinner → green check at ~F 840).
- Output cell renders a tiny dataframe preview + a small bar/scatter of provider risk scores.
- Do **not** require the code to be literally correct-runnable; it must *read* as authentic to a data engineer glancing at it. Keep identifiers plausible and domain-accurate.

#### Layout (positions, percent-of-frame, anchor: center)
```
Hypothesis seed:        (50%, 22%)
Core:                   (50%, 34%)
Branch fan (5):         arc across top, endpoints ~(15–85%, 30–45%)
Ontology lattice:       (50%, 70%)  cluster centers ~(38%, 72%) & (62%, 72%)
Convergence build node: (50%, 55%)
CodeNotebook (final):   centered, ~(50%, 52%), 55% width
```

#### Wow factor
Three compounding "wow" beats, escalating: (1) the **fan-out** shows breadth of reasoning; (2) the **ontology lattice** shows proprietary depth ("we have context others don't"); (3) the **self-writing, self-running notebook** is the crescendo — *the system builds its own tests and executes them on real infrastructure.* Land the Databricks cluster going live + the green check precisely on "run directly on Databricks." That single frame is the technology-power proof point for leadership.

#### Props interface
```ts
interface Scene04Props {
  branches?: { label: string; color: string; appearAtFrame: number }[];
  notebookCells?: CodeNotebookProps['cells'];
  showOntologyLattice?: boolean;   // default true
  runFrame?: number;               // when the Databricks run "completes"
}
```

---

### SCENE 05 — *The Signal*
**File:** `scenes/Scene05_Signal.tsx`
**Duration:** 450 frames (1:25 – 1:40)
**Narration:**
> "The result is a Signal — a precise report surfacing the providers and claims most likely abusing the system in the same way. Evidence-backed, ready for action."

#### Visual Concept
The notebook's output crystallizes into the payoff: a **`SignalReport`** card slides to center, titled **SIGNAL**. It reveals a confidence meter filling up, then a ranked list of flagged providers (masked IDs) with risk scores, and a claims count rolling up. The top offenders are highlighted with a restrained `alertRed` accent (the only place fraud-red returns), while the report frame itself and a **"verified"** seal render in `signalGreen` — the system's confident, evidence-backed conclusion. This scene should feel like a clean, authoritative deliverable landing on the table.

#### Animation Breakdown

**Frames 0–60 (0:00–0:02): Crystallize**
- The Scene 4 notebook output area lifts out and expands into the `SignalReport` panel; the rest of the notebook fades back.
- Panel enters: `opacity 0→1`, `scale 0.94→1`, subtle blue underglow.
- Title **SIGNAL** writes on (Inter Display 700), with a small mono subtitle: *"Hypothesis H2 · historical claims scan"*.

**Frames 60–180 (0:02–0:06): Confidence meter**
- A horizontal confidence meter fills `0 → 87%` over 60 frames, eased `outQuart`, color transitioning into `signalGreen` as it passes threshold.
- A `Counter` rolls up a claims figure (e.g. *"1,284 claims flagged"*).

**Frames 150–360 (0:05–0:12): Ranked providers**
- A ranked list of 4–5 masked providers writes on, staggered ~30 frames:
  - `PRV-••••2931   risk 0.94`
  - `PRV-••••8107   risk 0.91`
  - `PRV-••••4460   risk 0.88`
  - …
- Top two rows carry a faint `alertRed` left-edge bar (highest-risk emphasis). Risk scores count up quickly on entry.

**Frames 300–420 (0:10–0:14): Verified seal**
- A `signalGreen` check/seal stamps in at the report header (`scale 1.3→1`, brief bloom) as narration hits "evidence-backed."
- Small mono footer fades in: *"Ready for investigator review"*.

**Frames 420–450 (0:14–0:15): Settle**
- Everything holds; a gentle continuous glow oscillation keeps the frame alive.

#### Wow factor
Contrast is the tool here: after the kinetic build scene, the Signal should feel *still, precise, and final* — a confident artifact. The single reintroduction of `alertRed` (only on flagged providers) inside an otherwise `signalGreen`/blue frame makes the "we caught them" beat unmistakable. Keep all IDs masked and synthetic — this reads as a demo, not a data leak.

#### Props interface
```ts
interface Scene05Props {
  providers?: { id: string; score: number }[];
  claimsCount?: number;       // default 1284
  confidence?: number;        // default 0.87
}
```

---

### SCENE 06 — *Human in the Loop*
**File:** `scenes/Scene06_HumanInLoop.tsx`
**Duration:** 300 frames (1:40 – 1:50)
**Narration:**
> "And through an intuitive interface, any analyst can select an article and launch the entire agentic process on demand — turning a news story into an investigation in minutes."

#### Visual Concept
We pull back to reveal a clean **product UI** — a stylized interface panel (not a literal screenshot; a designed abstraction in the same visual language). On the left, a list of articles; a cursor selects one; a **"Run Signal"** button lights up. On click, a compact version of the whole pipeline (Core → branches → notebook → Signal) animates *inside* the interface as a live progress flow, collapsing the entire film's process into a few elegant seconds. The message: this power is one click away for every analyst.

#### Animation Breakdown

**Frames 0–60 (0:00–0:02): The interface assembles**
- A framed UI panel builds in: left rail = list of ~4 article rows; main area = empty "run" canvas; a header with the product name (e.g. **"Signal Studio"** — replace with your real product name).
- Panels fade/slide in with `outExpo`, staggered.

**Frames 60–150 (0:02–0:05): Select & launch**
- A cursor moves to an article row; the row highlights (`nodeBorderHot`).
- A **"Run Signal ▷"** button pulses, then registers a click (brief scale-down + `signalGreen` flash).

**Frames 120–270 (0:04–0:09): Pipeline in miniature**
- Inside the main canvas, a condensed pipeline animates left→right as a progress flow:
  `Article → Hypotheses → Reasoning → Databricks → Signal`
  - Each stage lights up in sequence with a checkmark; a thin progress line advances beneath.
  - Tiny mono status text updates: *"Reading…" → "Generating hypotheses…" → "Reasoning…" → "Running on Databricks…" → "Signal ready ✓"*.
- Ends with a small `SignalReport` thumbnail appearing in the canvas (`signalGreen` confirm).

**Frames 240–300 (0:08–0:10): "in minutes"**
- A subtle timer chip (mono) shows elapsed time ticking, landing on something like *"~ 3 min"* as narration says "in minutes."

#### Wow factor
Collapsing the entire pipeline the audience just watched into a **one-click, few-second progress bar inside a real-feeling product** is the "this is operational, not a science project" beat. Keep the UI restrained and premium — generous spacing, one accent color, no clutter. Use your **actual product name** in place of "Signal Studio."

#### Props interface
```ts
interface Scene06Props {
  productName?: string;       // default "Signal Studio" — REPLACE with real name
  articleRows?: string[];     // list shown in the left rail
  elapsedLabel?: string;      // default "~ 3 min"
}
```

---

### SCENE 07 — *Impact & Scale*
**File:** `scenes/Scene07_ImpactScale.tsx`
**Duration:** 600 frames (1:50 – 2:10)
**Narration:**
> "Today, this system has already generated over 2,500 hypotheses — and it's just beginning. This is the future of payment integrity: detecting fraud and abuse at a scale, speed, and precision no manual team could ever match. And every dollar of fraud we prevent is a dollar returned to affordability — lowering the cost of care and protecting the integrity of healthcare for everyone. Intelligence that never sleeps."

#### Visual Concept
The finale — the cinematic pullback. The single pipeline we followed multiplies: the camera retreats to reveal a **vast field of hypothesis points** — thousands of them — as a glowing constellation, with a **`Counter` rolling up to 2,500+** at center. Then the field resolves into **two luminous pillars of impact standing side by side: PAYMENT INTEGRITY and AFFORDABILITY.** A subtle value-flow animation shows light traveling from the fraud constellation into the AFFORDABILITY pillar ("every dollar of fraud prevented → a dollar returned to affordability"). Finally everything contracts into a calm close: the tagline **"Intelligence that never sleeps."**, the product/team lockup, and the UHG logomark. Confident, quiet, resolved.

#### Animation Breakdown

**Frames 0–120 (0:00–0:04): The pullback + count**
- Camera scale `1 → 0.4` over 120 frames, eased `outQuart`, with brief motion blur on the receding pipeline.
- As it recedes, a dense field of small glowing points (hypotheses) fades in across the frame in a loose constellation (deterministic seeded layout, ~300 rendered points implying thousands).
- Center: `Counter` rolls **0 → 2,500** (format comma, `suffix="+"`), landing at ~F 110 with a soft bloom. Label beneath: *"hypotheses generated — and counting"*.

**Frames 90–300 (0:03–0:10): "scale, speed, precision"**
- Three quick, restrained descriptors fade in and out near the constellation as narration hits them — **SCALE**, **SPEED**, **PRECISION** (small caps, `textSecondary`, one at a time, ~40 frames each). Understated; do not clutter.
- Constellation continues a slow drift; occasional points pulse brighter (system still working).

**Frames 240–450 (0:08–0:15): Two pillars of impact**
- The constellation gathers toward center, then resolves into **two vertical light pillars**, side by side:
  - Left: **PAYMENT INTEGRITY**
  - Right: **AFFORDABILITY**
- Each pillar: a tall soft gradient column (brand blue), label at base (Inter Display 600, 40px), a gentle internal upward light flow.
- **Value-flow beat:** as narration reaches "every dollar of fraud we prevent is a dollar returned to affordability," streams of light travel from the fraud constellation → into the AFFORDABILITY pillar, which brightens in response. This is the emotional/strategic landing — make the connection *visible*.

**Frames 420–540 (0:14–0:18): Contract to close**
- Both pillars and the field converge/contract toward center into a single bright point (slow inhale), `scale → 0.1`, `opacity → 0`, eased `outExpo`, leaving one bright point.
- From the point, the closing tagline emerges (line-by-line):
  - F~445: **"Intelligence that never sleeps."** — 64px, Inter Display 700
  - F~470: *"Protecting the integrity of healthcare — for everyone."* — 32px, Inter 500, `textSecondary`

**Frames 540–600 (0:18–0:20): Logomark & fade**
- Team/product lockup + **UHG logomark** fade in below the tagline (provided asset, ~40% brand size), subtle blue underglow.
- Hold, then final fade to `bgDeep` over the last 12 frames.

#### Wow factor
Two payoffs, sequenced: the **2,500 count against a field of thousands of points** proves scale viscerally, and the **light physically flowing from fraud-prevention into affordability** turns an abstract benefit into something the audience *sees*. That affordability flow is the line leadership will remember — give it room. Then honor the close with stillness: after two minutes of motion, the final tagline earns its quiet.

#### Props interface
```ts
interface Scene07Props {
  hypothesisTotal?: number;       // default 2500
  pillarLabels?: [string, string];// default ["PAYMENT INTEGRITY", "AFFORDABILITY"]
  tagline?: string;               // default "Intelligence that never sleeps."
  subTagline?: string;            // default "Protecting the integrity of healthcare — for everyone."
  showLogo?: boolean;             // default true
  logoSrc?: string;               // path to UHG logo asset
}
```

---

## 8. Narration & Audio

### 8.1 Voiceover
- **Voice:** professional female or male VO, warm-confident register, mid-Atlantic neutral accent
- **Pace:** ~145 words per minute (script is ~305 words for ~2:05–2:10)
- **Recommended tools:** ElevenLabs (voice: "Adam" or "Bella"), or human VO via Voices.com
- **Delivery notes:** Read with conviction — this is *not* corporate-bland. Let these phrases land with a beat before/after: *"faster than any team can manually track," "we built exactly that," "it writes its own working code," "the result is a Signal," "in minutes," "over 2,500 hypotheses," "a dollar returned to affordability," "intelligence that never sleeps."*

### 8.2 Music
- **Genre:** cinematic ambient with a subtle pulse — think Hans Zimmer's quieter work or Olafur Arnalds
- **Arc mapped to the film:**
  - Scenes 1–2: unsettled, building tension (the problem), resolving on the Core's ignition
  - Scenes 3–4: driving, curious, technical momentum — a subtle rhythmic pulse under the "build" scene
  - Scene 5: a moment of arrival / confidence
  - Scene 6: light, capable, product-forward
  - Scene 7: full warm major-key resolution on the pillars, settling to quiet on the tagline
- **Source:** Artlist, Musicbed, or custom commission
- **Volume:** ducked to −18dB under voiceover, up to −10dB during instrumental beats (Core ignition, convergence, final pullback)

### 8.3 Sound design (subtle, used sparingly — all SFX ≤ −24dB)
- Scene 1: a faint rising "swell" as headlines accelerate; soft low booms on the biggest map flares
- Scene 2: a warm ignition swell + a single deep sub-bass "arrival" on the Core birth
- Scene 3: delicate shimmer on each hypothesis chip write-on (single harp-pluck)
- Scene 4: soft ticks as branch packets travel; a satisfying "run/complete" chime on the Databricks green check
- Scene 5: a clean "confirm" tone on the verified seal
- Scene 6: subtle UI click on "Run Signal"; soft ascending stages
- Scene 7: a gentle rising pad on the pullback; nothing on the final tagline — let music breathe

---

## 9. Build & Render

### 9.1 Local preview
```bash
npm run dev
# Opens Remotion Studio at http://localhost:3000
```

### 9.2 Render final
```bash
npx remotion render Main out/fraud-signal-explainer.mp4 \
  --codec=h264 \
  --crf=18 \
  --pixel-format=yuv420p
```

### 9.3 Render for 4K (if needed for projection)
```bash
npx remotion render Main out/fraud-signal-explainer-4k.mp4 \
  --scale=2 \
  --codec=h264 \
  --crf=16
```

### 9.4 Audio integration
After rendering video, mix audio in Adobe Audition / DaVinci Resolve / Premiere:
1. Drop VO on track 1, sync to scene starts (timestamps in `config/narration.ts`)
2. Drop music on track 2 with ducking
3. Drop SFX on track 3
4. Export final MP4 with H.264 + AAC audio

> **TTS note:** if you're generating the narration via TTS and embedding it as the audio bed (per your workflow), export the VO per-scene using the `config/narration.ts` line breaks so each clip drops cleanly onto its scene's start frame. Keep a ~0.4s lead-in of silence on each clip so word onsets align with the scene's key visual beat.

---

## 10. Edit Workflow (for future changes)

| To change… | Edit only this file |
|---|---|
| Scene timing | `config/timing.ts` |
| Colors, fonts, easings | `config/tokens.ts` |
| Any narration line | `config/narration.ts` |
| Scene 1 headline text | `scenes/Scene01_TheProblem.tsx` (props) |
| Scene 3 hypothesis lines | `scenes/Scene03_Hypothesize.tsx` (props) |
| Scene 4 reasoning branches / notebook code | `scenes/Scene04_ReasonAndBuild.tsx` (props) |
| Scene 5 flagged providers / confidence | `scenes/Scene05_Signal.tsx` (props) |
| Scene 6 product name / article list | `scenes/Scene06_HumanInLoop.tsx` (props) |
| The 2,500 count / pillar labels / tagline | `scenes/Scene07_ImpactScale.tsx` (props) |

Each scene is fully isolated. No scene reads state from another (carry-overs are recreated via shared deterministic layout functions, not shared runtime state). The only shared dependency is the design system in `config/tokens.ts`.

---

## 11. Quality Bar — What "Done" Means

Before declaring complete, verify:
- [ ] Every scene plays in isolation in Remotion Studio without errors
- [ ] No frame in the video is completely static — always at least one element in motion (particles, drift, glow oscillation)
- [ ] Camera moves are subtle and continuous, never abrupt
- [ ] Scene 1 clearly reads as *accelerating chaos* (emission cadence tightens; map flares spread)
- [ ] Scene 2's red→blue tint drain is synced to the Core ignition and takes a full ~2s
- [ ] Scene 3 hypothesis chips are narrator-synced (±5 frames) and legible for ≥45 frames each
- [ ] Scene 4's Databricks "run complete" green check lands on "run directly on Databricks"
- [ ] Scene 4 notebook code reads as authentic to a data engineer (plausible identifiers, domain-accurate)
- [ ] Scene 5 uses `alertRed` *only* on flagged providers; verified seal is `signalGreen`
- [ ] Scene 6 uses the real product name and collapses the full pipeline into one click
- [ ] Scene 7 counter reaches 2,500+ and the affordability light-flow is clearly visible
- [ ] All provider IDs, claim numbers, and headlines are synthetic/masked — no real entities
- [ ] Final tagline scene has minimal motion — restraint is the point
- [ ] Final render at 1080p is under 60MB; at 4K under 220MB
- [ ] Color consistency across all scenes — no scene should feel like a different video

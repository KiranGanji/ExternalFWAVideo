# Fraud Analytics Remotion Video

Remotion project for the fraud analytics explainer video. The repo contains:

- `FraudAnalyticsExplainer`: the full 2:10 video composition
- `Scene01` through `Scene07`: standalone scene compositions for isolated preview and export

## Requirements

- Node.js 22+ recommended
- npm

## Install

```bash
npm install
```

## Preview In Localhost

Start Remotion Studio:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

In Remotion Studio you can:

- Select `FraudAnalyticsExplainer` to preview the full video
- Select `Scene01` to `Scene07` to preview individual scenes
- Scrub the timeline before rendering to review motion, text legibility, and scene timing

If you want to confirm the registered compositions from the terminal:

```bash
npm run compositions
```

## Render Commands

Render the full video:

```bash
npm run render
```

Render the light-background high-quality full video:

```bash
npm run render:light-hq
```

Render all scenes separately:

```bash
npm run render:scenes
```

## Scene Export Outputs

`npm run render:scenes` writes the following files into `out/scenes/`:

- `01-the-problem.mp4`
- `02-the-vision.mp4`
- `03-hypothesize.mp4`
- `04-reason-and-build.mp4`
- `05-signal.mp4`
- `06-human-in-loop.mp4`
- `07-impact-scale.mp4`

## Notes

- Current renders are video-only. No narration or music is embedded yet.
- Generated outputs are ignored via `.gitignore` under `out/`.

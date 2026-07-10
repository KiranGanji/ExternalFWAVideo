import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {join, resolve} from 'node:path';

const sceneOutputs = [
  {id: 'Scene01', fileName: '01-the-problem.mp4'},
  {id: 'Scene02', fileName: '02-the-vision.mp4'},
  {id: 'Scene03', fileName: '03-hypothesize.mp4'},
  {id: 'Scene04', fileName: '04-reason-and-build.mp4'},
  {id: 'Scene05', fileName: '05-signal.mp4'},
  {id: 'Scene06', fileName: '06-human-in-loop.mp4'},
  {id: 'Scene07', fileName: '07-impact-scale.mp4'},
];

const remotionBin =
  process.platform === 'win32'
    ? join(process.cwd(), 'node_modules', '.bin', 'remotion.cmd')
    : join(process.cwd(), 'node_modules', '.bin', 'remotion');

const outputDir = resolve('out', 'scenes');
mkdirSync(outputDir, {recursive: true});

for (const scene of sceneOutputs) {
  const outputPath = resolve(outputDir, scene.fileName);
  console.log(`\nRendering ${scene.id} -> ${outputPath}`);

  const args = [
    'render',
    'src/index.ts',
    scene.id,
    outputPath,
    '--codec=h264',
    '--crf=14',
    '--pixel-format=yuv420p',
  ];

  const result = spawnSync(remotionBin, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`\nFinished rendering scene exports to ${outputDir}`);

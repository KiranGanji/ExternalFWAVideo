import type {ComponentType} from 'react';
import {Composition} from 'remotion';
import {timing} from './config/timing';
import {Main} from './Main';
import {Scene01_TheProblem} from './scenes/Scene01_TheProblem';
import {Scene02_TheVision} from './scenes/Scene02_TheVision';
import {Scene03_Hypothesize} from './scenes/Scene03_Hypothesize';
import {Scene04_ReasonAndBuild} from './scenes/Scene04_ReasonAndBuild';
import {Scene05_Signal} from './scenes/Scene05_Signal';
import {Scene06_HumanInLoop} from './scenes/Scene06_HumanInLoop';
import {Scene07_ImpactScale} from './scenes/Scene07_ImpactScale';

type SceneComposition = {
  id: string;
  component: ComponentType;
  durationInFrames: number;
};

const sharedVideoProps = {
  fps: 30,
  width: 1920,
  height: 1080,
} as const;

const sceneCompositions: SceneComposition[] = [
  {
    id: 'Scene01',
    component: Scene01_TheProblem,
    durationInFrames: timing.scene01.duration,
  },
  {
    id: 'Scene02',
    component: Scene02_TheVision,
    durationInFrames: timing.scene02.duration,
  },
  {
    id: 'Scene03',
    component: Scene03_Hypothesize,
    durationInFrames: timing.scene03.duration,
  },
  {
    id: 'Scene04',
    component: Scene04_ReasonAndBuild,
    durationInFrames: timing.scene04.duration,
  },
  {
    id: 'Scene05',
    component: Scene05_Signal,
    durationInFrames: timing.scene05.duration,
  },
  {
    id: 'Scene06',
    component: Scene06_HumanInLoop,
    durationInFrames: timing.scene06.duration,
  },
  {
    id: 'Scene07',
    component: Scene07_ImpactScale,
    durationInFrames: timing.scene07.duration,
  },
];

export const Root = () => {
  return (
    <>
      <Composition
        id="FraudAnalyticsExplainer"
        component={Main}
        durationInFrames={3900}
        {...sharedVideoProps}
      />
      {sceneCompositions.map((scene) => (
        <Composition
          key={scene.id}
          id={scene.id}
          component={scene.component}
          durationInFrames={scene.durationInFrames}
          {...sharedVideoProps}
        />
      ))}
    </>
  );
};

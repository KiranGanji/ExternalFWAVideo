import {AbsoluteFill, Sequence} from 'remotion';
import {timing} from './config/timing';
import {colors} from './config/tokens';
import {Scene01_TheProblem} from './scenes/Scene01_TheProblem';
import {Scene02_TheVision} from './scenes/Scene02_TheVision';
import {Scene03_Hypothesize} from './scenes/Scene03_Hypothesize';
import {Scene04_ReasonAndBuild} from './scenes/Scene04_ReasonAndBuild';
import {Scene05_Signal} from './scenes/Scene05_Signal';
import {Scene06_HumanInLoop} from './scenes/Scene06_HumanInLoop';
import {Scene07_ImpactScale} from './scenes/Scene07_ImpactScale';

export const Main = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.bgDeep}}>
      <Sequence from={timing.scene01.start} durationInFrames={timing.scene01.duration}>
        <Scene01_TheProblem />
      </Sequence>
      <Sequence from={timing.scene02.start} durationInFrames={timing.scene02.duration}>
        <Scene02_TheVision />
      </Sequence>
      <Sequence from={timing.scene03.start} durationInFrames={timing.scene03.duration}>
        <Scene03_Hypothesize />
      </Sequence>
      <Sequence from={timing.scene04.start} durationInFrames={timing.scene04.duration}>
        <Scene04_ReasonAndBuild />
      </Sequence>
      <Sequence from={timing.scene05.start} durationInFrames={timing.scene05.duration}>
        <Scene05_Signal />
      </Sequence>
      <Sequence from={timing.scene06.start} durationInFrames={timing.scene06.duration}>
        <Scene06_HumanInLoop />
      </Sequence>
      <Sequence from={timing.scene07.start} durationInFrames={timing.scene07.duration}>
        <Scene07_ImpactScale />
      </Sequence>
    </AbsoluteFill>
  );
};

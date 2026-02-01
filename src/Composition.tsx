import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig, Sequence, staticFile, interpolate } from "remotion";
import { Audio } from "@remotion/media";

// Spring animation presets
export const SPRING_SMOOTH = { damping: 200 };
export const SPRING_BOUNCY = { damping: 12, stiffness: 100 };
export const SPRING_SNAPPY = { damping: 20, stiffness: 200 };

import { OpeningScene } from "./scenes/OpeningScene";
import { IntroductionScene } from "./scenes/IntroductionScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { VersionControlScene } from "./scenes/VersionControlScene";
import { WhatIsGitScene } from "./scenes/WhatIsGitScene";
import { GitBenefitsScene } from "./scenes/GitBenefitsScene";
import { GitCommandsSceneExtended } from "./scenes/GitCommandsSceneExtended";
import { GitHubSceneExtended } from "./scenes/GitHubSceneExtended";
import { OutroSceneExtended } from "./scenes/OutroSceneExtended";

// Auto-generated audio segments (gpt-4o-mini-tts, coral voice, 1.15x speed)
// Based on actual audio file durations (0.5s gap between each)
const audioSegments = [
  // Opening (0.5s - 20.8s)
  { id: "opening-1", startSec: 0.5 },   // duration: 2.81s
  { id: "opening-2", startSec: 3.8 },   // duration: 6.24s
  { id: "opening-3", startSec: 10.5 },  // duration: 5.86s
  { id: "opening-4", startSec: 16.9 },  // duration: 3.41s

  // Introduction (20.8s - 39.0s)
  { id: "intro-1", startSec: 20.8 },    // duration: 7.49s
  { id: "intro-2", startSec: 28.8 },    // duration: 4.10s
  { id: "intro-3", startSec: 33.4 },    // duration: 5.14s

  // Problem (39.0s - 74.3s)
  { id: "problem-1", startSec: 39.0 },  // duration: 4.42s
  { id: "problem-2", startSec: 44.0 },  // duration: 4.63s
  { id: "problem-3", startSec: 49.1 },  // duration: 5.62s
  { id: "problem-4", startSec: 55.2 },  // duration: 3.02s
  { id: "problem-5", startSec: 58.7 },  // duration: 4.80s
  { id: "problem-6", startSec: 64.0 },  // duration: 5.28s
  { id: "problem-7", startSec: 69.8 },  // duration: 4.01s

  // Version Control (74.3s - 104.2s)
  { id: "vcs-1", startSec: 74.3 },      // duration: 5.59s
  { id: "vcs-2", startSec: 80.4 },      // duration: 4.22s
  { id: "vcs-3", startSec: 85.1 },      // duration: 7.20s
  { id: "vcs-4", startSec: 92.8 },      // duration: 4.70s
  { id: "vcs-5", startSec: 98.0 },      // duration: 5.62s

  // What is Git (104.2s - 129.4s)
  { id: "git-1", startSec: 104.2 },     // duration: 5.71s
  { id: "git-2", startSec: 110.4 },     // duration: 5.02s
  { id: "git-3", startSec: 115.9 },     // duration: 5.33s
  { id: "git-4", startSec: 121.7 },     // duration: 7.20s

  // Git Benefits (129.4s - 156.8s)
  { id: "benefits-1", startSec: 129.4 }, // duration: 2.76s
  { id: "benefits-2", startSec: 132.7 }, // duration: 5.18s
  { id: "benefits-3", startSec: 138.4 }, // duration: 5.93s
  { id: "benefits-4", startSec: 144.8 }, // duration: 6.10s
  { id: "benefits-5", startSec: 151.4 }, // duration: 4.90s

  // Git Commands (156.8s - 202.0s)
  { id: "commands-1", startSec: 156.8 }, // duration: 3.74s
  { id: "commands-2", startSec: 161.0 }, // duration: 5.23s
  { id: "commands-3", startSec: 166.7 }, // duration: 6.94s
  { id: "commands-4", startSec: 174.2 }, // duration: 8.02s
  { id: "commands-5", startSec: 182.7 }, // duration: 6.50s
  { id: "commands-6", startSec: 189.7 }, // duration: 6.62s
  { id: "commands-7", startSec: 196.8 }, // duration: 4.70s

  // GitHub (202.0s - 221.1s)
  { id: "github-1", startSec: 202.0 },  // duration: 4.68s
  { id: "github-2", startSec: 207.2 },  // duration: 6.50s
  { id: "github-3", startSec: 214.2 },  // duration: 6.36s

  // Outro (221.1s - 237.0s)
  { id: "start-1", startSec: 221.1 },   // duration: 3.62s
  { id: "start-2", startSec: 225.2 },   // duration: 6.10s
  { id: "start-3", startSec: 231.8 },   // duration: 4.68s
];

// Each audio segment gets enough time to play fully
const AUDIO_MAX_DURATION_SEC = 15;

export const MyComposition = () => {
  const { fps } = useVideoConfig();

  // Scene durations (adjusted for TransitionSeries overlap)
  // TransitionSeries subtracts transition duration from total, so we add it back
  // With 8 transitions x 0.5s each = 4s total overlap
  const transitionDuration = Math.floor(0.5 * fps); // 15 frames

  // Base durations matched to audio timing (gpt-4o-mini-tts, 1.15x speed)
  const openingDuration = Math.floor(21 * fps);        // 0.5s - 20.8s
  const introDuration = Math.floor(19 * fps);          // 20.8s - 39.0s
  const problemDuration = Math.floor(36 * fps);        // 39.0s - 74.3s
  const versionControlDuration = Math.floor(30 * fps); // 74.3s - 104.2s
  const whatIsGitDuration = Math.floor(26 * fps);      // 104.2s - 129.4s
  const gitBenefitsDuration = Math.floor(28 * fps);    // 129.4s - 156.8s
  const gitCommandsDuration = Math.floor(46 * fps);    // 156.8s - 202.0s
  const githubDuration = Math.floor(20 * fps);         // 202.0s - 221.1s
  const outroDuration = Math.floor(16 * fps);          // 221.1s - 237.0s

  return (
    <>
      {/* Audio narration - with premount, no fade */}
      {audioSegments.map((segment) => (
        <Sequence
          key={segment.id}
          from={Math.floor(segment.startSec * fps)}
          durationInFrames={Math.floor(AUDIO_MAX_DURATION_SEC * fps)}
          premountFor={fps} // Premount 1 second before for smooth loading
        >
          <Audio src={staticFile(`audio/${segment.id}.mp3`)} volume={1} />
        </Sequence>
      ))}

      {/* Video scenes */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={openingDuration}>
          <OpeningScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={introDuration}>
          <IntroductionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={problemDuration}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={versionControlDuration}>
          <VersionControlScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={whatIsGitDuration}>
          <WhatIsGitScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={gitBenefitsDuration}>
          <GitBenefitsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={gitCommandsDuration}>
          <GitCommandsSceneExtended />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={githubDuration}>
          <GitHubSceneExtended />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        <TransitionSeries.Sequence durationInFrames={outroDuration}>
          <OutroSceneExtended />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

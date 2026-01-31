import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";

import { OpeningScene } from "./scenes/OpeningScene";
import { IntroductionScene } from "./scenes/IntroductionScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { VersionControlScene } from "./scenes/VersionControlScene";
import { WhatIsGitScene } from "./scenes/WhatIsGitScene";
import { GitBenefitsScene } from "./scenes/GitBenefitsScene";
import { GitCommandsSceneExtended } from "./scenes/GitCommandsSceneExtended";
import { GitHubSceneExtended } from "./scenes/GitHubSceneExtended";
import { OutroSceneExtended } from "./scenes/OutroSceneExtended";

// Auto-generated audio segments with proper timing
// Based on actual audio file durations (0.5s gap between each)
const audioSegments = [
  // Opening (0.5s - 21.9s)
  { id: "opening-1", startSec: 0.5 },   // duration: 2.95s
  { id: "opening-2", startSec: 4.0 },   // duration: 6.84s
  { id: "opening-3", startSec: 11.3 },  // duration: 6.10s
  { id: "opening-4", startSec: 17.9 },  // duration: 4.01s

  // Introduction (22.4s - 43.2s)
  { id: "intro-1", startSec: 22.4 },    // duration: 9.31s
  { id: "intro-2", startSec: 32.2 },    // duration: 4.75s
  { id: "intro-3", startSec: 37.5 },    // duration: 5.74s

  // Problem (43.7s - 79.3s)
  { id: "problem-1", startSec: 43.7 },  // duration: 4.82s
  { id: "problem-2", startSec: 49.0 },  // duration: 3.60s
  { id: "problem-3", startSec: 53.1 },  // duration: 6.07s
  { id: "problem-4", startSec: 59.7 },  // duration: 3.36s
  { id: "problem-5", startSec: 63.6 },  // duration: 4.80s
  { id: "problem-6", startSec: 68.9 },  // duration: 4.99s
  { id: "problem-7", startSec: 74.3 },  // duration: 5.04s

  // Version Control (79.9s - 110.5s)
  { id: "vcs-1", startSec: 79.9 },      // duration: 5.95s
  { id: "vcs-2", startSec: 86.3 },      // duration: 4.73s
  { id: "vcs-3", startSec: 91.6 },      // duration: 7.25s
  { id: "vcs-4", startSec: 99.3 },      // duration: 5.38s
  { id: "vcs-5", startSec: 105.2 },     // duration: 5.30s

  // What is Git (111.0s - 137.1s)
  { id: "git-1", startSec: 111.0 },     // duration: 5.54s
  { id: "git-2", startSec: 117.0 },     // duration: 5.09s
  { id: "git-3", startSec: 122.6 },     // duration: 6.14s
  { id: "git-4", startSec: 129.3 },     // duration: 7.85s

  // Git Benefits (137.6s - 170.8s)
  { id: "benefits-1", startSec: 137.6 }, // duration: 3.00s
  { id: "benefits-2", startSec: 141.1 }, // duration: 7.70s
  { id: "benefits-3", startSec: 149.3 }, // duration: 7.03s
  { id: "benefits-4", startSec: 156.9 }, // duration: 7.73s
  { id: "benefits-5", startSec: 165.1 }, // duration: 5.66s

  // Git Commands (171.2s - 220.4s)
  { id: "commands-1", startSec: 171.2 }, // duration: 4.46s
  { id: "commands-2", startSec: 176.2 }, // duration: 5.69s
  { id: "commands-3", startSec: 182.4 }, // duration: 8.57s
  { id: "commands-4", startSec: 191.5 }, // duration: 9.34s
  { id: "commands-5", startSec: 201.3 }, // duration: 6.55s
  { id: "commands-6", startSec: 208.4 }, // duration: 6.14s
  { id: "commands-7", startSec: 215.0 }, // duration: 5.45s

  // GitHub (220.9s - 241.1s)
  { id: "github-1", startSec: 220.9 },  // duration: 5.54s
  { id: "github-2", startSec: 227.0 },  // duration: 6.26s
  { id: "github-3", startSec: 233.8 },  // duration: 7.30s

  // Outro (241.5s - 258.9s)
  { id: "start-1", startSec: 241.5 },   // duration: 3.58s
  { id: "start-2", startSec: 245.6 },   // duration: 7.20s
  { id: "start-3", startSec: 253.3 },   // duration: 5.64s
];

// Each audio segment gets enough time to play fully
const AUDIO_MAX_DURATION_SEC = 15;

export const MyComposition = () => {
  const { fps } = useVideoConfig();

  // Scene durations (matched to audio timing)
  const openingDuration = 22 * fps;        // 0.5s - 22.4s
  const introDuration = 21 * fps;          // 22.4s - 43.7s
  const problemDuration = 36 * fps;        // 43.7s - 79.9s
  const versionControlDuration = 31 * fps; // 79.9s - 111.0s
  const whatIsGitDuration = 27 * fps;      // 111.0s - 137.6s
  const gitBenefitsDuration = 34 * fps;    // 137.6s - 171.2s
  const gitCommandsDuration = 50 * fps;    // 171.2s - 220.9s
  const githubDuration = 21 * fps;         // 220.9s - 241.5s
  const outroDuration = 18 * fps;          // 241.5s - 259s

  const transitionDuration = Math.floor(0.5 * fps);

  return (
    <>
      {/* Audio narration - each plays fully without cutting */}
      {audioSegments.map((segment) => (
        <Sequence
          key={segment.id}
          from={Math.floor(segment.startSec * fps)}
          durationInFrames={Math.floor(AUDIO_MAX_DURATION_SEC * fps)}
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

import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

// Total scene duration: 263s - 4s (transitions) = 259s actual (~4:19)
// 7890 frames at 30fps (263s to account for transition overlap)

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PythonGitTutorial"
      component={MyComposition}
      durationInFrames={7890}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

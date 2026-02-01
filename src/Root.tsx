import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

// Total scene duration: 242s - 4s (transitions) = 238s actual (~4:00)
// 7200 frames at 30fps (240s to account for transition overlap)

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PythonGitTutorial"
      component={MyComposition}
      durationInFrames={7200}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

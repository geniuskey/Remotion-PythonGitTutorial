import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

// Total: ~260 seconds (~4:20)
// 7800 frames at 30fps

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PythonGitTutorial"
      component={MyComposition}
      durationInFrames={7800}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

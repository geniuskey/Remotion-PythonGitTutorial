import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { SPRING_BOUNCY, SPRING_SMOOTH } from "../Composition";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionScale = spring({
    frame,
    fps,
    config: SPRING_BOUNCY,
  });

  const files = [
    { name: "report_최종.py", delay: 2.5 },
    { name: "report_진짜최종.py", delay: 3.2 },
    { name: "report_최종_수정본.py", delay: 3.9 },
    { name: "report_제발마지막.py", delay: 4.6 },
    { name: "report_진짜진짜최종.py", delay: 5.3 },
  ];

  const confusionOpacity = interpolate(frame, [7 * fps, 7.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const solutionProgress = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: Math.floor(11 * fps),
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900">
      {/* Question mark */}
      <Sequence from={0} durationInFrames={Math.floor(2.5 * fps)}>
        <AbsoluteFill className="flex items-center justify-center">
          <div
            className="text-9xl"
            style={{
              transform: `scale(${questionScale})`,
              opacity: questionScale,
            }}
          >
            🤔
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* File chaos */}
      <Sequence from={Math.floor(2.5 * fps)} durationInFrames={Math.floor(8.5 * fps)}>
        <AbsoluteFill className="flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl px-8">
            {files.map((file, index) => {
              const fileFrame = frame - Math.floor(file.delay * fps);
              const fileOpacity = interpolate(fileFrame, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const fileX = interpolate(
                spring({ frame: fileFrame, fps, config: SPRING_SMOOTH }),
                [0, 1],
                [80, 0]
              );
              const shake = frame > 7 * fps ? Math.sin(frame * 0.5) * 2 * (index % 2 === 0 ? 1 : -1) : 0;

              return (
                <div
                  key={index}
                  className="mb-2 bg-red-500/20 border border-red-500/50 rounded-lg px-5 py-3"
                  style={{
                    opacity: fileOpacity,
                    transform: `translateX(${fileX + shake}px)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📄</span>
                    <span className="text-lg font-mono text-red-300">{file.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center bg-black/50"
            style={{ opacity: confusionOpacity }}
          >
            <div className="text-5xl font-bold text-red-400">
              어떤 게 최신이지...? 😵
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Solution - extended to fill the scene */}
      <Sequence from={Math.floor(11 * fps)} durationInFrames={Math.floor(12 * fps)}>
        <AbsoluteFill className="flex items-center justify-center">
          <div
            className="text-center"
            style={{
              transform: `scale(${solutionProgress})`,
              opacity: solutionProgress,
            }}
          >
            <div className="text-7xl mb-4">💡</div>
            <h1 className="text-5xl font-bold text-white mb-2">해결책이 있습니다!</h1>
            <p className="text-2xl text-green-400">Git & GitHub</p>

            {/* Additional content appearing after initial reveal */}
            <div
              className="mt-8 flex gap-6 justify-center"
              style={{
                opacity: interpolate(frame, [15 * fps, 16 * fps], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl px-6 py-3">
                <span className="text-3xl mr-2">📁</span>
                <span className="text-xl text-orange-300">버전 관리</span>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl px-6 py-3">
                <span className="text-3xl mr-2">👥</span>
                <span className="text-xl text-purple-300">팀 협업</span>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

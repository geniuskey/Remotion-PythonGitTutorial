import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { SPRING_BOUNCY, SPRING_SMOOTH } from "../Composition";

// Audio timing (relative to scene start):
// opening-1 at 0.5s: "혹시 이런 경험 있으신가요?" - question mark
// opening-2 at 3.8s: "리포트 최종 점 파이..." - files appearing
// opening-3 at 10.5s: "파일이 이렇게 늘어나서 어떤 게 최신인지..." - confusion
// opening-4 at 16.9s: "오늘 이 문제를 완벽하게 해결해..." - solution

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionScale = spring({
    frame,
    fps,
    config: SPRING_BOUNCY,
  });

  // Files appear during opening-2 (3.8s - 10.5s)
  const files = [
    { name: "report_최종.py", delay: 3.8 },
    { name: "report_진짜최종.py", delay: 4.8 },
    { name: "report_최종_수정본.py", delay: 5.8 },
    { name: "report_제발마지막.py", delay: 6.8 },
    { name: "report_진짜진짜최종.py", delay: 7.8 },
  ];

  // Confusion appears during opening-3 (10.5s)
  const confusionOpacity = interpolate(frame, [10.5 * fps, 11 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Solution appears during opening-4 (16.9s)
  const solutionProgress = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: Math.floor(16.9 * fps),
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900">
      {/* Question mark - opening-1 */}
      <Sequence from={0} durationInFrames={Math.floor(3.8 * fps)}>
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

      {/* File chaos - opening-2, opening-3 */}
      <Sequence from={Math.floor(3.8 * fps)} durationInFrames={Math.floor(13.1 * fps)}>
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
              // Shake starts at opening-3 (10.5s)
              const shake = frame > 10.5 * fps ? Math.sin(frame * 0.5) * 3 * (index % 2 === 0 ? 1 : -1) : 0;

              // Highlight each file as it appears
              const isHighlighted = frame >= file.delay * fps && frame < (file.delay + 1.5) * fps;

              return (
                <div
                  key={index}
                  className="mb-2 rounded-lg px-5 py-3"
                  style={{
                    opacity: fileOpacity,
                    transform: `translateX(${fileX + shake}px) scale(${isHighlighted ? 1.05 : 1})`,
                    backgroundColor: isHighlighted ? "rgba(239, 68, 68, 0.4)" : "rgba(239, 68, 68, 0.2)",
                    borderWidth: 2,
                    borderColor: isHighlighted ? "#ef4444" : "rgba(239, 68, 68, 0.5)",
                    boxShadow: isHighlighted ? "0 0 20px rgba(239, 68, 68, 0.5)" : "none",
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

          {/* Confusion overlay - opening-3 */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/50"
            style={{ opacity: confusionOpacity }}
          >
            <div
              className="text-5xl font-bold text-red-400 px-8 py-4 rounded-2xl"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                boxShadow: "0 0 40px rgba(239, 68, 68, 0.5)",
                transform: `scale(${interpolate(frame, [10.5 * fps, 11.5 * fps], [0.8, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })})`,
              }}
            >
              어떤 게 최신이지...?
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Solution - opening-4 */}
      <Sequence from={Math.floor(16.9 * fps)} durationInFrames={Math.floor(4.1 * fps)}>
        <AbsoluteFill className="flex items-center justify-center">
          <div
            className="text-center"
            style={{
              transform: `scale(${solutionProgress})`,
              opacity: solutionProgress,
            }}
          >
            <div className="text-7xl mb-4">💡</div>
            <h1
              className="text-5xl font-bold text-white mb-2"
              style={{
                textShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
              }}
            >
              해결책이 있습니다!
            </h1>
            <p
              className="text-3xl font-bold px-6 py-2 rounded-xl"
              style={{
                color: "#4ade80",
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                boxShadow: "0 0 25px rgba(34, 197, 94, 0.4)",
              }}
            >
              Git & GitHub
            </p>

            {/* Additional badges */}
            <div
              className="mt-8 flex gap-6 justify-center"
              style={{
                opacity: interpolate(frame, [18 * fps, 19 * fps], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                className="rounded-xl px-6 py-3"
                style={{
                  backgroundColor: "rgba(249, 115, 22, 0.3)",
                  borderWidth: 2,
                  borderColor: "#f97316",
                  boxShadow: "0 0 15px rgba(249, 115, 22, 0.4)",
                }}
              >
                <span className="text-xl text-orange-300">버전 관리</span>
              </div>
              <div
                className="rounded-xl px-6 py-3"
                style={{
                  backgroundColor: "rgba(168, 85, 247, 0.3)",
                  borderWidth: 2,
                  borderColor: "#a855f7",
                  boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
                }}
              >
                <span className="text-xl text-purple-300">팀 협업</span>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

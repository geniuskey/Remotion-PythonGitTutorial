import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_SMOOTH } from "../Composition";

// Audio timing (relative to scene start):
// problem-1 at 0s: "파이썬 프로젝트를 하다 보면..." - title
// problem-2 at 5s: "그런데 수정하기 전에 백업을..." - backup arrow
// problem-3 at 10.1s: "그래서 파일을 복사해서..." - files appearing
// problem-4 at 16.2s: "하지만 이렇게 하면 문제가..." - problems header
// problem-5 at 19.7s: "첫째, 어떤 파일이..." - problem 1
// problem-6 at 25s: "둘째, 언제 무엇을..." - problem 2
// problem-7 at 30.8s: "셋째, 여러 사람이..." - problem 3

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { icon: "❓", text: "어떤 파일이 최신인지 모름", appearAt: 19.7, highlightAt: 19.7 },
    { icon: "🤯", text: "변경 이력 기억 불가", appearAt: 25, highlightAt: 25 },
    { icon: "💥", text: "여러 명 작업시 충돌", appearAt: 30.8, highlightAt: 30.8 },
  ];

  const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-orange-900/30 to-slate-900 flex items-center justify-center p-12">
      <div className="flex gap-12 items-start max-w-5xl w-full">
        {/* Left - File illustration */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-6" style={{ opacity: titleOpacity }}>
            흔한 백업 방법
          </h2>

          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📄</span>
              <span className="font-mono text-blue-300">main.py</span>
            </div>
          </div>

          <div
            className="text-white/60 my-2 flex items-center gap-2"
            style={{
              opacity: interpolate(frame, [5 * fps, 6 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            복사 → 이름 변경
          </div>

          {["main_backup.py", "main_0129.py", "main_최종.py"].map((name, i) => {
            const appearTime = 10.1 + i * 1.5;
            const copyOpacity = interpolate(
              frame,
              [appearTime * fps, (appearTime + 0.5) * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const isHighlighted = frame >= appearTime * fps && frame < (appearTime + 2) * fps;
            return (
              <div
                key={i}
                className="rounded-lg p-2 mb-2"
                style={{
                  opacity: copyOpacity,
                  backgroundColor: isHighlighted ? "rgba(234, 179, 8, 0.4)" : "rgba(234, 179, 8, 0.2)",
                  borderWidth: 2,
                  borderColor: isHighlighted ? "rgba(234, 179, 8, 0.9)" : "rgba(234, 179, 8, 0.5)",
                  boxShadow: isHighlighted ? "0 0 20px rgba(234, 179, 8, 0.4)" : "none",
                  transform: isHighlighted ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span>📄</span>
                  <span className="font-mono text-yellow-300 text-sm">{name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right - Problems */}
        <div className="flex-1">
          <h2
            className="text-3xl font-bold text-red-400 mb-6"
            style={{
              opacity: interpolate(frame, [16.2 * fps, 17 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            문제점
          </h2>

          {problems.map((problem, index) => {
            const problemScale = spring({
              frame,
              fps,
              config: SPRING_SMOOTH,
              delay: Math.floor(problem.appearAt * fps),
            });

            const isHighlighted = frame >= problem.highlightAt * fps && frame < (problem.highlightAt + 4) * fps;
            const highlightPulse = isHighlighted ? 1 + 0.03 * Math.sin((frame - problem.highlightAt * fps) * 0.3) : 1;

            return (
              <div
                key={index}
                className="rounded-xl p-4 mb-3"
                style={{
                  transform: `scale(${problemScale * highlightPulse})`,
                  opacity: problemScale,
                  backgroundColor: isHighlighted ? "rgba(239, 68, 68, 0.4)" : "rgba(239, 68, 68, 0.2)",
                  borderWidth: 2,
                  borderColor: isHighlighted ? "rgba(239, 68, 68, 1)" : "rgba(239, 68, 68, 0.5)",
                  boxShadow: isHighlighted ? "0 0 25px rgba(239, 68, 68, 0.5)" : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{problem.icon}</span>
                  <span className="text-lg text-red-200">{problem.text}</span>
                </div>
              </div>
            );
          })}

          <div
            className="mt-6 p-4 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-xl border border-red-500/50"
            style={{
              opacity: interpolate(frame, [33 * fps, 34 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <p className="text-xl text-white font-bold text-center">
              더 좋은 방법이 필요합니다!
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

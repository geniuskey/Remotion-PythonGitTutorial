import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_SMOOTH } from "../Composition";

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { icon: "❓", text: "어떤 파일이 최신인지 모름", delay: 5 },
    { icon: "🤯", text: "변경 이력 기억 불가", delay: 8 },
    { icon: "💥", text: "여러 명 작업시 충돌", delay: 11 },
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
            흔한 백업 방법 📁
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
              opacity: interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            복사 → 이름 변경 ⬇️
          </div>

          {["main_backup.py", "main_0129.py", "main_최종.py"].map((name, i) => {
            const copyOpacity = interpolate(
              frame,
              [(1.5 + i * 0.6) * fps, (2 + i * 0.6) * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-2 mb-2"
                style={{ opacity: copyOpacity }}
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
              opacity: interpolate(frame, [4 * fps, 4.5 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            문제점 ⚠️
          </h2>

          {problems.map((problem, index) => {
            const problemScale = spring({
              frame,
              fps,
              config: SPRING_SMOOTH,
              delay: Math.floor(problem.delay * fps),
            });

            return (
              <div
                key={index}
                className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-3"
                style={{ transform: `scale(${problemScale})`, opacity: problemScale }}
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
              opacity: interpolate(frame, [14 * fps, 15 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <p className="text-xl text-white font-bold text-center">
              더 좋은 방법이 필요합니다! 🔧
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

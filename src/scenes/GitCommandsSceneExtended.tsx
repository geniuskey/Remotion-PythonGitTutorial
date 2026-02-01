import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_SMOOTH } from "../Composition";

// Audio timing (relative to scene start):
// commands-1 at 0s: "이제 깃의 기본 명령어 다섯 가지를..." - title
// commands-2 at 4.2s: "먼저 깃 이닛은..." - git init
// commands-3 at 9.9s: "깃 애드는..." - git add
// commands-4 at 17.4s: "깃 커밋은..." - git commit
// commands-5 at 25.9s: "깃 푸시는..." - git push
// commands-6 at 32.9s: "깃 풀은..." - git pull
// commands-7 at 40s: "이 다섯 가지 명령어만 알면..." - tip

export const GitCommandsSceneExtended: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const commands = [
    { cmd: "git init", desc: "Git 시작", icon: "🚀", appearAt: 4.2, highlightAt: 4.2, highlightDuration: 5 },
    { cmd: "git add .", desc: "파일 준비", icon: "➕", appearAt: 9.9, highlightAt: 9.9, highlightDuration: 7 },
    { cmd: 'git commit -m "메시지"', desc: "저장", icon: "💾", appearAt: 17.4, highlightAt: 17.4, highlightDuration: 8 },
    { cmd: "git push", desc: "업로드", icon: "☁️", appearAt: 25.9, highlightAt: 25.9, highlightDuration: 6.5 },
    { cmd: "git pull", desc: "다운로드", icon: "⬇️", appearAt: 32.9, highlightAt: 32.9, highlightDuration: 6.5 },
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col items-center justify-center p-8">
      <h1
        className="text-5xl font-bold text-white mb-6"
        style={{
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        기본 Git 명령어 5가지
      </h1>

      {/* Terminal */}
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl border border-gray-700">
        <div className="bg-gray-700/80 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-gray-400 text-sm font-mono">Terminal</span>
        </div>

        <div className="p-5 font-mono">
          {commands.map((item, index) => {
            const lineScale = spring({
              frame,
              fps,
              config: SPRING_SMOOTH,
              delay: Math.floor(item.appearAt * fps),
            });

            const isHighlighted = frame >= item.highlightAt * fps && frame < (item.highlightAt + item.highlightDuration) * fps;
            const highlightPulse = isHighlighted ? 1 + 0.02 * Math.sin((frame - item.highlightAt * fps) * 0.2) : 1;

            return (
              <div
                key={index}
                className="py-2 border-b border-gray-700/50 last:border-b-0 rounded-lg px-2 -mx-2"
                style={{
                  transform: `scale(${lineScale * highlightPulse})`,
                  opacity: lineScale,
                  backgroundColor: isHighlighted ? "rgba(34, 197, 94, 0.15)" : "transparent",
                  boxShadow: isHighlighted ? "0 0 20px rgba(34, 197, 94, 0.3)" : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl w-10">{item.icon}</span>
                  <code
                    className="text-lg"
                    style={{
                      color: isHighlighted ? "#4ade80" : "#22c55e",
                      fontWeight: isHighlighted ? "bold" : "normal",
                    }}
                  >
                    $ {item.cmd}
                  </code>
                  <span className="text-gray-500 ml-3">← {item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div
        className="mt-6 rounded-xl p-4"
        style={{
          opacity: interpolate(frame, [40 * fps, 41 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background: frame >= 40 * fps
            ? "linear-gradient(to right, rgba(22, 163, 74, 0.4), rgba(16, 185, 129, 0.4))"
            : "linear-gradient(to right, rgba(22, 163, 74, 0.3), rgba(16, 185, 129, 0.3))",
          borderWidth: 2,
          borderColor: frame >= 40 * fps ? "#22c55e" : "rgba(34, 197, 94, 0.5)",
          boxShadow: frame >= 40 * fps ? "0 0 25px rgba(34, 197, 94, 0.4)" : "none",
        }}
      >
        <p className="text-lg text-white">
          이 <span className="text-green-400 font-bold">5가지</span>만 알면 기본 버전 관리 OK!
        </p>
      </div>

      {/* Workflow */}
      <div
        className="mt-4 flex items-center gap-3 text-base"
        style={{
          opacity: interpolate(frame, [42 * fps, 43 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {[
          { name: "init", color: "blue" },
          { name: "add", color: "yellow" },
          { name: "commit", color: "green" },
          { name: "push", color: "purple" },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className={`px-3 py-1.5 rounded`}
              style={{
                backgroundColor:
                  step.color === "blue" ? "rgba(59, 130, 246, 0.3)" :
                  step.color === "yellow" ? "rgba(234, 179, 8, 0.3)" :
                  step.color === "green" ? "rgba(34, 197, 94, 0.3)" :
                  "rgba(168, 85, 247, 0.3)",
                color:
                  step.color === "blue" ? "#93c5fd" :
                  step.color === "yellow" ? "#fde047" :
                  step.color === "green" ? "#86efac" :
                  "#c4b5fd",
              }}
            >
              {step.name}
            </span>
            {i < 3 && <span className="text-white/40">→</span>}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

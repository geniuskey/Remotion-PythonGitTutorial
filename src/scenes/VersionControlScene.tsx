import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_BOUNCY } from "../Composition";

// Audio timing (relative to scene start):
// vcs-1 at 0s: "형상관리, 영어로 버전 컨트롤은..." - title
// vcs-2 at 6.1s: "쉽게 말해서 코드의 타임머신이라고..." - subtitle
// vcs-3 at 10.8s: "모든 변경 사항이 자동으로 기록되고..." - timeline
// vcs-4 at 18.5s: "누가, 언제, 무엇을 변경했는지..." - time travel demo
// vcs-5 at 23.7s: "그리고 여러 사람이 동시에..." - features

export const VersionControlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const timelineItems = [
    { version: "v1", desc: "초기 버전", time: "1월 1일" },
    { version: "v2", desc: "기능 추가", time: "1월 5일" },
    { version: "v3", desc: "버그 수정", time: "1월 10일" },
    { version: "v4", desc: "최적화", time: "1월 15일" },
  ];

  // Subtitle highlight when "타임머신" is mentioned
  const subtitleHighlight = frame >= 6.1 * fps && frame < 10 * fps;

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900 flex flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold text-white mb-2" style={{ opacity: titleOpacity }}>
        형상관리 (Version Control)
      </h1>
      <p
        className="text-2xl mb-10 px-6 py-2 rounded-xl"
        style={{
          opacity: interpolate(frame, [6.1 * fps, 7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          color: subtitleHighlight ? "#5eead4" : "#2dd4bf",
          backgroundColor: subtitleHighlight ? "rgba(20, 184, 166, 0.2)" : "transparent",
          boxShadow: subtitleHighlight ? "0 0 30px rgba(20, 184, 166, 0.4)" : "none",
          transform: subtitleHighlight ? "scale(1.05)" : "scale(1)",
        }}
      >
        코드의 타임머신
      </p>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl mb-8">
        <div
          className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-teal-600 to-cyan-400 rounded-full"
          style={{
            width: `${interpolate(frame, [10.8 * fps, 14 * fps], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}%`,
          }}
        />

        <div className="flex justify-between relative z-10">
          {timelineItems.map((item, index) => {
            const itemDelay = 11 + index * 1;
            const itemScale = spring({
              frame,
              fps,
              config: SPRING_BOUNCY,
              delay: Math.floor(itemDelay * fps),
            });

            const isHighlighted = frame >= itemDelay * fps && frame < (itemDelay + 1.5) * fps;

            return (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ transform: `scale(${itemScale})`, opacity: itemScale }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold mb-2"
                  style={{
                    background: "linear-gradient(to bottom right, #14b8a6, #22d3ee)",
                    boxShadow: isHighlighted ? "0 0 30px rgba(20, 184, 166, 0.7)" : "0 4px 6px rgba(0,0,0,0.3)",
                    transform: isHighlighted ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {item.version}
                </div>
                <div className="text-white font-medium text-sm">{item.desc}</div>
                <div className="text-white/50 text-xs">{item.time}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time travel demo */}
      <div
        className="flex items-center gap-6 mt-4"
        style={{
          opacity: interpolate(frame, [18.5 * fps, 19.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {(() => {
          const isTimeTravelHighlighted = frame >= 18.5 * fps && frame < 23 * fps;
          return (
            <>
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: isTimeTravelHighlighted ? "rgba(20, 184, 166, 0.4)" : "rgba(20, 184, 166, 0.2)",
                  borderWidth: 2,
                  borderColor: isTimeTravelHighlighted ? "#14b8a6" : "rgba(20, 184, 166, 0.5)",
                  boxShadow: isTimeTravelHighlighted ? "0 0 20px rgba(20, 184, 166, 0.5)" : "none",
                }}
              >
                <div className="text-teal-400 text-sm mb-1">현재</div>
                <div className="text-white text-xl font-bold">v4</div>
              </div>
              <div className="text-3xl text-white" style={{ animation: isTimeTravelHighlighted ? "pulse 1s infinite" : "none" }}>⏪</div>
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: isTimeTravelHighlighted ? "rgba(168, 85, 247, 0.4)" : "rgba(168, 85, 247, 0.2)",
                  borderWidth: 2,
                  borderColor: isTimeTravelHighlighted ? "#a855f7" : "rgba(168, 85, 247, 0.5)",
                  boxShadow: isTimeTravelHighlighted ? "0 0 20px rgba(168, 85, 247, 0.5)" : "none",
                }}
              >
                <div className="text-purple-400 text-sm mb-1">과거로</div>
                <div className="text-white text-xl font-bold">v2</div>
              </div>
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: isTimeTravelHighlighted ? "rgba(34, 197, 94, 0.4)" : "rgba(34, 197, 94, 0.2)",
                  borderWidth: 2,
                  borderColor: isTimeTravelHighlighted ? "#22c55e" : "rgba(34, 197, 94, 0.5)",
                  boxShadow: isTimeTravelHighlighted ? "0 0 20px rgba(34, 197, 94, 0.5)" : "none",
                }}
              >
                <div className="text-green-400 text-lg">언제든 복구!</div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Features */}
      <div
        className="flex gap-4 mt-8"
        style={{
          opacity: interpolate(frame, [23.7 * fps, 24.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {[
          { text: "모든 변경 기록", icon: "📝", highlightAt: 23.7 },
          { text: "누가 변경했는지", icon: "👤", highlightAt: 24.5 },
          { text: "충돌 없이 병합", icon: "🔀", highlightAt: 25.5 },
        ].map((item, i) => {
          const isHighlighted = frame >= item.highlightAt * fps && frame < (item.highlightAt + 2) * fps;
          return (
            <div
              key={i}
              className="rounded-lg px-4 py-2 text-white text-sm"
              style={{
                backgroundColor: isHighlighted ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.1)",
                boxShadow: isHighlighted ? "0 0 15px rgba(255, 255, 255, 0.3)" : "none",
                transform: isHighlighted ? "scale(1.1)" : "scale(1)",
              }}
            >
              {item.icon} {item.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

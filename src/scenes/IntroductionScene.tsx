import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_BOUNCY } from "../Composition";

// Audio timing (relative to scene start):
// intro-1 at 0s: "안녕하세요..." - title appears
// intro-2 at 8s: "먼저 형상관리가..." - highlight item 1
// intro-3 at 12.6s: "깃의 기본 명령어와 깃허브..." - highlight items 2,3

export const IntroductionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agenda = [
    { icon: "📚", title: "형상관리란?", desc: "버전 관리의 개념", highlightAt: 8 },
    { icon: "🔧", title: "Git 기본", desc: "핵심 명령어 5가지", highlightAt: 12.6 },
    { icon: "🐙", title: "GitHub", desc: "온라인 협업 플랫폼", highlightAt: 14 },
    { icon: "🚀", title: "실습", desc: "직접 해보기", highlightAt: 16 },
  ];

  const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-12">
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="text-center mb-12" style={{ opacity: titleOpacity }}>
        <h1 className="text-5xl font-bold text-white mb-3">오늘 배울 내용</h1>
        <p className="text-xl text-white/60">비전공자를 위한 Git & GitHub 가이드</p>
      </div>

      <div className="grid grid-cols-4 gap-5 w-full max-w-5xl">
        {agenda.map((item, index) => {
          const itemDelay = 1 + index * 0.8;
          const itemScale = spring({
            frame,
            fps,
            config: SPRING_BOUNCY,
            delay: Math.floor(itemDelay * fps),
          });

          // Highlight effect when audio mentions this item
          const highlightStart = item.highlightAt * fps;
          const isHighlighted = frame >= highlightStart && frame < highlightStart + 3 * fps;
          const highlightPulse = isHighlighted
            ? 1 + 0.05 * Math.sin((frame - highlightStart) * 0.3)
            : 1;

          return (
            <div
              key={index}
              className="relative"
              style={{
                transform: `scale(${itemScale * highlightPulse})`,
                opacity: itemScale,
              }}
            >
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                {index + 1}
              </div>
              <div
                className="backdrop-blur-sm rounded-xl p-5 h-full transition-all"
                style={{
                  backgroundColor: isHighlighted ? "rgba(168, 85, 247, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  borderWidth: 2,
                  borderColor: isHighlighted ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.2)",
                  boxShadow: isHighlighted ? "0 0 30px rgba(168, 85, 247, 0.5)" : "none",
                }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/60">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p
        className="mt-10 text-xl text-white/70"
        style={{
          opacity: interpolate(frame, [12 * fps, 13 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        차근차근 함께 배워보겠습니다
      </p>
    </AbsoluteFill>
  );
};

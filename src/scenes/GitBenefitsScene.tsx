import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_BOUNCY } from "../Composition";

// Audio timing (relative to scene start):
// benefits-1 at 0s: "깃의 장점을 정리해 볼까요?" - title
// benefits-2 at 3.3s: "첫째, 되돌리기가 가능합니다..." - benefit 1
// benefits-3 at 9s: "둘째, 협업이 쉬워집니다..." - benefit 2
// benefits-4 at 15.4s: "셋째, 모든 변경 기록이 남습니다..." - benefit 3
// benefits-5 at 22s: "넷째, 브랜치 기능으로..." - benefit 4

export const GitBenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const benefits = [
    { icon: "⏪", title: "되돌리기", desc: "언제든 이전 버전으로 복구", color: "from-blue-500 to-cyan-500", appearAt: 3.3, highlightAt: 3.3 },
    { icon: "👥", title: "협업", desc: "여러 명이 동시에 작업", color: "from-purple-500 to-pink-500", appearAt: 9, highlightAt: 9 },
    { icon: "📝", title: "기록", desc: "모든 변경 이력 추적", color: "from-orange-500 to-yellow-500", appearAt: 15.4, highlightAt: 15.4 },
    { icon: "🔀", title: "브랜치", desc: "안전하게 실험 가능", color: "from-green-500 to-emerald-500", appearAt: 22, highlightAt: 22 },
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 flex flex-col items-center justify-center p-12">
      <h1
        className="text-5xl font-bold text-white mb-3"
        style={{
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Git의 4가지 장점
      </h1>
      <p
        className="text-lg text-white/60 mb-10"
        style={{
          opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Git을 써야 하는 이유
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
        {benefits.map((benefit, index) => {
          const cardScale = spring({
            frame,
            fps,
            config: SPRING_BOUNCY,
            delay: Math.floor(benefit.appearAt * fps),
          });

          const isHighlighted = frame >= benefit.highlightAt * fps && frame < (benefit.highlightAt + 5) * fps;
          const highlightPulse = isHighlighted ? 1 + 0.03 * Math.sin((frame - benefit.highlightAt * fps) * 0.25) : 1;

          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${benefit.color} rounded-2xl`}
              style={{
                transform: `scale(${cardScale * highlightPulse})`,
                opacity: cardScale,
                padding: isHighlighted ? 3 : 2,
                boxShadow: isHighlighted ? `0 0 40px rgba(255, 255, 255, 0.4)` : "none",
              }}
            >
              <div className="bg-slate-900/90 rounded-[14px] p-5 h-full">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-3xl`}
                    style={{
                      boxShadow: isHighlighted ? "0 0 20px rgba(255, 255, 255, 0.5)" : "none",
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                    <p className="text-white/70">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

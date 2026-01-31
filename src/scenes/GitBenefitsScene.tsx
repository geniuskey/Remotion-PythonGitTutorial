import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const GitBenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const benefits = [
    { icon: "⏪", title: "되돌리기", desc: "언제든 이전 버전으로 복구", color: "from-blue-500 to-cyan-500" },
    { icon: "👥", title: "협업", desc: "여러 명이 동시에 작업", color: "from-purple-500 to-pink-500" },
    { icon: "📝", title: "기록", desc: "모든 변경 이력 추적", color: "from-orange-500 to-yellow-500" },
    { icon: "🔀", title: "브랜치", desc: "안전하게 실험 가능", color: "from-green-500 to-emerald-500" },
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
        Git의 4가지 장점 💪
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
          const cardDelay = 1.5 + index * 1;
          const cardScale = spring({
            frame,
            fps,
            config: { damping: 15, stiffness: 100 },
            delay: Math.floor(cardDelay * fps),
          });

          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${benefit.color} p-0.5 rounded-2xl`}
              style={{ transform: `scale(${cardScale})`, opacity: cardScale }}
            >
              <div className="bg-slate-900/90 rounded-[14px] p-5 h-full">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-3xl`}
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

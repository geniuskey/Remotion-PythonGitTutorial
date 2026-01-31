import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const OutroSceneExtended: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const steps = [
    { num: "1", text: "Git 설치", icon: "📥" },
    { num: "2", text: "GitHub 가입", icon: "👤" },
    { num: "3", text: "저장소 생성", icon: "📁" },
    { num: "4", text: "Push!", icon: "🚀" },
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900 flex flex-col items-center justify-center p-12">
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

      <h1
        className="text-5xl font-bold text-white mb-3"
        style={{ transform: `scale(${titleScale})`, opacity: titleScale }}
      >
        지금 바로 시작하세요! 🎯
      </h1>

      <p
        className="text-lg text-white/60 mb-8"
        style={{
          opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        4단계만 따라하면 됩니다
      </p>

      {/* Steps */}
      <div className="flex gap-5 mb-8">
        {steps.map((step, index) => {
          const stepDelay = 1 + index * 0.5;
          const stepScale = spring({
            frame,
            fps,
            config: { damping: 15, stiffness: 100 },
            delay: Math.floor(stepDelay * fps),
          });

          return (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ transform: `scale(${stepScale})`, opacity: stepScale }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2 shadow-lg">
                {step.num}
              </div>
              <span className="text-3xl mb-1">{step.icon}</span>
              <span className="text-white text-sm">{step.text}</span>
            </div>
          );
        })}
      </div>

      {/* Seminar preview */}
      <div
        className="bg-white/10 rounded-xl p-5 mb-6 border border-white/20 max-w-lg"
        style={{
          opacity: interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <h3 className="text-lg font-bold text-white mb-2">📚 오늘 세미나 내용</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>✓ Git 설치 및 설정</li>
          <li>✓ GitHub 계정 생성</li>
          <li>✓ 첫 저장소 만들기</li>
          <li>✓ 파이썬 프로젝트 실습</li>
        </ul>
      </div>

      {/* CTA */}
      <div
        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl px-10 py-5 shadow-xl"
        style={{
          opacity: interpolate(frame, [7 * fps, 8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${spring({
            frame,
            fps,
            config: { damping: 12 },
            delay: Math.floor(7 * fps),
          })})`,
        }}
      >
        <p className="text-2xl font-bold text-white">💪 비전공자도 충분히 할 수 있어요!</p>
      </div>

      <p
        className="mt-6 text-white/50 text-lg"
        style={{
          opacity: interpolate(frame, [10 * fps, 11 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        함께 시작해볼까요? 🙌
      </p>
    </AbsoluteFill>
  );
};

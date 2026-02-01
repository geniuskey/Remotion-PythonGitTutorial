import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_BOUNCY } from "../Composition";

// Audio timing (relative to scene start):
// start-1 at 0s: "자, 이제 시작할 준비가 되셨나요?" - title
// start-2 at 4.1s: "오늘 세미나에서 깃 설치부터..." - seminar preview
// start-3 at 10.7s: "비전공자도 충분히 할 수 있습니다..." - CTA

export const OutroSceneExtended: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: SPRING_BOUNCY,
  });

  const steps = [
    { num: "1", text: "Git 설치", icon: "📥" },
    { num: "2", text: "GitHub 가입", icon: "👤" },
    { num: "3", text: "저장소 생성", icon: "📁" },
    { num: "4", text: "Push!", icon: "🚀" },
  ];

  const isSeminarHighlighted = frame >= 4.1 * fps && frame < 10 * fps;
  const isCtaHighlighted = frame >= 10.7 * fps;

  return (
    <AbsoluteFill className="bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900 flex flex-col items-center justify-center p-12">
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

      <h1
        className="text-5xl font-bold text-white mb-3"
        style={{ transform: `scale(${titleScale})`, opacity: titleScale }}
      >
        지금 바로 시작하세요!
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
          const stepDelay = 1 + index * 0.6;
          const stepScale = spring({
            frame,
            fps,
            config: SPRING_BOUNCY,
            delay: Math.floor(stepDelay * fps),
          });

          const isStepHighlighted = frame >= stepDelay * fps && frame < (stepDelay + 1) * fps;

          return (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{
                transform: `scale(${stepScale * (isStepHighlighted ? 1.1 : 1)})`,
                opacity: stepScale,
              }}
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2"
                style={{
                  boxShadow: isStepHighlighted ? "0 0 30px rgba(168, 85, 247, 0.7)" : "0 4px 6px rgba(0,0,0,0.3)",
                }}
              >
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
        className="rounded-xl p-5 mb-6 max-w-lg"
        style={{
          opacity: interpolate(frame, [4.1 * fps, 5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          backgroundColor: isSeminarHighlighted ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.1)",
          borderWidth: 2,
          borderColor: isSeminarHighlighted ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.2)",
          boxShadow: isSeminarHighlighted ? "0 0 30px rgba(255, 255, 255, 0.2)" : "none",
          transform: isSeminarHighlighted ? "scale(1.02)" : "scale(1)",
        }}
      >
        <h3 className="text-lg font-bold text-white mb-2">오늘 세미나 내용</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>Git 설치 및 설정</li>
          <li>GitHub 계정 생성</li>
          <li>첫 저장소 만들기</li>
          <li>파이썬 프로젝트 실습</li>
        </ul>
      </div>

      {/* CTA */}
      <div
        className="rounded-xl px-10 py-5"
        style={{
          opacity: interpolate(frame, [10.7 * fps, 11.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${spring({
            frame,
            fps,
            config: SPRING_BOUNCY,
            delay: Math.floor(10.7 * fps),
          }) * (isCtaHighlighted ? 1 + 0.02 * Math.sin(frame * 0.15) : 1)})`,
          background: isCtaHighlighted
            ? "linear-gradient(to right, #22c55e, #10b981)"
            : "linear-gradient(to right, #16a34a, #059669)",
          boxShadow: isCtaHighlighted ? "0 0 40px rgba(34, 197, 94, 0.6)" : "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <p className="text-2xl font-bold text-white">비전공자도 충분히 할 수 있어요!</p>
      </div>

      <p
        className="mt-6 text-white/50 text-lg"
        style={{
          opacity: interpolate(frame, [13 * fps, 14 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        함께 시작해볼까요?
      </p>
    </AbsoluteFill>
  );
};

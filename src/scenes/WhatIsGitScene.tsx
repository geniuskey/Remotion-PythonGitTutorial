import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_BOUNCY } from "../Composition";

// Audio timing (relative to scene start):
// git-1 at 0s: "깃은 현재 전 세계에서 가장 많이..." - logo + title
// git-2 at 6.2s: "리눅스를 만든 리누스 토발즈가..." - creator info
// git-3 at 11.7s: "깃을 사용하면 파일 하나만 유지하면서도..." - key benefit
// git-4 at 17.5s: "구글, 마이크로소프트, 네이버..." - companies

export const WhatIsGitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: SPRING_BOUNCY,
  });

  const companies = [
    { name: "Google", color: "from-blue-500 to-green-500" },
    { name: "Microsoft", color: "from-blue-600 to-cyan-500" },
    { name: "NAVER", color: "from-green-500 to-green-600" },
    { name: "Kakao", color: "from-yellow-400 to-yellow-500" },
    { name: "Meta", color: "from-blue-500 to-purple-500" },
  ];

  const isCreatorHighlighted = frame >= 6.2 * fps && frame < 11 * fps;
  const isBenefitHighlighted = frame >= 11.7 * fps && frame < 17 * fps;
  const isCompaniesHighlighted = frame >= 17.5 * fps;

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900 flex flex-col items-center justify-center p-12">
      {/* Git Logo */}
      <div
        className="mb-6"
        style={{ transform: `scale(${logoScale})`, opacity: logoScale }}
      >
        <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30 rotate-45">
          <span className="text-white text-4xl font-bold -rotate-45">Git</span>
        </div>
      </div>

      <h1 className="text-5xl font-bold text-white mb-2">Git이란?</h1>
      <p
        className="text-xl text-orange-400 mb-8"
        style={{
          opacity: interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        세계에서 가장 많이 사용되는 형상관리 도구
      </p>

      {/* Creator info */}
      <div
        className="rounded-xl p-5 mb-6 max-w-xl flex items-center gap-4"
        style={{
          opacity: interpolate(frame, [6.2 * fps, 7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          backgroundColor: isCreatorHighlighted ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
          boxShadow: isCreatorHighlighted ? "0 0 30px rgba(255, 255, 255, 0.2)" : "none",
          transform: isCreatorHighlighted ? "scale(1.02)" : "scale(1)",
          borderWidth: isCreatorHighlighted ? 2 : 0,
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="text-5xl">👨‍💻</div>
        <div>
          <h3 className="text-xl font-bold text-white">리누스 토발즈</h3>
          <p className="text-white/70">리눅스 창시자가 2005년에 개발</p>
        </div>
      </div>

      {/* Key benefit */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{
          opacity: interpolate(frame, [11.7 * fps, 12.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background: isBenefitHighlighted
            ? "linear-gradient(to right, rgba(22, 163, 74, 0.5), rgba(13, 148, 136, 0.5))"
            : "linear-gradient(to right, rgba(22, 163, 74, 0.3), rgba(13, 148, 136, 0.3))",
          borderWidth: 2,
          borderColor: isBenefitHighlighted ? "#22c55e" : "rgba(34, 197, 94, 0.5)",
          boxShadow: isBenefitHighlighted ? "0 0 30px rgba(34, 197, 94, 0.5)" : "none",
          transform: isBenefitHighlighted ? "scale(1.05)" : "scale(1)",
        }}
      >
        <p className="text-xl text-white">
          <span className="text-green-400 font-bold">파일 하나</span>로{" "}
          <span className="text-cyan-400 font-bold">모든 버전</span> 관리!
        </p>
      </div>

      {/* Companies */}
      <div
        className="flex gap-3 flex-wrap justify-center"
        style={{
          opacity: interpolate(frame, [17.5 * fps, 18.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span className="text-white/60 text-sm mr-2">사용 기업:</span>
        {companies.map((company, index) => {
          const companyDelay = 17.5 + index * 0.8;
          const isThisCompanyHighlighted = frame >= companyDelay * fps && frame < (companyDelay + 1.5) * fps;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${company.color} px-4 py-1.5 rounded-full`}
              style={{
                boxShadow: isThisCompanyHighlighted ? "0 0 20px rgba(255, 255, 255, 0.5)" : "none",
                transform: isThisCompanyHighlighted ? "scale(1.15)" : "scale(1)",
              }}
            >
              <span className="text-white font-medium text-sm">{company.name}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

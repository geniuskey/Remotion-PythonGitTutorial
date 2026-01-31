import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const WhatIsGitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const companies = [
    { name: "Google", color: "from-blue-500 to-green-500" },
    { name: "Microsoft", color: "from-blue-600 to-cyan-500" },
    { name: "NAVER", color: "from-green-500 to-green-600" },
    { name: "Kakao", color: "from-yellow-400 to-yellow-500" },
    { name: "Meta", color: "from-blue-500 to-purple-500" },
  ];

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
        className="bg-white/10 rounded-xl p-5 mb-6 max-w-xl flex items-center gap-4"
        style={{
          opacity: interpolate(frame, [3 * fps, 4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
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
        className="bg-gradient-to-r from-green-600/30 to-teal-600/30 rounded-xl p-4 mb-6 border border-green-500/50"
        style={{
          opacity: interpolate(frame, [6 * fps, 7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p className="text-xl text-white">
          📁 <span className="text-green-400 font-bold">파일 하나</span>로{" "}
          <span className="text-cyan-400 font-bold">모든 버전</span> 관리!
        </p>
      </div>

      {/* Companies */}
      <div
        className="flex gap-3 flex-wrap justify-center"
        style={{
          opacity: interpolate(frame, [9 * fps, 10 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span className="text-white/60 text-sm mr-2">사용 기업:</span>
        {companies.map((company, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${company.color} px-4 py-1.5 rounded-full`}
          >
            <span className="text-white font-medium text-sm">{company.name}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

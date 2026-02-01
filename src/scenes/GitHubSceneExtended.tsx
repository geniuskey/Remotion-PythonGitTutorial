import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_BOUNCY } from "../Composition";

export const GitHubSceneExtended: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: SPRING_BOUNCY,
  });

  const features = [
    { icon: "☁️", title: "코드 백업", color: "from-blue-500 to-cyan-500" },
    { icon: "🤝", title: "팀 협업", color: "from-purple-500 to-pink-500" },
    { icon: "📊", title: "이슈 관리", color: "from-orange-500 to-yellow-500" },
    { icon: "🔄", title: "코드 리뷰", color: "from-green-500 to-emerald-500" },
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-12">
      {/* Logo & Title */}
      <div
        className="mb-4 flex items-center gap-5"
        style={{ transform: `scale(${logoScale})`, opacity: logoScale }}
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="black">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>
        <div>
          <h1 className="text-5xl font-bold text-white">GitHub</h1>
          <p className="text-lg text-white/60">세계 최대 코드 호스팅</p>
        </div>
      </div>

      {/* Stats */}
      <div
        className="flex gap-10 mb-6"
        style={{
          opacity: interpolate(frame, [2 * fps, 3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">1억+</div>
          <div className="text-white/60 text-sm">개발자</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">4억+</div>
          <div className="text-white/60 text-sm">저장소</div>
        </div>
      </div>

      {/* Git vs GitHub */}
      <div
        className="flex gap-4 mb-6 items-center"
        style={{
          opacity: interpolate(frame, [5 * fps, 6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">Git</div>
          <div className="text-white/70 text-sm">내 PC에서 작동</div>
        </div>
        <div className="text-2xl text-white/40">+</div>
        <div className="bg-white/10 border border-white/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">GitHub</div>
          <div className="text-white/70 text-sm">클라우드 저장</div>
        </div>
        <div className="text-2xl text-white/40">=</div>
        <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
          <div className="text-2xl">🎉</div>
          <div className="text-green-400 font-bold text-sm">완벽한 협업</div>
        </div>
      </div>

      {/* Features */}
      <div
        className="flex gap-4"
        style={{
          opacity: interpolate(frame, [9 * fps, 10 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {features.map((f, i) => (
          <div key={i} className={`bg-gradient-to-br ${f.color} p-0.5 rounded-lg`}>
            <div className="bg-slate-900/90 rounded-md p-3 text-center w-24">
              <span className="text-2xl block mb-1">{f.icon}</span>
              <span className="text-white text-sm font-medium">{f.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Team benefit */}
      <div
        className="mt-6 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-xl p-4 border border-blue-500/50"
        style={{
          opacity: interpolate(frame, [13 * fps, 14 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p className="text-lg text-white">
          👥 팀 프로젝트의 <span className="text-cyan-400 font-bold">필수 도구</span>입니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};

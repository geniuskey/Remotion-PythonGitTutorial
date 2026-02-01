import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING_BOUNCY } from "../Composition";

// Audio timing (relative to scene start):
// github-1 at 0s: "깃허브는 깃 저장소를 온라인에서..." - logo + title
// github-2 at 5.2s: "전 세계 1억 명 이상의 개발자가..." - stats
// github-3 at 12.2s: "깃허브를 사용하면 내 코드를 안전하게..." - benefits

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

  const isStatsHighlighted = frame >= 5.2 * fps && frame < 12 * fps;
  const isBenefitsHighlighted = frame >= 12.2 * fps;

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
          opacity: interpolate(frame, [5.2 * fps, 6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          className="text-center px-6 py-3 rounded-xl"
          style={{
            backgroundColor: isStatsHighlighted ? "rgba(34, 197, 94, 0.2)" : "transparent",
            boxShadow: isStatsHighlighted ? "0 0 25px rgba(34, 197, 94, 0.4)" : "none",
            transform: isStatsHighlighted ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div className="text-3xl font-bold text-green-400">1억+</div>
          <div className="text-white/60 text-sm">개발자</div>
        </div>
        <div
          className="text-center px-6 py-3 rounded-xl"
          style={{
            backgroundColor: isStatsHighlighted ? "rgba(59, 130, 246, 0.2)" : "transparent",
            boxShadow: isStatsHighlighted ? "0 0 25px rgba(59, 130, 246, 0.4)" : "none",
            transform: isStatsHighlighted ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div className="text-3xl font-bold text-blue-400">4억+</div>
          <div className="text-white/60 text-sm">저장소</div>
        </div>
      </div>

      {/* Git vs GitHub */}
      <div
        className="flex gap-4 mb-6 items-center"
        style={{
          opacity: interpolate(frame, [12.2 * fps, 13 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {(() => {
          const isGitVsGitHubHighlighted = frame >= 12.2 * fps && frame < 16 * fps;
          return (
            <>
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: isGitVsGitHubHighlighted ? "rgba(249, 115, 22, 0.3)" : "rgba(249, 115, 22, 0.2)",
                  borderWidth: 2,
                  borderColor: isGitVsGitHubHighlighted ? "#f97316" : "rgba(249, 115, 22, 0.5)",
                  boxShadow: isGitVsGitHubHighlighted ? "0 0 20px rgba(249, 115, 22, 0.4)" : "none",
                }}
              >
                <div className="text-2xl font-bold text-orange-400">Git</div>
                <div className="text-white/70 text-sm">내 PC에서 작동</div>
              </div>
              <div className="text-2xl text-white/40">+</div>
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: isGitVsGitHubHighlighted ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                  borderWidth: 2,
                  borderColor: isGitVsGitHubHighlighted ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)",
                  boxShadow: isGitVsGitHubHighlighted ? "0 0 20px rgba(255, 255, 255, 0.3)" : "none",
                }}
              >
                <div className="text-2xl font-bold text-white">GitHub</div>
                <div className="text-white/70 text-sm">클라우드 저장</div>
              </div>
              <div className="text-2xl text-white/40">=</div>
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: isGitVsGitHubHighlighted ? "rgba(34, 197, 94, 0.4)" : "rgba(34, 197, 94, 0.2)",
                  borderWidth: 2,
                  borderColor: isGitVsGitHubHighlighted ? "#22c55e" : "rgba(34, 197, 94, 0.5)",
                  boxShadow: isGitVsGitHubHighlighted ? "0 0 20px rgba(34, 197, 94, 0.5)" : "none",
                }}
              >
                <div className="text-2xl">🎉</div>
                <div className="text-green-400 font-bold text-sm">완벽한 협업</div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Features */}
      <div
        className="flex gap-4"
        style={{
          opacity: interpolate(frame, [15 * fps, 16 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {features.map((f, i) => {
          const featureHighlightStart = 15 + i * 1;
          const isFeatureHighlighted = frame >= featureHighlightStart * fps && frame < (featureHighlightStart + 1.5) * fps;
          return (
            <div
              key={i}
              className={`bg-gradient-to-br ${f.color} rounded-lg`}
              style={{
                padding: isFeatureHighlighted ? 3 : 2,
                boxShadow: isFeatureHighlighted ? "0 0 25px rgba(255, 255, 255, 0.4)" : "none",
                transform: isFeatureHighlighted ? "scale(1.1)" : "scale(1)",
              }}
            >
              <div className="bg-slate-900/90 rounded-md p-3 text-center w-24">
                <span className="text-2xl block mb-1">{f.icon}</span>
                <span className="text-white text-sm font-medium">{f.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team benefit */}
      <div
        className="mt-6 rounded-xl p-4"
        style={{
          opacity: interpolate(frame, [17 * fps, 18 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background: isBenefitsHighlighted
            ? "linear-gradient(to right, rgba(37, 99, 235, 0.4), rgba(6, 182, 212, 0.4))"
            : "linear-gradient(to right, rgba(37, 99, 235, 0.3), rgba(6, 182, 212, 0.3))",
          borderWidth: 2,
          borderColor: isBenefitsHighlighted ? "#3b82f6" : "rgba(59, 130, 246, 0.5)",
          boxShadow: isBenefitsHighlighted ? "0 0 25px rgba(59, 130, 246, 0.4)" : "none",
        }}
      >
        <p className="text-lg text-white">
          팀 프로젝트의 <span className="text-cyan-400 font-bold">필수 도구</span>입니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};

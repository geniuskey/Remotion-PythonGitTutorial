import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

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

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900 flex flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold text-white mb-2" style={{ opacity: titleOpacity }}>
        형상관리 (Version Control)
      </h1>
      <p
        className="text-2xl text-teal-400 mb-10"
        style={{
          opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        코드의 타임머신 ⏰
      </p>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl mb-8">
        <div
          className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-teal-600 to-cyan-400 rounded-full"
          style={{
            width: `${interpolate(frame, [1.5 * fps, 4 * fps], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}%`,
          }}
        />

        <div className="flex justify-between relative z-10">
          {timelineItems.map((item, index) => {
            const itemDelay = 2 + index * 0.5;
            const itemScale = spring({
              frame,
              fps,
              config: { damping: 15 },
              delay: Math.floor(itemDelay * fps),
            });

            return (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ transform: `scale(${itemScale})`, opacity: itemScale }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg mb-2">
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
          opacity: interpolate(frame, [6 * fps, 7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div className="bg-teal-500/20 border border-teal-500 rounded-xl p-4 text-center">
          <div className="text-teal-400 text-sm mb-1">현재</div>
          <div className="text-white text-xl font-bold">v4</div>
        </div>
        <div className="text-3xl text-white">⏪</div>
        <div className="bg-purple-500/20 border border-purple-500 rounded-xl p-4 text-center">
          <div className="text-purple-400 text-sm mb-1">과거로</div>
          <div className="text-white text-xl font-bold">v2</div>
        </div>
        <div className="bg-green-500/20 border border-green-500 rounded-xl p-4">
          <div className="text-green-400 text-lg">✓ 언제든 복구!</div>
        </div>
      </div>

      {/* Features */}
      <div
        className="flex gap-4 mt-8"
        style={{
          opacity: interpolate(frame, [10 * fps, 11 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {["📝 모든 변경 기록", "👤 누가 변경했는지", "🔀 충돌 없이 병합"].map((text, i) => (
          <div key={i} className="bg-white/10 rounded-lg px-4 py-2 text-white text-sm">
            {text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const GitCommandsSceneExtended: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const commands = [
    { cmd: "git init", desc: "Git 시작", icon: "🚀", delay: 1 },
    { cmd: "git add .", desc: "파일 준비", icon: "➕", delay: 4 },
    { cmd: 'git commit -m "메시지"', desc: "저장", icon: "💾", delay: 7 },
    { cmd: "git push", desc: "업로드", icon: "☁️", delay: 12 },
    { cmd: "git pull", desc: "다운로드", icon: "⬇️", delay: 16 },
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col items-center justify-center p-8">
      <h1
        className="text-5xl font-bold text-white mb-6"
        style={{
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        기본 Git 명령어 5가지 ⌨️
      </h1>

      {/* Terminal */}
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl border border-gray-700">
        <div className="bg-gray-700/80 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-gray-400 text-sm font-mono">Terminal</span>
        </div>

        <div className="p-5 font-mono">
          {commands.map((item, index) => {
            const lineScale = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay: Math.floor(item.delay * fps),
            });

            return (
              <div
                key={index}
                className="py-2 border-b border-gray-700/50 last:border-b-0"
                style={{ transform: `scale(${lineScale})`, opacity: lineScale }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl w-10">{item.icon}</span>
                  <code className="text-green-400 text-lg">$ {item.cmd}</code>
                  <span className="text-gray-500 ml-3">← {item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div
        className="mt-6 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-xl p-4 border border-green-500/50"
        style={{
          opacity: interpolate(frame, [20 * fps, 21 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p className="text-lg text-white">
          ✨ 이 <span className="text-green-400 font-bold">5가지</span>만 알면 기본 버전 관리 OK!
        </p>
      </div>

      {/* Workflow */}
      <div
        className="mt-4 flex items-center gap-3 text-base"
        style={{
          opacity: interpolate(frame, [23 * fps, 24 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span className="bg-blue-500/30 px-3 py-1.5 rounded text-blue-300">init</span>
        <span className="text-white/40">→</span>
        <span className="bg-yellow-500/30 px-3 py-1.5 rounded text-yellow-300">add</span>
        <span className="text-white/40">→</span>
        <span className="bg-green-500/30 px-3 py-1.5 rounded text-green-300">commit</span>
        <span className="text-white/40">→</span>
        <span className="bg-purple-500/30 px-3 py-1.5 rounded text-purple-300">push</span>
        <span className="text-xl">🎉</span>
      </div>
    </AbsoluteFill>
  );
};

// Narration script for "비전공자를 위한 파이썬 프로젝트 형상관리와 GitHub" video
// Total duration: ~5-6 minutes

export type NarrationSegment = {
  id: string;
  scene: string;
  text: string;
  startSec: number;
  durationSec: number;
};

export const narrationScript: NarrationSegment[] = [
  // Scene 1: Opening Hook (0:00 - 0:30)
  {
    id: "opening-1",
    scene: "opening",
    text: "혹시 이런 경험 있으신가요?",
    startSec: 0,
    durationSec: 2,
  },
  {
    id: "opening-2",
    scene: "opening",
    text: "report_최종.py, report_진짜최종.py, report_최종_수정본.py",
    startSec: 3,
    durationSec: 4,
  },
  {
    id: "opening-3",
    scene: "opening",
    text: "파일이 이렇게 늘어나서 어떤 게 진짜 최신 버전인지 헷갈리셨던 적 없으신가요?",
    startSec: 8,
    durationSec: 5,
  },
  {
    id: "opening-4",
    scene: "opening",
    text: "오늘 이 문제를 완벽하게 해결해 드리겠습니다.",
    startSec: 14,
    durationSec: 3,
  },

  // Scene 2: Introduction (0:30 - 1:00)
  {
    id: "intro-1",
    scene: "intro",
    text: "안녕하세요. 오늘 세미나에서는 비전공자도 쉽게 따라할 수 있는 Git과 GitHub 사용법을 알려드리겠습니다.",
    startSec: 20,
    durationSec: 7,
  },
  {
    id: "intro-2",
    scene: "intro",
    text: "먼저 형상관리가 무엇인지, 왜 필요한지 알아보고",
    startSec: 28,
    durationSec: 4,
  },
  {
    id: "intro-3",
    scene: "intro",
    text: "Git의 기본 명령어와 GitHub 사용법까지 차근차근 배워보겠습니다.",
    startSec: 33,
    durationSec: 5,
  },

  // Scene 3: The Problem (1:00 - 2:00)
  {
    id: "problem-1",
    scene: "problem",
    text: "파이썬 프로젝트를 하다 보면 코드를 자주 수정하게 됩니다.",
    startSec: 40,
    durationSec: 4,
  },
  {
    id: "problem-2",
    scene: "problem",
    text: "그런데 수정하기 전에 백업을 해두고 싶죠?",
    startSec: 45,
    durationSec: 3,
  },
  {
    id: "problem-3",
    scene: "problem",
    text: "그래서 파일을 복사해서 날짜를 붙이거나, 최종이라는 이름을 붙이게 됩니다.",
    startSec: 49,
    durationSec: 5,
  },
  {
    id: "problem-4",
    scene: "problem",
    text: "하지만 이렇게 하면 문제가 생깁니다.",
    startSec: 55,
    durationSec: 3,
  },
  {
    id: "problem-5",
    scene: "problem",
    text: "첫째, 어떤 파일이 정말 최신인지 알기 어렵습니다.",
    startSec: 59,
    durationSec: 3,
  },
  {
    id: "problem-6",
    scene: "problem",
    text: "둘째, 언제 무엇을 변경했는지 기억하기 힘듭니다.",
    startSec: 63,
    durationSec: 3,
  },
  {
    id: "problem-7",
    scene: "problem",
    text: "셋째, 여러 사람이 함께 작업하면 파일이 꼬여버립니다.",
    startSec: 67,
    durationSec: 4,
  },

  // Scene 4: What is Version Control (2:00 - 3:00)
  {
    id: "vcs-1",
    scene: "vcs",
    text: "형상관리, 영어로 Version Control은 이런 문제를 해결해주는 시스템입니다.",
    startSec: 73,
    durationSec: 5,
  },
  {
    id: "vcs-2",
    scene: "vcs",
    text: "쉽게 말해서 코드의 타임머신이라고 생각하시면 됩니다.",
    startSec: 79,
    durationSec: 4,
  },
  {
    id: "vcs-3",
    scene: "vcs",
    text: "모든 변경 사항이 자동으로 기록되고, 언제든지 과거의 특정 시점으로 돌아갈 수 있습니다.",
    startSec: 84,
    durationSec: 6,
  },
  {
    id: "vcs-4",
    scene: "vcs",
    text: "누가, 언제, 무엇을 변경했는지 모든 기록이 남습니다.",
    startSec: 91,
    durationSec: 4,
  },
  {
    id: "vcs-5",
    scene: "vcs",
    text: "그리고 여러 사람이 동시에 작업해도 충돌 없이 합칠 수 있습니다.",
    startSec: 96,
    durationSec: 5,
  },

  // Scene 5: What is Git (3:00 - 3:45)
  {
    id: "git-1",
    scene: "git",
    text: "Git은 현재 전 세계에서 가장 많이 사용되는 형상관리 도구입니다.",
    startSec: 103,
    durationSec: 5,
  },
  {
    id: "git-2",
    scene: "git",
    text: "리눅스를 만든 리누스 토발즈가 2005년에 개발했습니다.",
    startSec: 109,
    durationSec: 4,
  },
  {
    id: "git-3",
    scene: "git",
    text: "Git을 사용하면 파일 하나만 유지하면서도 모든 버전을 관리할 수 있습니다.",
    startSec: 114,
    durationSec: 5,
  },
  {
    id: "git-4",
    scene: "git",
    text: "구글, 마이크로소프트, 네이버, 카카오 등 거의 모든 IT 기업에서 Git을 사용합니다.",
    startSec: 120,
    durationSec: 6,
  },

  // Scene 6: Git Benefits (3:45 - 4:15)
  {
    id: "benefits-1",
    scene: "benefits",
    text: "Git의 장점을 정리해 볼까요?",
    startSec: 128,
    durationSec: 2,
  },
  {
    id: "benefits-2",
    scene: "benefits",
    text: "첫째, 되돌리기가 가능합니다. 실수해도 언제든 이전 버전으로 복구할 수 있어요.",
    startSec: 131,
    durationSec: 5,
  },
  {
    id: "benefits-3",
    scene: "benefits",
    text: "둘째, 협업이 쉬워집니다. 여러 사람이 동시에 작업해도 문제없습니다.",
    startSec: 137,
    durationSec: 5,
  },
  {
    id: "benefits-4",
    scene: "benefits",
    text: "셋째, 모든 변경 기록이 남습니다. 누가 언제 무엇을 바꿨는지 추적할 수 있어요.",
    startSec: 143,
    durationSec: 5,
  },
  {
    id: "benefits-5",
    scene: "benefits",
    text: "넷째, 브랜치 기능으로 새로운 기능을 안전하게 실험할 수 있습니다.",
    startSec: 149,
    durationSec: 5,
  },

  // Scene 7: Git Commands (4:15 - 5:15)
  {
    id: "commands-1",
    scene: "commands",
    text: "이제 Git의 기본 명령어 다섯 가지를 알아보겠습니다.",
    startSec: 156,
    durationSec: 4,
  },
  {
    id: "commands-2",
    scene: "commands",
    text: "먼저 git init은 프로젝트 폴더에서 Git을 시작하는 명령어입니다.",
    startSec: 161,
    durationSec: 5,
  },
  {
    id: "commands-3",
    scene: "commands",
    text: "git add는 변경된 파일을 저장할 준비를 하는 명령어예요. 점을 붙이면 모든 파일이 선택됩니다.",
    startSec: 167,
    durationSec: 6,
  },
  {
    id: "commands-4",
    scene: "commands",
    text: "git commit은 준비된 변경사항을 실제로 저장합니다. 메시지를 함께 적어서 무엇을 변경했는지 기록해요.",
    startSec: 174,
    durationSec: 7,
  },
  {
    id: "commands-5",
    scene: "commands",
    text: "git push는 내 컴퓨터의 변경사항을 GitHub 같은 원격 저장소에 업로드합니다.",
    startSec: 182,
    durationSec: 6,
  },
  {
    id: "commands-6",
    scene: "commands",
    text: "git pull은 반대로 원격 저장소의 변경사항을 내 컴퓨터로 다운로드합니다.",
    startSec: 189,
    durationSec: 5,
  },
  {
    id: "commands-7",
    scene: "commands",
    text: "이 다섯 가지 명령어만 알면 기본적인 버전 관리가 가능합니다.",
    startSec: 195,
    durationSec: 4,
  },

  // Scene 8: GitHub (5:15 - 5:45)
  {
    id: "github-1",
    scene: "github",
    text: "GitHub는 Git 저장소를 온라인에서 관리할 수 있는 서비스입니다.",
    startSec: 201,
    durationSec: 5,
  },
  {
    id: "github-2",
    scene: "github",
    text: "전 세계 1억 명 이상의 개발자가 사용하는 세계 최대의 코드 호스팅 플랫폼이에요.",
    startSec: 207,
    durationSec: 5,
  },
  {
    id: "github-3",
    scene: "github",
    text: "GitHub를 사용하면 내 코드를 안전하게 백업하고, 다른 사람과 쉽게 공유할 수 있습니다.",
    startSec: 213,
    durationSec: 6,
  },
  {
    id: "github-4",
    scene: "github",
    text: "또한 포트폴리오로 활용할 수 있어서 취업 준비에도 도움이 됩니다.",
    startSec: 220,
    durationSec: 5,
  },

  // Scene 9: Getting Started (5:45 - 6:00)
  {
    id: "start-1",
    scene: "start",
    text: "자, 이제 시작할 준비가 되셨나요?",
    startSec: 227,
    durationSec: 3,
  },
  {
    id: "start-2",
    scene: "start",
    text: "오늘 세미나에서 Git 설치부터 GitHub에 첫 번째 프로젝트 올리기까지 함께 해보겠습니다.",
    startSec: 231,
    durationSec: 6,
  },
  {
    id: "start-3",
    scene: "start",
    text: "비전공자도 충분히 할 수 있습니다. 함께 시작해볼까요?",
    startSec: 238,
    durationSec: 4,
  },
];

// Calculate total duration
export const TOTAL_DURATION_SEC = 245; // ~4 minutes 5 seconds for intro
export const FPS = 30;
export const TOTAL_DURATION_FRAMES = TOTAL_DURATION_SEC * FPS;

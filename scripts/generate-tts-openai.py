#!/usr/bin/env python3
"""
TTS Generation Script using OpenAI TTS
Run: python scripts/generate-tts-openai.py

Requires:
- pip install requests python-dotenv
- .env file with OPENAI_API_KEY
"""

import os
from pathlib import Path
from dotenv import load_dotenv
import requests

# Load .env file from project root
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "audio"

# OpenAI TTS voices (2024):
# Best quality: marin, cedar
# Others: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse
VOICE = "coral"  # coral is more energetic

# Model options:
# - tts-1: faster, lower quality
# - tts-1-hd: slower, higher quality
# - gpt-4o-mini-tts: newest, supports instructions for voice control
MODEL = "gpt-4o-mini-tts"

# Speed: 0.25 to 4.0 (default 1.0)
SPEED = 1.15

# Voice instructions (only works with gpt-4o-mini-tts)
INSTRUCTIONS = "친근하고 에너지 넘치는 유튜버 스타일로 말해주세요. 세미나 발표자처럼 열정적이고 명확하게 발음해주세요."

# Narration script - Korean phonetics for English words
narration_script = [
    # Opening
    {"id": "opening-1", "text": "혹시 이런 경험 있으신가요?"},
    {"id": "opening-2", "text": "리포트 최종 점 파이, 리포트 진짜 최종 점 파이, 리포트 최종 수정본 점 파이"},
    {"id": "opening-3", "text": "파일이 이렇게 늘어나서 어떤 게 진짜 최신 버전인지 헷갈리셨던 적 없으신가요?"},
    {"id": "opening-4", "text": "오늘 이 문제를 완벽하게 해결해 드리겠습니다."},

    # Introduction
    {"id": "intro-1", "text": "안녕하세요. 오늘 세미나에서는 비전공자도 쉽게 따라할 수 있는 깃과 깃허브 사용법을 알려드리겠습니다."},
    {"id": "intro-2", "text": "먼저 형상관리가 무엇인지, 왜 필요한지 알아보고"},
    {"id": "intro-3", "text": "깃의 기본 명령어와 깃허브 사용법까지 차근차근 배워보겠습니다."},

    # Problem
    {"id": "problem-1", "text": "파이썬 프로젝트를 하다 보면 코드를 자주 수정하게 됩니다."},
    {"id": "problem-2", "text": "그런데 수정하기 전에 백업을 해두고 싶죠?"},
    {"id": "problem-3", "text": "그래서 파일을 복사해서 날짜를 붙이거나, 최종이라는 이름을 붙이게 됩니다."},
    {"id": "problem-4", "text": "하지만 이렇게 하면 문제가 생깁니다."},
    {"id": "problem-5", "text": "첫째, 어떤 파일이 정말 최신인지 알기 어렵습니다."},
    {"id": "problem-6", "text": "둘째, 언제 무엇을 변경했는지 기억하기 힘듭니다."},
    {"id": "problem-7", "text": "셋째, 여러 사람이 함께 작업하면 파일이 꼬여버립니다."},

    # Version Control
    {"id": "vcs-1", "text": "형상관리, 영어로 버전 컨트롤은 이런 문제를 해결해주는 시스템입니다."},
    {"id": "vcs-2", "text": "쉽게 말해서 코드의 타임머신이라고 생각하시면 됩니다."},
    {"id": "vcs-3", "text": "모든 변경 사항이 자동으로 기록되고, 언제든지 과거의 특정 시점으로 돌아갈 수 있습니다."},
    {"id": "vcs-4", "text": "누가, 언제, 무엇을 변경했는지 모든 기록이 남습니다."},
    {"id": "vcs-5", "text": "그리고 여러 사람이 동시에 작업해도 충돌 없이 합칠 수 있습니다."},

    # What is Git
    {"id": "git-1", "text": "깃은 현재 전 세계에서 가장 많이 사용되는 형상관리 도구입니다."},
    {"id": "git-2", "text": "리눅스를 만든 리누스 토발즈가 2005년에 개발했습니다."},
    {"id": "git-3", "text": "깃을 사용하면 파일 하나만 유지하면서도 모든 버전을 관리할 수 있습니다."},
    {"id": "git-4", "text": "구글, 마이크로소프트, 네이버, 카카오 등 거의 모든 IT 기업에서 깃을 사용합니다."},

    # Git Benefits
    {"id": "benefits-1", "text": "깃의 장점을 정리해 볼까요?"},
    {"id": "benefits-2", "text": "첫째, 되돌리기가 가능합니다. 실수해도 언제든 이전 버전으로 복구할 수 있어요."},
    {"id": "benefits-3", "text": "둘째, 협업이 쉬워집니다. 여러 사람이 동시에 작업해도 문제없습니다."},
    {"id": "benefits-4", "text": "셋째, 모든 변경 기록이 남습니다. 누가 언제 무엇을 바꿨는지 추적할 수 있어요."},
    {"id": "benefits-5", "text": "넷째, 브랜치 기능으로 새로운 기능을 안전하게 실험할 수 있습니다."},

    # Git Commands
    {"id": "commands-1", "text": "이제 깃의 기본 명령어 다섯 가지를 알아보겠습니다."},
    {"id": "commands-2", "text": "먼저 깃 이닛은 프로젝트 폴더에서 깃을 시작하는 명령어입니다."},
    {"id": "commands-3", "text": "깃 애드는 변경된 파일을 저장할 준비를 하는 명령어예요. 점을 붙이면 모든 파일이 선택됩니다."},
    {"id": "commands-4", "text": "깃 커밋은 준비된 변경사항을 실제로 저장합니다. 메시지를 함께 적어서 무엇을 변경했는지 기록해요."},
    {"id": "commands-5", "text": "깃 푸시는 내 컴퓨터의 변경사항을 깃허브 같은 원격 저장소에 업로드합니다."},
    {"id": "commands-6", "text": "깃 풀은 반대로 원격 저장소의 변경사항을 내 컴퓨터로 다운로드합니다."},
    {"id": "commands-7", "text": "이 다섯 가지 명령어만 알면 기본적인 버전 관리가 가능합니다."},

    # GitHub
    {"id": "github-1", "text": "깃허브는 깃 저장소를 온라인에서 관리할 수 있는 서비스입니다."},
    {"id": "github-2", "text": "전 세계 1억 명 이상의 개발자가 사용하는 세계 최대의 코드 호스팅 플랫폼이에요."},
    {"id": "github-3", "text": "깃허브를 사용하면 내 코드를 안전하게 백업하고, 다른 사람과 쉽게 공유할 수 있습니다."},

    # Getting Started
    {"id": "start-1", "text": "자, 이제 시작할 준비가 되셨나요?"},
    {"id": "start-2", "text": "오늘 세미나에서 깃 설치부터 깃허브에 첫 번째 프로젝트 올리기까지 함께 해보겠습니다."},
    {"id": "start-3", "text": "비전공자도 충분히 할 수 있습니다. 함께 시작해볼까요?"},
]


def generate_tts(segment: dict, api_key: str) -> str:
    """Generate TTS audio for a single segment using requests."""
    output_path = OUTPUT_DIR / f"{segment['id']}.mp3"

    payload = {
        "model": MODEL,
        "voice": VOICE,
        "input": segment["text"],
        "speed": SPEED,
    }

    # Add instructions for gpt-4o-mini-tts model
    if MODEL == "gpt-4o-mini-tts":
        payload["instructions"] = INSTRUCTIONS

    response = requests.post(
        "https://api.openai.com/v1/audio/speech",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=60,
    )

    if response.status_code != 200:
        raise Exception(f"API error {response.status_code}: {response.text}")

    with open(output_path, "wb") as f:
        f.write(response.content)

    return str(output_path)


def main():
    import sys
    print("[TTS] OpenAI TTS Generation", flush=True)
    print(f"Model: {MODEL}", flush=True)
    print(f"Voice: {VOICE}", flush=True)
    print(f"Output: {OUTPUT_DIR}\n", flush=True)

    # Check API key
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("[ERROR] OPENAI_API_KEY environment variable not set", flush=True)
        print(f"Checked .env at: {env_path}", flush=True)
        print("\nCreate .env file with:", flush=True)
        print("  OPENAI_API_KEY=sk-...", flush=True)
        return

    print(f"API Key: {api_key[:20]}...", flush=True)

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Generate all audio files
    success_count = 0
    fail_count = 0
    total = len(narration_script)

    for i, segment in enumerate(narration_script):
        try:
            generate_tts(segment, api_key)
            print(f"[OK] [{i+1}/{total}] {segment['id']}.mp3", flush=True)
            success_count += 1
        except Exception as e:
            print(f"[FAIL] [{i+1}/{total}] {segment['id']} - {e}", flush=True)
            fail_count += 1

    print(f"\n[COMPLETE] Generated {success_count}/{total} audio files", flush=True)
    if fail_count > 0:
        print(f"[WARNING] Failed: {fail_count} files", flush=True)

    print("\nNext steps:", flush=True)
    print("1. Run: python scripts/analyze-audio.py", flush=True)
    print("2. Update audioSegments timing in Composition.tsx", flush=True)
    print("3. Preview: npm run dev", flush=True)


if __name__ == "__main__":
    main()

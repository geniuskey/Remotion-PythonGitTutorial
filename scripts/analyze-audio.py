import os
import subprocess
import json

# Audio files in order (matching the audioSegments array)
audio_order = [
    # Opening
    "opening-1", "opening-2", "opening-3", "opening-4",
    # Introduction
    "intro-1", "intro-2", "intro-3",
    # Problem
    "problem-1", "problem-2", "problem-3", "problem-4", "problem-5", "problem-6", "problem-7",
    # Version Control
    "vcs-1", "vcs-2", "vcs-3", "vcs-4", "vcs-5",
    # What is Git
    "git-1", "git-2", "git-3", "git-4",
    # Git Benefits
    "benefits-1", "benefits-2", "benefits-3", "benefits-4", "benefits-5",
    # Git Commands
    "commands-1", "commands-2", "commands-3", "commands-4", "commands-5", "commands-6", "commands-7",
    # GitHub
    "github-1", "github-2", "github-3",
    # Outro
    "start-1", "start-2", "start-3",
]

audio_dir = os.path.join(os.path.dirname(__file__), "..", "public", "audio")

def get_audio_duration(filepath):
    """Get audio duration using ffprobe"""
    cmd = [
        'ffprobe', '-v', 'quiet', '-print_format', 'json',
        '-show_format', filepath
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        return float(data['format']['duration'])
    return None

# Gap between audio segments (in seconds)
GAP_BETWEEN_AUDIO = 0.5  # 0.5 second gap between each audio

# Starting time
current_time = 0.5  # Start at 0.5 seconds

print("// Auto-generated audio segments with proper timing")
print("// Based on actual audio file durations")
print("const audioSegments = [")

for audio_id in audio_order:
    filepath = os.path.join(audio_dir, f"{audio_id}.mp3")
    if os.path.exists(filepath):
        duration = get_audio_duration(filepath)
        if duration:
            print(f'  {{ id: "{audio_id}", startSec: {current_time:.1f} }},  // duration: {duration:.2f}s')
            current_time += duration + GAP_BETWEEN_AUDIO
        else:
            print(f'  // ERROR reading {audio_id}')
    else:
        print(f'  // MISSING: {audio_id}.mp3')

print("];")
print(f"\n// Total duration: {current_time:.1f} seconds ({int(current_time * 30)} frames at 30fps)")

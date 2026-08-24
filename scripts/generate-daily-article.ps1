$ErrorActionPreference = "Stop"

$projectDir = "C:\Users\kumeu\dev\NEXT SPARK"
$claudeExe = "C:\Users\kumeu\AppData\Roaming\npm\claude.cmd"
$promptPath = Join-Path $PSScriptRoot "daily-article-prompt.txt"
$logDir = Join-Path $projectDir "logs"

if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir | Out-Null
}

Set-Location $projectDir

$prompt = Get-Content -Raw -Encoding utf8 $promptPath
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$logFile = Join-Path $logDir "article-$timestamp.log"

& $claudeExe -p $prompt --permission-mode acceptEdits --allowedTools "Read" "Glob" "Grep" "Write" "Bash" *>&1 |
    Tee-Object -FilePath $logFile

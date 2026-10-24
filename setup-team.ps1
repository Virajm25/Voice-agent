# Straveda Voice: one-command local setup for Windows (PowerShell). Requires Docker Desktop running.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function New-Secret($bytes = 32) {
    $b = New-Object byte[] $bytes
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b)
    -join ($b | ForEach-Object { $_.ToString("x2") })
}

docker info *> $null
if ($LASTEXITCODE -ne 0) { throw "Docker is not running. Start Docker Desktop and try again." }

if (-not (Test-Path ".env")) {
    $text = Get-Content "team.env.example" -Raw
    $text = $text.Replace("straveda__GENERATE_SHORT__", "straveda" + (New-Secret 6))
    while ($text.Contains("__GENERATE__")) {
        $i = $text.IndexOf("__GENERATE__")
        $text = $text.Remove($i, 12).Insert($i, (New-Secret 32))
    }
    [System.IO.File]::WriteAllText("$PWD\.env", $text)
    Write-Host "Created .env with fresh secrets."
} else {
    Write-Host ".env already exists, keeping it."
}

docker compose -f docker-compose.yaml -f docker-compose.straveda.yaml up -d --build
if ($LASTEXITCODE -ne 0) { throw "docker compose failed." }

Write-Host ""
Write-Host "Straveda Voice is starting (first start takes a few minutes)."
Write-Host "Open http://localhost:3010 once the 'api' container shows (healthy) in: docker ps"

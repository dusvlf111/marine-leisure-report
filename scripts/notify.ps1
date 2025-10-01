# Discord Notification PowerShell Script
# Usage: .\notify.ps1 -Type "task" -TaskNumber "9.2" -TaskName "Image Optimization Complete"

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("task", "test", "fix", "parent")]
    [string]$Type,
    
    [Parameter(Mandatory=$true)]
    [string]$TaskNumber,
    
    [Parameter(Mandatory=$true)]
    [string]$TaskName,
    
    [string]$Status = "success",
    
    [string]$ErrorDesc = ""
)

# Read DISCORD_WEBHOOK_URL from .env file
$envPath = Join-Path $PSScriptRoot "..\\.env"
$webhookUrl = $null

if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Encoding UTF8
    foreach ($line in $envContent) {
        if ($line -match "^DISCORD_WEBHOOK_URL=(.+)$") {
            $webhookUrl = $matches[1].Trim('"')
            break
        }
    }
}

if (-not $webhookUrl) {
    Write-Host "WARNING: DISCORD_WEBHOOK_URL not found. Check .env file in project root." -ForegroundColor Yellow
    exit 1
}

# Current time
$currentTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Get Git information
try {
    $commitHash = git log -1 --pretty=format:"%h" 2>$null
    $branch = git branch --show-current 2>$null
} catch {
    $commitHash = "N/A"
    $branch = "N/A"
}

# Generate message
$message = ""
switch ($Type) {
    "task" {
        $message = "CHECK **Task Complete**`n`n**Work:** $TaskNumber - $TaskName`n**Commit:** ``$commitHash```n**Time:** $currentTime"
    }
    "test" {
        $emoji = if ($Status -eq "success") { "CHECK" } else { "CROSS" }
        $statusText = if ($Status -eq "success") { "Success" } else { "Failed" }
        $message = "TEST **Test Complete**`n`n**Work:** $TaskNumber - Test Execution`n**Result:** $emoji $statusText`n**Time:** $currentTime"
    }
    "fix" {
        $message = "WRENCH **Error Fix Complete**`n`n**Work:** $TaskNumber`n**Issue:** $ErrorDesc`n**Time:** $currentTime"
    }
    "parent" {
        $message = "PARTY **Parent Task Complete**`n`n**Work:** $TaskNumber - $TaskName`n**Branch:** $branch`n**Time:** $currentTime`n**Status:** Push Complete"
    }
}

# Send message to Discord webhook
$body = @{
    content = $message
} | ConvertTo-Json -Depth 10

try {
    $headers = @{
        "Content-Type" = "application/json"
    }
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $body -Headers $headers
    Write-Host "SUCCESS: Discord notification sent" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Discord notification failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
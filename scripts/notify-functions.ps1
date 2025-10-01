# Discord Notification Functions - PowerShell
# Add to PowerShell profile or execute directly

# Set script path
$scriptPath = Join-Path $PSScriptRoot "notify.ps1"

# Task completion notification
function notify_task {
    param(
        [Parameter(Mandatory=$true)]
        [string]$TaskNumber,
        
        [Parameter(Mandatory=$true)]
        [string]$TaskName
    )
    
    & $scriptPath -Type "task" -TaskNumber $TaskNumber -TaskName $TaskName
}

# Test completion notification
function notify_test {
    param(
        [Parameter(Mandatory=$true)]
        [string]$TaskNumber,
        
        [Parameter(Mandatory=$true)]
        [ValidateSet("success", "failure")]
        [string]$Status
    )
    
    & $scriptPath -Type "test" -TaskNumber $TaskNumber -TaskName "Test Execution" -Status $Status
}

# Error fix notification
function notify_fix {
    param(
        [Parameter(Mandatory=$true)]
        [string]$TaskNumber,
        
        [Parameter(Mandatory=$true)]
        [string]$ErrorDesc
    )
    
    & $scriptPath -Type "fix" -TaskNumber $TaskNumber -TaskName "Error Fix" -ErrorDesc $ErrorDesc
}

# Parent task completion notification
function notify_parent_task {
    param(
        [Parameter(Mandatory=$true)]
        [string]$TaskNumber,
        
        [Parameter(Mandatory=$true)]
        [string]$TaskName
    )
    
    & $scriptPath -Type "parent" -TaskNumber $TaskNumber -TaskName $TaskName
}

# Usage guide
Write-Host "Discord notification functions loaded:" -ForegroundColor Green
Write-Host "  notify_task '9.2' 'Image Optimization Complete'" -ForegroundColor Cyan
Write-Host "  notify_test '9.2' 'success'" -ForegroundColor Cyan
Write-Host "  notify_fix '9.2' 'Test Error Fixed'" -ForegroundColor Cyan
Write-Host "  notify_parent_task '9.0' 'Performance Optimization Complete'" -ForegroundColor Cyan
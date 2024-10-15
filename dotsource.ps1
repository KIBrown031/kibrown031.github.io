
function calprompt {
# #requires -modules @{ModuleName="PSCalendar";ModuleVersion="1.10.0"}

<#
  .SYNOPSIS
  Monthly Calendar.

  .DESCRIPTION
  The calendar is placed in the upper right of the screen.
#>

  # https://jdhitsolutions.com/blog/powershell/7212/adding-a-powershell-profile-calendar/

  # $PSDefaultParameterValues["*-*calendar:Highlightdate"]="1/18","1/8","1/16"

  #define a buffercell fill
  $fill = [system.management.automation.host.buffercell]::new(" ",$host.ui.RawUI.BackgroundColor,$host.ui.RawUI.BackgroundColor,"complete")
 
  #define a rectangle with an upper left corner X distance from the edge
  $left =$host.ui.RawUI.WindowSize.width - 42

  #need to adjust positioning based on buffer size of the console
  #is the cursor beyond the window size, ie have we scrolled down?
    if ($host.UI.RawUI.CursorPosition.Y -gt $host.UI.RawUI.WindowSize.Height) {
        $top = $host.ui.RawUI.CursorPosition.Y - $host.UI.RawUI.WindowSize.Height
    }
    else {
        $top = 0
    }
  #    System.Management.Automation.Host.Rectangle new(int left, int top, int right, int bottom)
  $r = [System.Management.Automation.Host.Rectangle]::new($left, 0, $host.ui.rawui.windowsize.width,$top+10)

  #clear the area for the calendar display
  $host.ui.rawui.SetBufferContents($r,$fill)

  #show the calendar in the upper right corner of the console
  $pos = [system.management.automation.host.coordinates]::new($left,0)
  Show-Calendar -Position $pos

  "PS $($executionContext.SessionState.Path.CurrentLocation)$('>' * ($nestedPromptLevel + 1)) ";
}


################################################################################################
################################################################################################
################################################################################################


<#
A helper function to format the display so that everything aligns properly.
The HeadLength is the length of the 'header' like 'System load'
#>

#This will be the longest string I have to accomodate
#$longest = "IPV4 address for $($if.InterfaceAlias)".length

function _display {
    param([object]$value,[int]$headlength,[int]$max =$longest)
    $len = ($max - $headlength)+2
    "{0}{1}" -f (' '*$len),$value
}


################################################################################################
################################################################################################
################################################################################################


function htmlpage {
    [CmdletBinding()]
    Param(
        [parameter(ValueFromPipeline=$true)]
        [string]$html
        )
    $html | ConvertTo-Html -fragment | Out-File .\result.html
    ii .\result.html
}


################################################################################################
################################################################################################
################################################################################################


function Get-HiddenRootFile {
    [cmdletbinding()]
    Param(
        [Parameter(Position = 0, Mandatory)]
        [ValidateNotNullOrEmpty()]
        [ValidateScript({ Test-Path $_ })]
        [ArgumentCompleter({ [System.Environment]::GetLogicalDrives() })]
        [string]$Path
    )

    Write-Verbose "Analyzing $Path"
    $measure = Get-ChildItem -Path $Path -File -Hidden -OutVariable files |
    Measure-Object -Property Length -Sum

    [PSCustomObject]@{
        PSTypeName = 'HiddenRootFile'
        Path       = (Convert-Path $Path)
        Count      = $files.Count
        Size       = $measure.Sum.ToString("N0")
        Files      = $Files
        ComputerName = [System.Environment]::MachineName
    }    
}



################################################################################################
################################################################################################
################################################################################################


function MyFunctions {
     
    Param
    (  
       [ArgumentCompleter({ Get-Command -Type Function | Where-Object { $_.ScriptBlock.File -eq "$prefix\iCloudDrive\csv\dotsource.ps1" } })] # | ForEach-Object Name })]
       # [ArgumentCompletions("A","B","C","D","E")]
       
       [string]$name
    )
    "MyFunction(s): $name"

}

# to test this out, call Invoke-Greeting and just hit TAB to show local user names



################################################################################################
################################################################################################
################################################################################################


function Invoke-Greeting {
    param (
        [ArgumentCompleter( {
                param ($Command, $Parameter, $WordToComplete, $CommandAst, $FakeBoundParams)

                Get-LocalUser | Where-Object { $_.Name -like "*$WordToComplete*" }
            })]
        [string] $userName
    )

    "Say hi to $userName"
}

# to test this out, call Invoke-Greeting and just hit TAB to show local user names


################################################################################################
################################################################################################
################################################################################################


$ControlPanelApplets = [ordered]@{
    "Add a Device wizard"                      = "$env:windir\System32\DevicePairingWizard.exe"
    "Add Hardware wizard"                      = "$env:windir\System32\hdwwiz.exe"
    "Add a Printer wizard"                     = "rundll32.exe shell32.dll,SHHelpShortcuts_RunDLL AddPrinter"
    "Administrative Tools"                     = "control.exe /name Microsoft.AdministrativeTools"
    "AutoPlay"                                 = "control.exe /name Microsoft.AutoPlay"
    "Backup and Restore"                       = "control.exe /name Microsoft.BackupAndRestoreCenter"
    "BitLocker Drive Encryption"               = "control.exe /name Microsoft.BitLockerDriveEncryption"
    "Color and Appearance"                     = "explorer shell:::{ED834ED6-4B5A-4bfe-8F11-A626DCB6A921} -Microsoft.Personalization\pageColorization"
    "Color Management"                         = "control.exe /name Microsoft.ColorManagement"
    "Credential Manager"                       = "control.exe /name Microsoft.CredentialManager"
    "Date and Time"                            = "control.exe /name Microsoft.DateAndTime"
    "Default Programs"                         = "control.exe /name Microsoft.DefaultPrograms"
    "Desktop Background"                       = "explorer shell:::{ED834ED6-4B5A-4bfe-8F11-A626DCB6A921} -Microsoft.Personalization\pageWallpaper"
    "Desktop Icon Settings"                    = "rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0"
    "Device Manager"                           = "control.exe /name Microsoft.DeviceManager"
    "Devices and Printers"                     = "control.exe /name Microsoft.DevicesAndPrinters"
    "Ease of Access Center"                    = "control.exe /name Microsoft.EaseOfAccessCenter"
    "File Explorer Options"                    = "control.exe /name Microsoft.FolderOptions"
    "File History"                             = "control.exe /name Microsoft.FileHistory"
    "Fonts"                                    = "control.exe /name Microsoft.Fonts"
    "Game Controllers"                         = "control.exe /name Microsoft.GameControllers"
    "Get Programs"                             = "control.exe /name Microsoft.GetPrograms"
    "HomeGroup"                                = "control.exe /name Microsoft.HomeGroup"
    "Indexing Options"                         = "control.exe /name Microsoft.IndexingOptions"
    "Infrared"                                 = "control.exe /name Microsoft.Infrared"
    "Internet Properties"                      = "control.exe /name Microsoft.InternetOptions"
    "iSCSI Initiator"                          = "control.exe /name Microsoft.iSCSIInitiator"
    "Keyboard"                                 = "control.exe /name Microsoft.Keyboard"
    "Language"                                 = "control.exe /name Microsoft.Language"
    "Mouse Properties"                         = "control.exe /name Microsoft.Mouse"
    "Network and Sharing Center"               = "control.exe /name Microsoft.NetworkAndSharingCenter"
    "Network Connections"                      = "control.exe ncpa.cpl"
    "Network Setup Wizard"                     = "control.exe netsetup.cpl"
    "Notification Area Icons"                  = "explorer shell:::{05d7b0f4-2121-4eff-bf6b-ed3f69b894d9}"
    "ODBC Data Source Administrator"           = "control.exe odbccp32.cpl"
    "Offline Files"                            = "control.exe /name Microsoft.OfflineFiles"
    "Performance Options"                      = "$env:windir\system32\SystemPropertiesPerformance.exe"
    "Personalization"                          = "explorer shell:::{ED834ED6-4B5A-4bfe-8F11-A626DCB6A921}"
    "Phone and Modem"                          = "control.exe /name Microsoft.PhoneAndModem"
    "Power Options"                            = "control.exe /name Microsoft.PowerOptions"
    "Presentation Settings"                    = "$env:windir\system32\PresentationSettings.exe"
    "Programs and Features"                    = "control.exe /name Microsoft.ProgramsAndFeatures"
    "Recovery"                                 = "control.exe /name Microsoft.Recovery"
    "Region"                                   = "control.exe /name Microsoft.RegionAndLanguage"
    "RemoteApp and Desktop Connections"        = "control.exe /name Microsoft.RemoteAppAndDesktopConnections"
    "Scanners and Cameras"                     = "control.exe /name Microsoft.ScannersAndCameras"
    "Screen Saver Settings"                    = "rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,1"
    "Security and Maintenance"                 = "control.exe /name Microsoft.ActionCenter"
    "Set Associations"                         = "control.exe /name Microsoft.DefaultPrograms /page pageFileAssoc"
    "Set Default Programs"                     = "control.exe /name Microsoft.DefaultPrograms /page pageDefaultProgram"
    "Set Program Access and Computer Defaults" = "rundll32.exe shell32.dll,Control_RunDLL appwiz.cpl,,3"
    "Sound"                                    = "control.exe /name Microsoft.Sound"
    "Speech Recognition"                       = "control.exe /name Microsoft.SpeechRecognition"
    "Storage Spaces"                           = "control.exe /name Microsoft.StorageSpaces"
    "Sync Center"                              = "control.exe /name Microsoft.SyncCenter"
    "System"                                   = "control.exe /name Microsoft.System"
    "System Icons"                             = "explorer shell:::{05d7b0f4-2121-4eff-bf6b-ed3f69b894d9} \SystemIcons,,0"
    "System Properties"                        = "$env:windir\System32\SystemPropertiesComputerName.exe"
    "Tablet PC Settings"                       = "control.exe /name Microsoft.TabletPCSettings"
    "Text to Speech"                           = "control.exe /name Microsoft.TextToSpeech"
    "User Accounts"                            = "netplwiz"
    "Windows Defender Antivirus"               = "$env:ProgramFiles\Windows Defender\MSASCui.exe"
    "Windows Defender Firewall"                = "control.exe /name Microsoft.WindowsFirewall"
    "Windows Features"                         = "$env:windir\System32\OptionalFeatures.exe"
    "Windows Mobility Center"                  = "control.exe /name Microsoft.MobilityCenter"
    "Windows To Go"                            = "$env:windir\System32\pwcreator.exe"
    "Work Folders"                             = "$env:windir\System32\WorkFolders.exe"
}

function Start-ControlPanelApplet {
    [CmdletBinding()]
    param
    (
        [string[]]
        $Name
    )

    foreach ($Applet in $Name) {
        cmd /c $ControlPanelApplets.$Applet
    }
}

Register-ArgumentCompleter -CommandName Start-ControlPanelApplet -ParameterName Name -ScriptBlock {
    param ($CommandName, $ParameterName, $WordToComplete, $CommandAst, $FakeBoundParameter)

    $Keys = $ControlPanelApplets.Keys

    foreach ($Key in $Keys) {
        if ($Key -Match $WordToComplete) {
            [System.Management.Automation.CompletionResult]::new(
                "'$Key'",
                $Key,
                "ParameterValue",
                ($Key)
            )
        }
    }
}

Set-Alias -Name cpl -Value Start-ControlPanelApplet




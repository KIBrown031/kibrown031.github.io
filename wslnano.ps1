# requires -version 5.1

#launch the nono text editor from a WSL installation like Ubuntu
# or install the Windows version https://sourceforge.net/projects/nano-for-windows/
# or https://sourceforge.net/projects/micro-for-windows/
# https://micro-editor.github.io/

if ($IsWindows -OR ($PSEdition -eq 'desktop')) {

    #test if there is a default WSL installation
    $WslTest = ((wsl -l).split()).where({$_.length -gt 1}) -contains "(Default)"
    If ( -Not $WslTest) {
        Write-Warning "These commands require a WSL installation"
        Return
    }

    # a helper function to convert a Windows path to the WSL equivalent
    Function ConvertTo-WSLPath {
        [cmdletbinding()]
        [outputtype("String")]

        Param(
            [Parameter(Position = 0, Mandatory, HelpMessage = "Enter a Windows file system path")]
            [ValidateNotNullorEmpty()]
            [string]$Path
        )

        Write-Verbose "[$($myinvocation.mycommand)] Starting $($myinvocation.mycommand)"
        Write-Verbose "[$($myinvocation.mycommand)] Converting $Path to a filesystem path"
        $cPath = Convert-Path -Path $Path
        Write-Verbose "[$($myinvocation.mycommand)] Converted to $cpath"

        $file = Split-Path -Path $cpath -Leaf
        $dir = Split-Path -Path $cPath -Parent
        $folder = $dir.Substring(3)
        "/mnt/{0}/{1}/{2}" -f $dir[0].tostring().ToLower(), $folder.replace("\", "/"), $file

        Write-Verbose "[$($myinvocation.mycommand)] Ending $($myinvocation.mycommand)"
    }

    #launch the nano editor from the WSL installation
    Function Invoke-Nano {
        [CmdletBinding()]
        [outputtype("none")]
        [alias("nano")]

        Param(
            [Parameter(Position = 0, HelpMessage = "Specify a text file path.")]
            [ValidatenotNullorEmpty()]
            [ValidateScript({ Test-Path $_ })]
            [string]$Path
        )
        Write-Verbose "[$($myinvocation.mycommand)] Starting $($myinvocation.mycommand)"
        [string]$cmd = "wsl --exec nano"
        if ($Path) {
            Write-Verbose "[$($myinvocation.mycommand)] Convert $Path"
            $wslPath = ConvertTo-WSLPath -Path $Path
            $cmd += " $wslPath"

        }
        Write-Verbose "[$($myinvocation.mycommand)] Using command expression $cmd"
        #convert to a scriptblock
        $sb = [scriptblock]::Create($cmd)

        Write-Verbose "[$($myinvocation.mycommand)] Launch nano from the WSL installation"
        Invoke-Command -ScriptBlock $sb
        Write-Verbose "[$($myinvocation.mycommand)] Ending $($myinvocation.mycommand)"
    }
}
Else {
    Write-Warning "These commands require a Windows platform"
}

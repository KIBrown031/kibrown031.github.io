#requires -version 5.1 #requires -module Storage,CimCmdlets

#the hush file to disable running this script. The file
#doesn't have to have any content. It simply needs to exist.
$hushpath = Join-Path -Path $home -ChildPath ".hushlogin"



# define a temporary tracking file.
$trackPath = Join-Path -path $env:TEMP -ChildPath pswelcome.tmp

# Uncomment this code if you want to use a tracking file

#If the file is less than 24 hours old then skip running this script

$AlreadyRun = $False

<#
if (Test-Path -path $trackPath) {
    $f = Get-Item -path $trackPath
    $ts = New-TimeSpan -Start $f.CreationTime -End (Get-Date)
    if ($ts.TotalHours -le 24) {
        $AlreadyRun = $True
    }
}
#>



if ((Test-Path -Path $hushpath) -OR $AlreadyRun) {
    #skip running the welcome code
}
else {
    if ($PSEdition -eq 'Desktop') {
        $psname = "Windows PowerShell"
        $psosbuild = $PSVersionTable.BuildVersion
    }
    else {
        $psname = "PowerShell"
        $psosbuild = $PSVersionTable.os
    }

    #Wed Oct 13 08:13:45 EDT 2021
    $welcomeDate = Get-Date -Format "ddd MMM dd hh:mm:ss"

    #get the timezone
    $tz = Get-Timezone #[System.TimeZone]::CurrentTimeZone
    if ($tz.IsDaylightSavingTime((Get-Date))) {
        $tzNameString = $tz.DaylightName
    }
    else {
        $tzNameString = $tz.StandardName
    }

    #my hack at creating a time zone abbreviation since there is no built-in
    #way that I can find to get this information. This may not work properly
    #for non-US timezones
    $tzName = ($tznamestring.split() | ForEach-Object {$_[0]}) -join ""


    [string]$drives =""
    $drives = Get-PSDrive | 
              Where-Object { $_.name.Length -eq 1 -AND $_.used -gt 0 -AND $_.free -gt 0 } | 
                            foreach { "   {0}:\ USED: {1:d3}   FREE: {2:d3}`n" -f $($_.name), [int]($($_.used)/1Gb), [int]($($_.free)/1Gb) }
    
    

    <#
    #Get Drive C usage
    $c = Get-Volume -DriveLetter C
    $cused = $c.size - $c.SizeRemaining
    if ( $cused ) { $cusage = "{0:p2} of {1:n0}GB" -f ($cused / $c.size), ($c.size / 1GB) }

	#Get Drive D usage
    $d = Get-Volume -DriveLetter D
    $dused = $d.size - $d.SizeRemaining
    if ( $dused ) { $dusage = "{0:p2} of {1:n0}GB" -f ($dused / $d.size), ($d.size / 1GB) }

	#Get Drive F usage
    $f = Get-Volume -DriveLetter F
    $fused = $f.size - $f.SizeRemaining
    if ( $fused ) { $fusage = "{0:p2} of {1:n0}GB" -f ($fused / $f.size), ($f.size / 1GB) }

	#Get Drive M usage
    $m = Get-Volume -DriveLetter M
    $mused = $m.size - $m.SizeRemaining
    if ( $mused ) { $musage = "{0:p2} of {1:n0}GB" -f ($mused / $m.size), ($m.size / 1GB) }
    #>


    #get network adapter and IP
    #filter out Hyper-V adapters and the Loopback
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.addressState -eq 'preferred' -AND $_.InterfaceAlias -notmatch "vEthernet|Loopback" } -outvariable if).IPAddress

    #only get the properties I need to use for memory information
    $os = Get-CimInstance -ClassName win32_operatingsystem -Property TotalVisibleMemorySize, FreePhysicalMemory
    $memUsed = $os.TotalVisibleMemorySize - $os.FreePhysicalMemory
    $memUsage = "{0:p}" -f ($memUsed / $os.TotalVisibleMemorySize)

    #get system performance counters
    $sysPerf = Get-CimInstance -ClassName Win32_PerfFormattedData_PerfOS_System -Property Processes, ProcessorQueueLength

    #get pagefile information
    $pagefile = Get-CimInstance -ClassName Win32_PageFileUsage -Property CurrentUsage,AllocatedBaseSize
    $swap = "{0:p}" -f ($pagefile.CurrentUsage/$pagefile.AllocatedBaseSize)

    <#
    A helper function to format the display so that everything aligns properly.
    The HeadLength is the length of the 'header' like 'System load'
    #>

    #This will be the longest string I have to accomodate
    $longest = "IPV4 address for $($if.InterfaceAlias)".length
    function _display {
        param([object]$value,[int]$headlength,[int]$max =$longest)
        $len = ($max - $headlength)+2
        "{0}{1}" -f (' '*$len),$value
    }

    #build the display here-string inserting the calculated variables
    $out = @"

Welcome to $psname $($PSVersionTable.PSVersion) [$psosbuild]

    * Documentation:  https://docs.microsoft.com/powershell/
    * Management:     https://powershellgallery.com
    * Support:        https://powershell.org
    * Hicks:          https://jdhitsolutions.com/blog/powershell
    * Hicks:          https://jdhitsolutions.com/blog/scripting/8666/friday-fun-powershell-console-editing/ 
    * Hicks:          https://buttondown.email/behind-the-powershell-pipeline/archive/
    * PSScriptTools   https://github.com/jdhitsolutions/PSScriptTools
    * More:           https://devblogs.microsoft.com/powershell-community/
    * More:           https://devblogs.microsoft.com/powershell-community/mastering-the-steppable-pipeline/
    * One:            https://powershell.one
    * Real Estate:    https://sdat.dat.maryland.gov/realproperty/Pages/default.aspx

System Information as of $welcomeDate $tzName $((Get-Date).year)

    System load:$(_display -value $sysPerf.ProcessorQueueLength -headlength 11)
    Processes:$(_display -value $sysPerf.Processes -headlength 9 )
    Users logged in:$(_display -value $(((quser).count-1)) -headlength 15)
    Drives (GigaBytes):`n $(_display -value ($drives -join '') -headlength 0 -max -2)
    Memory Usage:$(_display -value $memUsage -headlength 12 )
    Swap usage:$(_display -value $swap -headlength 10)
    Public IP:$(_display -value $((Invoke-WebRequest -uri "http://ifconfig.me/ip").Content) -headlength 9)
    IPV4 address for $($if.InterfaceAlias):$(_display -value ($IP -join ' <> ') -headlength $longest)
    
    
"@


# This message is shown once a day. To disable it please create the $hushpath file.

    Clear-Host
    #display the welcome text and also send it to the temporary tracking file
    $out | Tee-Object -FilePath $trackPath
}

###
$work_path = (pwd)

foreach($arg in ($args | ? { Test-Path -Path $_ } | % { Resolve-Path -Path $_ })) {
    $work_path = $arg
    break
}

##
$repos_path = $work_path
$root = [System.IO.Path]::GetPathRoot($repos_path)

while($repos_path -ne $root) {
    $svn_path = [System.IO.Path]::Combine($repos_path, '.svn')

    if((Test-Path -Path $svn_path)) {
        break
    } else {
        $repos_path = [System.IO.Path]::GetDirectoryName($repos_path)
    }
}

if($repos_path -eq $root) {
    '{0} is not SVN working copy.' -f $work_path

    return
}

###
$tree = @{}

###
foreach($line in ((svn status $repos_path) | ? { $_ -match '^\w' })){
    if($line -match '^(.).....\s+(.+)') {
        $mark = $Matches[1]
        $rpath = $Matches[2]
        $owner = [System.IO.Path]::GetDirectoryName($rpath)
        $basename = [System.IO.Path]::GetFileName($rpath)

        if(-not $tree.ContainsKey($owner)){
            $tree.Add($owner, [System.Collections.ArrayList]::new()) | Out-Null
        }

        $tree[$owner].Add(@{ Mark = $mark; Name = $basename }) | Out-Null
    }
}

###
$indent = '        '
$texts = [System.Text.StringBuilder]::new()

foreach($key in ($tree.Keys | ? { $_ -ne '' } | Sort-Object)){
    ##
    $text = ('{0}({1})' -f $indent, $key)
    $texts.AppendLine($text) | Out-Null

    foreach($entry in ($tree[$key] | Sort-Object)){
        ##
        $bytelen = ($entry.Name -replace '[^\u0000-\u00FF]','..').Length
        $shift = if($bytelen -lt 60){
            60 - $bytelen
        } else {
            2
        }
        $mod = switch($entry.Mark) {
            'A' { 'êVãK' }
            'M' { 'ïœçX' }
            'D' { 'çÌèú' }
            default { 'ïœçX' }
        }

        $text = ('{0}{1}{2}({3})' -f $indent, $entry.Name, [String]::new(' ', $shift), $mod)
        $texts.AppendLine($text) | Out-Null
    }
}

$text = $texts.ToString()

if([System.String]::IsNullOrWhiteSpace($text)) {
    '{0} is not modified.' -f $repos_path
}

Set-Clipboard -Value $text

'{0} is modified, copy contents.' -f $repos_path

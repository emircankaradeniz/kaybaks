$timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$outputRoot = 'D:\projects\kaybaks\kaybaks-site\artifacts\site-screenshots'
$outputDir = Join-Path $outputRoot $timestamp
$zipPath = "$outputDir.zip"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$routes = @(
  @{ Name = '01-ana-sayfa'; Url = 'http://localhost:3000/' }
  @{ Name = '02-kurumsal'; Url = 'http://localhost:3000/kurumsal' }
  @{ Name = '03-urunler'; Url = 'http://localhost:3000/urunler' }
  @{ Name = '04-sektorel-cozumler'; Url = 'http://localhost:3000/sektorel-cozumler' }
  @{ Name = '05-uretim-kalite'; Url = 'http://localhost:3000/uretim-kalite' }
  @{ Name = '06-iletisim'; Url = 'http://localhost:3000/iletisim' }
  @{ Name = '07-urun-oluklu-mukavva-levha'; Url = 'http://localhost:3000/urunler/oluklu-mukavva-levha' }
  @{ Name = '08-urun-normal-kutu'; Url = 'http://localhost:3000/urunler/normal-kutu' }
  @{ Name = '09-urun-teleskopik-kutu'; Url = 'http://localhost:3000/urunler/teleskopik-kutu' }
  @{ Name = '10-urun-kalip-kesim-kutu'; Url = 'http://localhost:3000/urunler/kalip-kesim-kutu' }
  @{ Name = '11-urun-ondule'; Url = 'http://localhost:3000/urunler/ondule' }
  @{ Name = '12-urun-demonte-mobilya-kutulari'; Url = 'http://localhost:3000/urunler/demonte-mobilya-kutulari' }
  @{ Name = '13-urun-ozel-olcu-kutu'; Url = 'http://localhost:3000/urunler/ozel-olcu-kutu' }
  @{ Name = '14-urun-ozel-tasarim-ambalaj'; Url = 'http://localhost:3000/urunler/ozel-tasarim-ambalaj' }
  @{ Name = '15-404'; Url = 'http://localhost:3000/bulunamayan-sayfa' }
)

foreach ($route in $routes) {
  $targetFile = Join-Path $outputDir ($route.Name + '.png')
  npx playwright screenshot --browser chromium --full-page --viewport-size '1440,1600' --wait-for-timeout 1800 $route.Url $targetFile | Out-Null
}

Compress-Archive -Path (Join-Path $outputDir '*') -DestinationPath $zipPath -Force

Write-Output $outputDir
Write-Output $zipPath

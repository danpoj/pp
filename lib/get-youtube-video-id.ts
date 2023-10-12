export function getYouTubeVideoId(url: string | null) {
  if (!url) throw new Error('유효하지 않은 유튜브 링크입니다.')
  if (!url.startsWith('https://www.youtube.com')) throw new Error('유효하지 않은 유튜브 링크입니다.')

  const urlObj = new URL(url)

  const videoId = urlObj.searchParams.get('v')

  return videoId
}

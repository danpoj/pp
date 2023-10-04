export function getYouTubeVideoId(url: string | null) {
  if (!url) return null

  const urlObj = new URL(url)
  const videoId = urlObj.searchParams.get('v')

  return videoId
}

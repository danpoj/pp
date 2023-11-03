export function getYouTubeVideoId(url: string | null) {
  if (!url) throw new Error('유효하지 않은 유튜브 링크입니다.')

  url = url.includes('youtube.com/shorts') ? url.split('?')[0].replace('shorts/', 'watch?v=') : url

  const urlInstance = new URL(url)

  const { hostname, pathname, searchParams } = urlInstance

  if (!(hostname.includes('youtube') || hostname.includes('youtu.be'))) {
    throw new Error('유효하지 않은 유튜브 링크입니다.')
  }

  if (hostname.includes('youtube')) {
    return searchParams.get('v')
  }

  return pathname.split('/')[1]
}

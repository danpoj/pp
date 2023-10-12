'use client'

import dynamic from 'next/dynamic'
import { YouTubePlayerProps } from 'react-player/youtube'

const YoutubePlayer = dynamic(() => import('react-player/youtube').then((YoutubePlayer) => YoutubePlayer), {
  ssr: false,
})

export const Player = (props: YouTubePlayerProps) => {
  return <YoutubePlayer {...props} controls />
}

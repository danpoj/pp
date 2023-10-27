import { ClipboardWithLink } from '@/components/clipboard-with-link'
import ImageResult from '@/components/image-result'
import ItemCommentDeleteButton from '@/components/item-comment-delete-button'
import ItemCommentForm from '@/components/item-comment-form'
import PlayConfetti from '@/components/play-confetti'
import { Player } from '@/components/player'
import RankingButton from '@/components/ranking-button'
import { Separator } from '@/components/ui/separator'
import { getSession } from '@/lib/auth'
import db from '@/lib/db'

import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
dayjs.extend(relativeTime)
dayjs.locale('ko')

type Props = {
  params: {
    cupId: string
    itemId: string
  }
}

export async function generateMetadata(
  { params: { itemId } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const item = await db.item.findUnique({
    where: {
      id: itemId,
    },
  })

  if (!item) return

  return {
    title: `PingPing 이상형 월드컵 이미지 결과페이지 | ${item.description || ''}`,
    description: item.description ?? 'PingPing 이상형 월드컵 이미지 결과페이지',

    openGraph: {
      title: `PingPing 이상형 월드컵 이미지 결과페이지 | ${item.description || ''}`,
      description: item.description ?? 'PingPing 이상형 월드컵 이미지 결과페이지',
      url: `https://www.pingping.online/cup/${item.cupId}/${item.id}`,
      siteName: 'PingPing',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: item.url.includes('youtube') ? item.videoThumbnail! : item.url,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `PingPing 이상형 월드컵 이미지 결과페이지 | ${item.description || ''}`,
      description: item.description ?? 'PingPing 이상형 월드컵 이미지 결과페이지',
      images: [item.url.includes('youtube') ? item.videoThumbnail! : item.url],
    },
  }
}

export default async function Page({ params }: Props) {
  const image = await db.item.findUnique({
    where: {
      id: params.itemId,
    },
    include: {
      cup: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      },
    },
  })

  const session = await getSession()

  if (!image) return null

  return (
    <section className='h-full max-w-6xl mx-auto p-2 flex flex-col lg:flex-row lg:justify-center lg:items-center lg:gap-6 relative'>
      <PlayConfetti />
      {image.cup.type === 'IMAGE' ? (
        <ImageResult width={image.width!} height={image.height!} src={image.url!} description={image.description} />
      ) : (
        <div className='relative w-full h-[24rem] shrink-0 lg:shrink lg:h-full rounded-xl overflow-hidden'>
          <Player url={image.url} width='100%' height='100%' />
        </div>
      )}

      <div className='mt-4 h-full lg:w-[30rem] lg:shrink-0 pr-2'>
        <h2 className='text-2xl font-extrabold text-primary/80 tracking-tight'>{image.cup.title}</h2>
        <h3 className='text-sm font-semiboid text-primary/70 my-2'>{image.cup.description}</h3>
        <div className='flex gap-2 font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent mt-8 mb-6'>
          <span>우승: {image.winCount}회</span>
          <span>/</span>
          <span>플레이수: {image.cup.playCount}회</span>
          <span>=</span>
          <span>
            승률: {image.cup.playCount === 0 ? '0.0' : ((image.winCount / image.cup.playCount) * 100).toFixed(1)}%
          </span>
        </div>
        <Separator className='my-4' />
        <ClipboardWithLink
          path={`/cup/${image.cupId}/${image.id}`}
          title='현재 페이지 공유하기'
          className='lg:flex lg:items-center lg:gap-2 lg:w-full lg:justify-end mb-2'
        />
        <ClipboardWithLink
          path={`/cup/${image.cupId}`}
          title='월드컵 공유하기'
          className='lg:flex lg:items-center lg:gap-2 lg:w-full lg:justify-end'
        />
        <RankingButton cupID={image.cupId} />
        <Separator className='my-4' />

        <div className='w-full'>
          <ItemCommentForm session={session} itemId={image.id} />

          <div className='flex flex-col mt-6 gap-2 w-full h-full lg:max-h-[16rem] overflow-scroll pr-6 pb-20 lg:pb-10'>
            {image.comments.length === 0 && <p className='text-xs tracking-tight'>등록된 댓글이 없습니다</p>}

            {image.comments.map((comment) => (
              <div key={comment.id} className='flex flex-col gap-2 break-words'>
                <div className='flex gap-1 items-center'>
                  <Image
                    src={comment.user.image!}
                    alt='user profile image'
                    width={40}
                    height={40}
                    className='w-6 h-6 rounded-full bg-white'
                  />
                  <span className='font-bold text-xs bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 w-fit bg-clip-text text-transparent'>
                    @{comment.user.nickname}
                  </span>
                  <span className='text-xs text-primary/60 tracking-tighter'>{dayjs(comment.createdAt).fromNow()}</span>

                  {session?.user.id === comment.userId && (
                    <ItemCommentDeleteButton itemId={comment.itemId} commentId={comment.id} />
                  )}
                </div>
                <span className='text-xs w-full'>{comment.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { ClipboardWithLink } from '@/components/clipboard-with-link'
// import ImageCommentForm from '@/components/image-comment-form'
import ImageResult from '@/components/image-result'
import PlayConfetti from '@/components/play-confetti'
import { Player } from '@/components/player'
import RankingButton from '@/components/ranking-button'
import { Separator } from '@/components/ui/separator'
import db from '@/lib/db'

import dayjs from 'dayjs'

type Props = {
  params: {
    cupId: string
    itemId: string
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
      },
    },
  })

  if (!image) return null

  return (
    <div className='h-full max-w-6xl mx-auto p-2 flex flex-col lg:flex-row lg:justify-center lg:items-center lg:gap-6 relative'>
      <PlayConfetti />
      {image.cup.type === 'IMAGE' ? (
        <ImageResult src={image.publicId!} description={image.description} />
      ) : (
        <div className='relative w-full h-[24rem] shrink-0 lg:shrink lg:h-full rounded-xl overflow-hidden'>
          <Player url={image.url} width='100%' height='100%' />
        </div>
      )}

      <div className='my-4 h-full lg:w-[30rem] lg:shrink-0 pr-2'>
        <h1 className='text-2xl font-extrabold text-primary/80 tracking-tight'>{image.cup.title}</h1>
        <p className='text-sm font-semiboid text-primary/70 my-2'>{image.cup.description}</p>
        <div className='flex gap-4 font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent'>
          <span>우승: {image.winCount}회</span>
          <span>플레이수: {image.cup.playCount}회</span>
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
          {/* <ImageCommentForm imageId={image.id} /> */}

          <div className='flex flex-col mt-6 gap-2 w-full h-full lg:max-h-[20rem] overflow-scroll pr-6 mb-10'>
            {image.comments.length === 0 && <p className='text-xs tracking-tight'>등록된 댓글이 없습니다</p>}

            {image.comments.map((comment) => (
              <div key={comment.id} className='flex flex-col gap-2 break-words'>
                <div className='flex gap-4'>
                  <span className='font-bold text-xs bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 w-fit bg-clip-text text-transparent'>
                    {/* @{comment.username} */}
                  </span>
                  <span className='text-xs text-primary/40 tracking-tighter'>
                    {dayjs(comment.createdAt).format('YYYY.M.D')}
                  </span>
                </div>
                <span className='text-xs w-full'>{comment.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

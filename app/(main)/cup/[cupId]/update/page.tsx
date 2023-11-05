import CupUpdateForm from '@/components/cup-update-form'
import { getSession } from '@/lib/auth'
import { getCupUpdatePage } from '@/lib/query'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'

type Props = {
  params: {
    cupId: string
  }
}

export default async function Page({ params: { cupId } }: Props) {
  const session = await getSession()

  if (!session) redirect('/')

  const cup = await getCupUpdatePage({
    userId: session.user.id,
    cupId,
  })

  if (!cup) notFound()

  return (
    <div className='h-full max-w-5xl mx-auto p-2 pt-10'>
      <span className='text-2xl font-semibold block mb-10'>월드컵 수정하기</span>
      <Image
        unoptimized
        src={cup.thumbnail}
        alt='cup thumbnail image'
        width={cup.thumbnailWidth}
        height={cup.thumbnailHeight}
        className='max-w-[20rem] max-h-[26rem] object-cover self-center mx-auto rounded-xl shadow-xl border mb-14'
      />
      <CupUpdateForm cup={cup} />
    </div>
  )
}

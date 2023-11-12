import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Monitor, MonitorDown, MoreVertical, Share } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='h-full w-full flex justify-center pt-10 px-2'>
      <Tabs defaultValue='ios' className='w-full max-w-[400px]'>
        <TabsList className='w-full grid grid-cols-3'>
          <TabsTrigger value='ios'>
            <Image
              unoptimized
              src='/brand-logos/apple.svg'
              width={20}
              height={20}
              alt='android brand logo'
              className='mr-0.5'
            />
            Ios
          </TabsTrigger>

          <TabsTrigger value='android'>
            <Image
              unoptimized
              src='/brand-logos/android.svg'
              width={20}
              height={20}
              alt='android brand logo'
              className='mr-0.5'
            />
            Android
          </TabsTrigger>

          <TabsTrigger value='pc'>
            <Monitor className='w-4 h-4 mr-1' />
            Pc
          </TabsTrigger>
        </TabsList>
        <TabsContent value='ios' className='p-2 space-y-12'>
          <h2 className='text-xl flex'>
            <Image
              unoptimized
              src='/brand-logos/apple.svg'
              width={20}
              height={20}
              alt='android brand logo'
              className='mr-0.5'
            />
            IOS
          </h2>

          <div>
            <Separator className='mb-6' />
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>1.</span> 공유하기 <Share className='w-4 h-4' /> 클릭
            </p>
            <Image
              unoptimized
              src='/ios/ios-step-1.png'
              alt='ios install first step'
              width={200}
              height={600}
              className='w-full shadow-lg rounded-lg'
            />
          </div>

          <Separator />

          <div>
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>2.</span> 홈 화면에 추가
            </p>
            <Image
              unoptimized
              src='/ios/ios-step-2.png'
              alt='ios install second step'
              width={200}
              height={600}
              className='w-full shadow-lg rounded-lg'
            />
          </div>

          <Separator />

          <div>
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>3.</span> 추가
            </p>
            <Image
              unoptimized
              src='/ios/ios-step-3.png'
              alt='ios install third step'
              width={200}
              height={600}
              className='w-full shadow-lg rounded-lg'
            />
          </div>

          <Separator />

          <div className='pb-20'>
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>4.</span> 설치 완료
            </p>
            <Image
              unoptimized
              src='/ios/ios-step-4.png'
              alt='ios install fourth step'
              width={160}
              height={160}
              className='shadow-lg rounded-lg'
            />
          </div>
        </TabsContent>

        <TabsContent value='android' className='p-2 space-y-12'>
          <h2 className='text-xl flex'>
            <Image
              unoptimized
              src='/brand-logos/android.svg'
              width={20}
              height={20}
              alt='android brand logo'
              className='mr-0.5'
            />
            Android
          </h2>

          <div>
            <Separator className='mb-6' />
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>1.</span> 우측 상단의 <MoreVertical /> 클릭 후, <u>앱 설치</u> 버튼
              클릭
            </p>
            <Image
              unoptimized
              src='/android/android-step-1.png'
              alt='ios install first step'
              width={200}
              height={600}
              className='w-full shadow-lg rounded-lg'
            />
          </div>

          <div className='pb-20'>
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>2.</span> 설치 완료
            </p>
            <Image
              unoptimized
              src='/ios/ios-step-4.png'
              alt='ios install fourth step'
              width={160}
              height={160}
              className='shadow-lg rounded-lg'
            />
          </div>
        </TabsContent>

        <TabsContent value='pc' className='p-2 space-y-12'>
          <h2 className='text-xl flex items-center'>
            <Monitor className='w-5 h-5 mr-1' />
            Pc
          </h2>

          <div>
            <Separator className='mb-6' />
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>1.</span> 브라우저 주소 탭 오른쪽 <MonitorDown className='w-4 h-4' />{' '}
              클릭하여 설치
            </p>
            <Image
              unoptimized
              src='/pc/pc-step-1.png'
              alt='ios install first step'
              width={200}
              height={600}
              className='w-full shadow-lg rounded-lg'
            />
          </div>

          <div className='pb-20'>
            <p className='flex gap-1 items-center mb-4'>
              <span className='text-2xl font-bold'>2.</span> 설치 완료
            </p>
            <Image
              unoptimized
              src='/ios/ios-step-4.png'
              alt='ios install fourth step'
              width={160}
              height={160}
              className='shadow-lg rounded-lg'
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

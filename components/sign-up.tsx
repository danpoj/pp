'use client'

import { GoogleIcon, KakaoIcon, NaverIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Loader from './loader'

export default function SignUp() {
  const [isGoogleLaoding, setIsGoogleLaoding] = useState(false)
  const [isKakaoLoading, setisKakaoLoading] = useState(false)
  const [isNaverLoading, setIsNaverLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsGoogleLaoding(true)

    try {
      await signIn('google')
    } catch (error) {
      console.log(error)
    } finally {
      setIsGoogleLaoding(false)
    }
  }

  const loginWithKakao = async () => {
    setisKakaoLoading(true)

    try {
      await signIn('kakao')
    } catch (error) {
      console.log(error)
    } finally {
      setisKakaoLoading(false)
    }
  }

  const loginWithNaver = async () => {
    setIsNaverLoading(true)

    try {
      await signIn('naver')
    } catch (error) {
      console.log(error)
    } finally {
      setIsNaverLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center gap-2 px-6 pt-10 pb-2'>
      <div className='flex flex-col items-center mb-10 gap-4'>
        <div className='flex font-bold text-lg'>
          <Loader size='sm' />
          <Link href='/' className='flex items-center justify-center mr-6 hover:text-primary/90'>
            ping
            <span className='bg-fancy text-transparent bg-clip-text'>Ping</span>
            <span className='ml-2'>회원가입</span>
          </Link>
        </div>
        <p className='text-sm text-center px-8 dark:brightness-75'>
          Ping<span className='bg-fancy text-transparent bg-clip-text font-bold'>Ping</span>은 나만의 이상형 월드컵을
          만들고 사용자들과 공유하는 공간이에요.
        </p>
        <p>
          랜덤 아바타와 아이디가 부여되어 <span className='font-bold underline text-blue-500'>익명</span>이 보장됩니다.
        </p>
      </div>
      <Button onClick={loginWithGoogle} isLoading={isGoogleLaoding} className='w-full h-11 font-bold'>
        {isGoogleLaoding ? null : <GoogleIcon className='w-5 h-5 mr-2' />}
        구글 회원가입
      </Button>

      <Button
        onClick={loginWithKakao}
        isLoading={isKakaoLoading}
        className='w-full h-11 bg-yellow-400 text-black hover:bg-yellow-400/80 font-bold'
      >
        {isKakaoLoading ? null : <KakaoIcon className='w-6 h-6 mr-2' />}
        카카오 회원가입
      </Button>

      {/* <Button
        onClick={loginWithNaver}
        isLoading={isNaverLoading}
        className='w-full h-11 bg-[#03c75a] text-black hover:bg-[#03c75a]/80 font-bold'
      >
        {isNaverLoading ? null : <NaverIcon className='w-7 h-7 mr-2 ' />}
        네이버 회원가입
      </Button> */}
    </div>
  )
}

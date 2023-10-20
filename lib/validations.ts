import { z } from 'zod'

export const createImageSchema = z.object({
  images: z
    .object({
      secure_url: z.string().min(1),
      width: z.number(),
      height: z.number(),
      public_id: z.string().min(1),
    })
    .array()
    .min(8, { message: '8개 이상의 이미지가 필요합니다' })
    .max(100, { message: '이미지 개수는 100개를 넘을 수 없습니다' }),
  type: z.enum(['IMAGE', 'VIDEO']),
  title: z.string().min(1, { message: '제목을 입력해주세요' }).max(50, {
    message: '제목은 50글자를 넘길 수 없습니다',
  }),
  description: z.string().min(1, { message: '설명을 입력해주세요' }).max(400, {
    message: '설명은 400글자를 넘길 수 없습니다',
  }),
})

export const createVideoSchema = z.object({
  links: z
    .object({
      videoUrl: z.string().min(1, { message: '비디오 링크가 없습니다' }),
      imageUrl: z.string().min(1, { message: '비디오 썸네일 링크가 없습니다' }),
    })
    .array(),
  title: z.string().min(1, { message: '제목을 입력해주세요' }).max(50, {
    message: '제목은 50글자를 넘길 수 없습니다',
  }),
  description: z.string().min(1, { message: '설명을 입력해주세요' }).max(400, {
    message: '설명은 400글자를 넘길 수 없습니다',
  }),
})

export const titleSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요' }).max(50, {
    message: '제목은 50글자를 넘길 수 없습니다',
  }),
})

export const descriptionSchema = z.object({
  description: z.string().min(1, { message: '설명을 입력해주세요' }).max(400, {
    message: '설명은 400글자를 넘길 수 없습니다',
  }),
})

export const itemDescriptionSchema = z.object({
  description: z.string().max(40, { message: '40글자 이하의 설명을 작성해주세요' }),
})

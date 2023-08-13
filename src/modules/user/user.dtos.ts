import { z } from 'zod'
import { signUpSchema, signInSchema, verifySchema } from '@/user/Requests/UserRequest'

//DTOs Area
export type SignUpDTO = z.infer<typeof signUpSchema>
export type SignInDTO = z.infer<typeof signInSchema>
export type VerifyDTO = z.infer<typeof verifySchema>

export interface UserResultDTO {
    name: string
    email: string
    id: string
  }
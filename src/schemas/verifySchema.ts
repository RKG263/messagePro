import {z} from 'zod'

export const verifySchema=z.object({
  code:z.string().length(6,'verify code must be of 6 digit')
})
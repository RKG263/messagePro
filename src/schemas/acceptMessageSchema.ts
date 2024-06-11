import {z} from 'zod'

export const AcceptMessageSchema=z.object({
  isAcceptingMessages:z.boolean()
})
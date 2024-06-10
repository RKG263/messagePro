
import {z} from 'zod'

export const messageSchema=z.object({
 content:z.string().min(5,{message:"message must contain 5 character"}).max(300,{message:"content no more than 300 character"})
})
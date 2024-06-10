import {z} from 'zod'

export const usernameValidation=z
.string()
.min(2,"username must be atleast two character")
.max(20,"username must not more than 20 character")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain any special character")

export const signUpSchema=z.object({
  username:usernameValidation,
  email:z.string().email({message:"Invalid email address"}),
  password:z.string().min(6,{message:"password must contain 6 character"})
})
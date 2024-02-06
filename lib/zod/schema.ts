import {z} from "zod"

export const PostCreationSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters in length").max(50, "Title can't be longer than 50 characters"),
    content: z.string().min(10, "Content must be at least 10 characters in length")
})


export type TPostCreationSchema = z.infer<typeof PostCreationSchema>
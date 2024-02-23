import {z} from "zod"
import { checkProfanity } from "../utils"

export const PostCreationSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters in length").max(50, "Title can't be longer than 50 characters"),
    content: z.string().min(150, "Content must be at least 150 characters in length"),
    tags: z.array(z.string()).max(5,"You can't have more than 5 tags").nullish()
})
.refine((data) =>  data.tags ? data.tags.length > 0 : true, {
    message: "Enter at least one tag",
    path: ["tags"]
})
.refine((data) =>  data.tags ? !checkProfanity(data.tags) : true, {
    message: "Explicit language",
    path: ["tags"]
})
.refine((data) =>  data.content.replaceAll(" ", "").length >= 150, {
    message: "Content must be at least 150 characters in length",
    path: ["content"]
})



export type TPostCreationSchema = z.infer<typeof PostCreationSchema>
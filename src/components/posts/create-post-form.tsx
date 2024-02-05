"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { PostCreationSchema, TPostCreationSchema } from "../../../lib/zod/schema"
import { NewPost, getUser, insertPost } from "../../../lib/db/methods"
import Button from "@/components/reusable/Button"
import Input from "@/components/reusable/Input"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"



const CreatePostForm = () => {
    const {isLoading, user} = useKindeBrowserClient()
    const onSubmit = async (data: {title: string, content: string}) => {
        const res = await fetch("/api/createpost", {
            method: "POST",
            body: JSON.stringify({
                title: data.title,
                content: data.content
            })
        })

        const resData = await res.json()
        if(!res.ok) {
            alert("Sumbtitting failed")
            return 
        }

        if(resData.errors) {
            const errors = resData.errors;
            
            if(errors.title) {
                setError("title", {
                    type: "server",
                    message: errors.title
                })
            } else if(errors.content) {             
                setError("content", {
                    type: "server",
                    message: errors.content
                })
            } else {
                alert("Bruh")
            }
            return 
        }
        try {
            const currUser = (await getUser({kindeId: user!.id}))[0]
            await insertPost({authorId: +currUser.id, title: "", content: ""})
        } catch (error) {
            
        }
        reset()        
    }
    
    
    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting},
        reset,       
        setError
    } = useForm<TPostCreationSchema>({
        resolver: zodResolver(PostCreationSchema)
    })


    if(isLoading) return <div>Loading...</div>
    if(!user) return <div>No user</div>

    return(<section>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input placeholder="Title"  {...register("title")}  type={"text"} />
            {/* <input {...register("title")} placeholder="Title"  type="text" /> */}
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
            {/* <textarea {...register("content")} placeholder="Tell us something"  cols={30} rows={10}></textarea> */}
            <Input placeholder="Tell us something" cols={20} rows={10} {...register("content")} type={"textarea"} />
            {errors.content && <p className="text-red-600">{errors.content.message}</p>}
            <Button disabled={isSubmitting}>Creat{isSubmitting ? "ing..." : "e"}</Button>
        </form>
    </section>)
}

export default CreatePostForm
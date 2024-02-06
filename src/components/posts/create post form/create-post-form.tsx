"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { PostCreationSchema, TPostCreationSchema } from "../../../../lib/zod/schema"
import Button from "@/components/reusable/Button"
import Input from "@/components/reusable/Input"
import toast from 'react-hot-toast';

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import TagsInput from "./tags-input"
import ContentTooltip from "./tooltips"




export type FieldVal = {title: string, content: string}

const CreatePostForm = ({onSuccess,intialData}:{onSuccess: (data: FieldVal)  => Promise<{success: boolean, error?: string}>, intialData?: FieldVal}) => {
    
    const onSubmit = async (data: FieldVal) => {
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
        
        const submitRes = await onSuccess(data)
        if(!submitRes.success) {
            toast.error(submitRes.error ?? "Something went wrong");
        } else {
            toast.success('Post created');            
            reset();                   
        }
        
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
  
    return(<section>
        <TagsInput />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
     
            <div className="flex">
               <span id="tooltip-info"> hover</span>
            </div>
            <Tooltip clickable className="!bg-accent border-2 border-primary z-30" place="bottom"  anchorSelect="#tooltip-info">
                <ContentTooltip />
            </Tooltip>
            
            
            <Input defaultValue={intialData ? intialData.title : ""} placeholder="Title"  {...register("title")}  type={"text"} />            
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}            
            <Input defaultValue={intialData ? intialData.content : ""} placeholder="Enter raw markdown, hover on info icon to see supported elements" cols={20} rows={10} {...register("content")} type={"textarea"} />
            {errors.content && <p className="text-red-600">{errors.content.message}</p>}
            
            <Button disabled={isSubmitting}>Creat{isSubmitting ? "ing..." : "e"}</Button>
        </form>
    </section>)
}

export default CreatePostForm
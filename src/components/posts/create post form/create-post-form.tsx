"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { PostCreationSchema, TPostCreationSchema } from "../../../../lib/zod/schema"
import Button from "@/components/reusable/Button"
import Input from "@/components/reusable/Input"
import toast from 'react-hot-toast';
import { IoIosInformationCircle } from "react-icons/io";
import TagsInput from "./tags-input"
import ContentTooltip from "./tooltips"
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import { useRef } from "react"


export type FieldVal = {title: string, content: string}

const CreatePostForm = ({onSuccess,intialData}:{onSuccess: (data: FieldVal)  => Promise<{success: boolean, error?: string}>, intialData?: FieldVal}) => {
    const tagsRef = useRef<string[]>([])
    
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
        if(tagsRef.current.length > 0) {
            // do something if have tags
        }
        //const submitRes = await onSuccess(data)
        // if(!submitRes.success) {
        //     toast.error(submitRes.error ?? "Something went wrong");
        // } else {
        //     toast.success('Post created');            
        //     reset();                   
        // }
        
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
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-4">
                <legend className="text-lg font-semibold text-primary my-4">Title*</legend>
                <Input defaultValue={intialData ? intialData.title : ""} placeholder="Title"  {...register("title")}  type={"text"} />            
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}      
            </fieldset>
            <fieldset className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary">
                    <legend className="text-lg font-semibold">Content*</legend>                   
                    <Tooltip  placement="bottom" trigger={['click', "hover"]} overlay={<div>
                        <h2 className="text-white text-lg font-bold text-center py-2">Allowed elements</h2>
                        <ContentTooltip />
                    </div>}>
                        <span>
                            <IoIosInformationCircle size={20}/>
                        </span>
                    </Tooltip>
                </div>
                <Input defaultValue={intialData ? intialData.content : ""} placeholder="Enter raw markdown, hover on info icon to see supported elements" cols={20} rows={10} {...register("content")} type={"textarea"} />
                {errors.content && <p className="text-red-600">{errors.content.message}</p>}
            </fieldset>
            <fieldset className="flex flex-col gap-4">
                    <legend className="text-lg font-semibold text-primary my-4">Tags(optional)</legend>
                    <TagsInput tagsRef={tagsRef}/>                    
            </fieldset>
            <Button className="mt-10" disabled={isSubmitting}>Creat{isSubmitting ? "ing..." : "e"}</Button>
        </form>
    </section>)
}

export default CreatePostForm
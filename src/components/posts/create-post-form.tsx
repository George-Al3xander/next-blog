"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { PostCreationSchema, TPostCreationSchema } from "../../../lib/zod/schema"
import Button from "@/components/reusable/Button"
import Input from "@/components/reusable/Input"
import toast from 'react-hot-toast';
import { TagsInput } from "react-tag-input-component";
import { useEffect, useState } from "react"

const Example = () => {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    if(selected && selected.length > 3) {      
        setSelected(() => [selected[0],selected[1], selected[selected.length-1]])
    }
  },[selected])
  return (
    <div className="bg-accent">           
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        classNames={{input: "!bg-accent tags-enter-input"}}
        placeHolder="Enter tag and press enter...(optional)"
      />   
    </div>
  );
};



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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            <Input defaultValue={intialData ? intialData.title : ""} placeholder="Title"  {...register("title")}  type={"text"} />            
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}            
            <Example />
            <Input defaultValue={intialData ? intialData.content : ""} placeholder="Tell us something" cols={20} rows={10} {...register("content")} type={"textarea"} />
            {errors.content && <p className="text-red-600">{errors.content.message}</p>}
            
            <Button disabled={isSubmitting}>Creat{isSubmitting ? "ing..." : "e"}</Button>
        </form>
    </section>)
}

export default CreatePostForm
import { FC, HTMLInputTypeAttribute, ReactNode, TextareaHTMLAttributes, forwardRef } from "react"
import {VariantProps,cva} from "class-variance-authority"
import { cn } from "./utils"
import { TClassName } from "@/types"


type InputProps =  VariantProps <typeof inputVarians> & {
   type: "text" | "textarea",
   className? : TClassName,
   children?: ReactNode,
   cols?: number,
   rows?: number,
   placeholder?: string,
   defaultValue?: string,
   value?: string
}


const inputVarians = cva(
    "transition-all duration-200 rounded focus:outline-none",
    {variants: {
        variant: {
            default: "border-2 border-primary bg-accent focus:border-white",
            // outline: "text-primary border-2 border-primary disabled:text-primary disabled:bg-transparent",
            // icon: "flex gap-2 lg:gap-0 lg:flex-col justify-center items-center text-white group hover:tracking-widest disabled:bg-transparent disabled:tracking-normal disabled:text-white text-lg"
        },
        size: {
            default: "py-2 px-4",
            sm: "px-2 rounded-md"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
})



const Input : FC<InputProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((
    {className,type ,size,cols,rows,variant,children, ...props}, ref) => {
        if(type == "textarea") return <textarea cols={cols} rows={rows} ref={ref as any} className={cn(inputVarians({variant,size,className}))}  {...props} />

        return (<input  ref={ref as any} className={cn(inputVarians({variant,size,className}))}  {...props} />)
    }
)


export default Input
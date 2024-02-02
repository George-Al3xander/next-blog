import { ButtonHTMLAttributes, FC,forwardRef } from "react";
import {VariantProps,cva} from "class-variance-authority"
import { cn } from "./utils";
import { IconType } from "react-icons/lib";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps <typeof buttonVarians> & {
    Icon?: IconType
}

const buttonVarians = cva(
    "transition-all duration-200 rounded-3xl  hover:text-black hover:bg-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed",
    {variants: {
        variant: {
            default: "text-black bg-primary hover:opacity-60 uppercase ",
            outline: "text-primary border-2 border-primary disabled:text-primary disabled:bg-transparent",
            icon: "flex gap-2 lg:gap-0 lg:flex-col justify-center items-center text-white group hover:tracking-widest disabled:bg-transparent disabled:tracking-normal disabled:text-white text-lg"
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

const Button : FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((
    {className, size,variant,children,Icon, ...props}, ref) => (
    <button ref={ref} className={cn(buttonVarians({variant,size,className}))}  {...props}>
        {(variant == "icon" && Icon) && <Icon className="text-primary transition-all duration-200  group-hover:text-black group-disabled:text-primary"   size={35}/>}
        <span className={variant == "icon" ? "hidden md:block": ""}>
         {children}            
        </span>
    </button>
))



export default Button
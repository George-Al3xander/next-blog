"use client"
import { CgMenuRound } from "react-icons/cg";

import { ReactNode } from "react"



const AnimationWrapper = ({children}: {children: ReactNode}) => {


    return(<span className="fixed flex ">
        <CgMenuRound className="z-30" fill="var(--clr-primary)" size={35}/>
        {children}
    </span>)
}

export default AnimationWrapper
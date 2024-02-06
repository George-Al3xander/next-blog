import Link from "next/link"
import Logo from "../Logo"
import SidebarAvatar from "./sidebar/buttons/SideAvatar"
import { Suspense } from "react"




const Header = () => {

    return(<header className=" fixed right-0 p-4 z-10  w-[100%] top-0 bg-accent items-center  flex justify-between lg:justify-end lg:text-right">
        <Logo />       
        <SidebarAvatar header/>
            
    </header>)
}

export default Header
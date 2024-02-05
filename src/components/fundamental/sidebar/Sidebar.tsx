import { Suspense } from "react";
import SidebarAvatar from "./buttons/SideAvatar";
import SidebarHome from "./buttons/SideHome";
import SidebarCreate from "./buttons/SidebarCreate";
import SidebarSearch from "./buttons/SidebarSearch";
import { DialogDemo } from "@/components/ui/Diaolog";



const Sidebar = () => (<nav 
  className="
    border-primary
    bg-accent
    z-20
    px-4 
    py-4 
    flex 
    fixed
    justify-around
    mx-auto
    w-[90vw]
    bottom-10
    justify-centeri
    right-0
    left-0
    border-2
    lg:py-32 
    lg:flex-col 
    lg:justify-start
    lg:gap-4
    lg:bottom-0
    lg:max-w-[10vw] 
    lg:h-[100vh]    
    lg:border-0    
    lg:border-r-2 
    lg:mx-0   
  "
    >
    <SidebarHome />   
    <SidebarAvatar />  
    <SidebarSearch />       
    <SidebarCreate />    
</nav>)

export default Sidebar
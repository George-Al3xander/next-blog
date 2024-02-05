import Button from "@/components/reusable/Button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link";
import {IoAddCircleOutline  } from "react-icons/io5";




const SidebarCreate = async () => {
    const {isAuthenticated} = getKindeServerSession()
    const isLogged  = await isAuthenticated()

    return(<Link className="lg:mt-auto mx-auto" href={"/posts/create"}><Button  disabled={!isLogged} Icon={IoAddCircleOutline} variant={"icon"}>create</Button></Link>)
}

export default SidebarCreate
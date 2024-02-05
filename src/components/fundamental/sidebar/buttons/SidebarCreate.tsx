import Button from "@/components/reusable/Button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {IoAddCircleOutline  } from "react-icons/io5";




const SidebarCreate = async () => {
    const {isAuthenticated} = getKindeServerSession()
    const isLogged  = await isAuthenticated()

    return(<Button className="lg:mt-auto mx-auto" disabled={!isLogged} Icon={IoAddCircleOutline} variant={"icon"}>create</Button>)
}

export default SidebarCreate
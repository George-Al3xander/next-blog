import Button from "@/components/reusable/Button"
import { LoginLink, RegisterLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { IoLogIn } from "react-icons/io5";
import Image from "next/image"


const SidebarAvatar = async ({header}:{header?:  boolean}) => {
    const {isAuthenticated,getUser} = getKindeServerSession()
    const isLogged  = await isAuthenticated()
    const user = await getUser();  
    if(!isLogged) return  <>
    <Button className="hidden md:block">
        <LoginLink>Sign in</LoginLink>
    </Button>
    <Button className="hidden md:block">
        <RegisterLink>Sign up</RegisterLink>
    </Button>

    <LoginLink>
        <Button className="md:hidden" Icon={IoLogIn} variant={"icon"}>
            
        </Button>
    </LoginLink>
    </>

    return(<div className={`lg:mx-auto ${header ? "lg:hidden" : "hidden lg:block" }`}>
        {user?.picture ? 
        <Image 
        src={user.picture}
        width={50}
        height={50}
        alt={user.given_name + "'s profile picture"}
        />
        :
        <span className="flex justify-center items-center text-lg font-bold h-[50px] w-[50px]  rounded-full bg-primary text-black">
            <p className="uppercase">
                {user?.given_name && user.given_name.charAt(0)}
                {user?.family_name && user.family_name.charAt(0)}
            </p>
        </span>
        }
    </div>)
}

export default SidebarAvatar
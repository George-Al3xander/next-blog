
import CreatePostForm from "@/components/posts/create-post-form";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation"




const PostCreatePage = async () => {
    const {isAuthenticated} = await getKindeServerSession()
    const isLogged  = await isAuthenticated()

    if(!isLogged) {
        redirect("/")
    }

    return(<CreatePostForm />)    
}

export default PostCreatePage


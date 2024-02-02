import Link from "next/link"
import { NewPost, getPostAuthorInfo } from "../../../db/methods"
import moment from "moment"
import DisplayPostAuthor from "./GetPostAuthor"



const PostPreview =  ({title,id,createdAt,authorId,content}: NewPost) => {
 

    return(<section className="flex  flex-col-reverse lg:flex-row gap-4 text-white" key={"post-preview-"+id+title}>
        <div className="lg:max-w-[min-content] lg:text-right uppercase font-semibold flex lg:flex-col justify-between lg:justify-start gap-4">
            <h3 key={"title"} className="text-xl lg:text-3xl ">                
               {moment(createdAt).format(new Date().getFullYear() != new Date(createdAt).getFullYear() ? "D MMM YYYY" :  "D MMM")}               
            </h3>
            {/* <Link className="vertical-text text-xl lg:text-base opacity-50 text-nowrap" href={"/authors/"+author.id}><h4 >{author.name}</h4></Link> */}
            {<DisplayPostAuthor className="vertical-text text-xl lg:text-base opacity-50 text-nowrap" authorId={authorId} />}
        </div>

        <div className="flex items-start flex-col gap-4">
            <Link href={`/posts/${id}`}><h2 key={"date"} className="text-3xl font-bold text-primary hover:underline">{title}</h2></Link>
            <p className="flex flex-wrap"><span className="line-clamp-3">{content}</span><Link href={`/posts/${id}`}><span className="text-primary">...read more</span></Link></p>
            
        </div>
    </section>)
}

export default PostPreview
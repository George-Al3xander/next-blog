import { notFound } from "next/navigation"
import { getPost} from "../../../../lib/db/methods"
import moment from "moment"
import DisplayPostAuthor from "@/components/posts/get-post-author"
import { isCurrUserAuthor } from "../../../../lib/actions"
import DisplayMarkdown from "@/components/display-markdown"




export default async function SinglePostPage ({params: {postId}}: {params: {postId: string}}) {

    const post = await getPost(Number(postId))

    if(post.length == 0) notFound()

    const {authorId, id,content, title,createdAt} = post[0];    
    const isAuthor = await isCurrUserAuthor(authorId);

    return(<section  className="mx-auto" key={"post-page-"+id}>
        <div className="flex flex-col !m-0 pb-14 prose lg:prose-xl prose-p:text-white  prose-strong:font-extrabold prose-a:text-white">
            <h1 className="!m-0 !text-primary">{title}</h1>           
            <p className="flex flex-col opacity-30 !mb-0 ">
                <span>written by {<DisplayPostAuthor className="!no-underline hover:!underline" authorId={authorId} />}</span>
                <span>on {moment(createdAt).format("ll")}</span>
            </p>           
        </div>
        <DisplayMarkdown markdown={content!}/>
    </section>)
}
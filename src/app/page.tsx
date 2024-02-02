// import InfiniteScrollPosts from "@/components/posts/InfiniteScrollPosts";
// import { getPostsPagination } from "../../db/pagination";

import InfiniteScrollPosts from "@/components/posts/InfiniteScrollPosts";
import { getPostsAction } from "../../db/actions";
import PostPreview from "@/components/posts/PostPreview";
import { getPosts } from "../../db/methods";



//export const revalidate = 86400
export default async function  Home() {   
  const posts = await getPosts()
  return (<section>    
      <ul className="flex flex-col gap-[8rem]">
          {posts.map((post) => {
            return <PostPreview key={"post-preview-"+post.id} {...post}/>
          })}
      </ul>        
  </section>);
}

// import InfiniteScrollPosts from "@/components/posts/InfiniteScrollPosts";
// import { getPostsPagination } from "../../db/pagination";

import InfiniteScrollPosts from "@/components/posts/InfiniteScrollPosts";
import { getPostsAction } from "../../db/actions";
import PostPreview from "@/components/posts/PostPreview";
import { getPosts, getPostsCount, getPostsPagination } from "../../db/methods";



//export const revalidate = 86400
export default async function  Home() {   
  const posts = await  getPostsAction();
  const count = await getPostsCount()

  return (<section>    
      <ul className="flex flex-col gap-[8rem]">         
          <InfiniteScrollPosts postsLength={count} initialPosts={posts}/>
      </ul>        
  </section>);
}

import { getPostsAction } from "../../lib/db/actions";
import { getPostsCount} from "../../lib/db/methods";
import InfiniteScrollPosts from "@/components/posts/infinite-scroll-posts";



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

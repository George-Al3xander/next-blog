"use client"
import {useInView} from "react-intersection-observer"
import {  useEffect, useState } from "react"
import { NewPost } from "../../../db/methods"
import {PulseLoader} from "react-spinners"
import PostPreview from "./PostPreview";
import { getPostsAction } from "../../../db/actions";


export default function InfiniteScrollPosts ({initialPosts}: {initialPosts: NewPost[], postsLength: number}) {
  const [posts, setPosts] = useState<NewPost[]>(initialPosts);
  const [page,setPage] = useState<number>(1)
  const [ref, inView] = useInView();

  const  loadMorePosts = async () => {         
    const next = page + 1;    
    const newPosts = await getPostsAction(next)
    if(newPosts.length) {
      setPage(next);
      setPosts((prev) => [
        ...(prev.length ? prev : []),
        ...newPosts
      ])
    } 
  }


  useEffect(() => {
    if(inView) {
      loadMorePosts()
    }
  },[inView])

  return(<>
    {posts.map((post) => {
        return <PostPreview key={"post-preview-"+post.id} {...post}/>
    })}

    {posts.length < 6 ?   
      <div className="flex justify-center"  ref={ref}>
        <PulseLoader color="var(--clr-primary)"/>
      </div> 
      :
      null      
    }
  </>)
}
import Link from "next/link";
import { getPostAuthorInfo } from "../../../db/methods";
import { Suspense } from "react";

type Props = {authorId: number, className?: React.ComponentProps<'div'>['className']}


async function GetPostAuthor({authorId,className}: Props) {
    const author = await getPostAuthorInfo(authorId);
  
    return(<Link className={className} href={"/authors/"+authorId}>{author.name}</Link>)
    
}

export default async function DisplayPostAuthor ({authorId, className}: Props) {


    return(<Suspense fallback={<span className={className}>Loading...</span>}>
        <GetPostAuthor className={className} authorId={authorId} />
    </Suspense>)

}
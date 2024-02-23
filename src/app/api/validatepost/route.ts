import { NextResponse } from "next/server";
import { PostCreationSchema } from "../../../../lib/zod/schema";




export async function POST(request: Request) {
    
    const body: unknown | {tags: string[]} = await request.json();
    let zodErrs = {}   
    const res = PostCreationSchema.safeParse(body);
    if(!res.success) {
        res.error.issues.forEach((issue) => {
            zodErrs = {...zodErrs, [issue.path[0]]: issue.message}
        });
       
        return  NextResponse.json({errors: zodErrs})  

    }
    
    return  NextResponse.json({success: true}) ;
}
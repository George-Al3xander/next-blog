
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {eq} from "drizzle-orm";
import {NextResponse} from "next/server";
import { db } from "../../../../../lib/db";
import { users } from "../../../../../lib/db/schema";
import { insertUser } from "../../../../../lib/db/methods";



export async function GET() {
    const {getUser} = getKindeServerSession()
    const user = await getUser();
    if (!user || user == null || !user.id) {
        const errMsg = "something went wrong with authentication"
        //throw new Error(errMsg);
        return NextResponse.redirect(process.env.KINDE_SITE_URL!+`?errorMessage=${errMsg.replaceAll(" ", "+")}`);
        
    }
    //Think about making email field optional because of the different auth providers
    const dbUser = await db.select().from(users).where(eq(users.kindeId,user.id));
    
     if(!dbUser || dbUser.length == 0) {
         const {given_name,family_name,email,id} = user  
        await insertUser({name:`${given_name} ${family_name}`, email,kindeId: id})      
    } 
    return NextResponse.redirect(process.env.KINDE_SITE_URL!);
}
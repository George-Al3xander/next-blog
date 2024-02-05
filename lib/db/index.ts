import { Pool, neon } from '@neondatabase/serverless';



//Browser version
import { drizzle } from 'drizzle-orm/neon-serverless';
const pool = new Pool({ connectionString: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL! });
export const db = drizzle(pool)


// //Terminal commands version version
// import { drizzle } from 'drizzle-orm/neon-http';
// import {loadEnvConfig} from "@next/env"
// loadEnvConfig(process.cwd())
// const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
// export const db = drizzle(sql);

//import { migrate } from "drizzle-orm/neon-http/migrator";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { db } from ".."


async function main() {
    await migrate(db, {migrationsFolder: "./drizzle"})    
}

main()
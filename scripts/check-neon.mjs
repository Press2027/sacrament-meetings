import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing.");
  }

  const sql = neon(process.env.DATABASE_URL);

  const result = await sql`
    SELECT
      current_database() AS database_name,
      current_schema() AS schema_name,
      current_setting('search_path') AS search_path,
      to_regclass('public.meetings')::text AS meetings_table
  `;

  console.log("\n===== APPLICATION DATABASE =====");
  console.log(result[0]);

  if (result[0].meetings_table) {
    const count = await sql`
      SELECT COUNT(*)::int AS total
      FROM public.meetings
    `;

    console.log("Meeting records:", count[0].total);
  } else {
    console.log("The meetings table is missing from this connection.");
  }
}

main().catch((error) => {
  console.error("Database diagnostic failed:", error.message);
  process.exitCode = 1;
});

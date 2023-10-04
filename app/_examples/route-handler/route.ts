// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { getCookieData } from "@/utils/cookie";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookies = await getCookieData();
  // Create a Supabase client configured to use cookies
  const supabase = createRouteHandlerClient({ cookies });

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  const { data: todos } = await supabase.from("todos").select();

  return NextResponse.json(todos);
}

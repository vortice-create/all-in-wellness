import { createServerFn } from "@tanstack/react-start";
import type { Json } from "@/integrations/supabase/types";

// site_content has no public read policy; the server reads it for visitors.
export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.from("site_content").select("key, value");
    if (error) { console.error("site_content", error.message); return {} as Record<string, Json>; }
    return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<string, Json>;
  } catch (e) {
    console.error(e);
    return {} as Record<string, Json>;
  }
});

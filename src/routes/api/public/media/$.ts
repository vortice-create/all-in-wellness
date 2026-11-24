import { createFileRoute } from "@tanstack/react-router";

// Serves admin-uploaded photos from the private site-media bucket. The bucket has no public
// read policy; this handler reads server-side, limited to that one bucket and a safe path.
export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!/^[\w\-./]+$/.test(path) || path.includes("..")) return new Response("Not found", { status: 404 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("site-media").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, { headers: { "content-type": data.type || "image/jpeg", "cache-control": "public, max-age=31536000, immutable" } });
      },
    },
  },
});

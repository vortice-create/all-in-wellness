import { createFileRoute } from "@tanstack/react-router";

// Serves admin-uploaded photos from the private site-media bucket. Only files that are
// actually published in public site content are served; unreferenced uploads stay private.
export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const notFound = () => new Response("Not found", { status: 404 });
        const path = params._splat ?? "";
        if (!/^[\w\-./]+$/.test(path) || path.includes("..")) return notFound();
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: rows, error: rowsError } = await supabaseAdmin.from("site_content").select("value");
        if (rowsError) return notFound();
        const ref = `/api/public/media/${path}`;
        const published = (rows ?? []).some((r) => JSON.stringify(r.value).includes(JSON.stringify(ref).slice(1, -1) + '"'));
        if (!published) return notFound();
        const { data, error } = await supabaseAdmin.storage.from("site-media").download(path);
        if (error || !data || !data.type.startsWith("image/")) return notFound();
        return new Response(data, { headers: { "content-type": data.type, "cache-control": "public, max-age=3600" } });
      },
    },
  },
});

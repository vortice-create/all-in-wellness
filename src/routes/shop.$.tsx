import { createFileRoute, redirect } from "@tanstack/react-router";

// Old WordPress shop sub-paths (product and category pages) are still indexed by Google:
// /shop/anything -> /pricing (permanent 301). The server handler answers the request before
// any page renders, so the response is a real 301 with a Location header and the original
// query string is carried over.
export const Route = createFileRoute("/shop/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { search } = new URL(request.url);
        return new Response(null, {
          status: 301,
          headers: { location: `/pricing${search}`, "cache-control": "public, max-age=86400" },
        });
      },
    },
  },
  beforeLoad: () => {
    throw redirect({ to: "/pricing", statusCode: 301 });
  },
});

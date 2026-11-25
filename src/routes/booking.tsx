import { createFileRoute, redirect } from "@tanstack/react-router";

// Old WordPress address still indexed by Google: /booking -> /classes (permanent 301).
// The server handler answers the request before any page renders, so the response is a real
// 301 with a Location header and the original query string is carried over.
export const Route = createFileRoute("/booking")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { search } = new URL(request.url);
        return new Response(null, {
          status: 301,
          headers: { location: `/classes${search}`, "cache-control": "public, max-age=86400" },
        });
      },
    },
  },
  beforeLoad: () => {
    throw redirect({ to: "/classes", statusCode: 301 });
  },
});

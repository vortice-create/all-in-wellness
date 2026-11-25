<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Studio facts, prices and Glofox URLs live in src/lib/site.ts; pages and JSON-LD read from it so prices stay in one place.
- Shared marketing sections live in src/components/site/ui.tsx; header/footer are mounted once in __root.
- Contact form inserts into public.contact_submissions with anon/authenticated insert-only RLS that validates required fields, email format, and field lengths; no read access from the browser, so bypassing frontend validation cannot admit malformed messages.
- Accessibility target is WCAG 2.1 AA; run axe across all routes after UI changes — keeps the site ADA-defensible.
- Editable content: src/lib/content.ts holds bundled defaults; rows in public.site_content (admin-only writes via has_role) override per key, loaded once in the root loader and read with useContent(). Uploaded photos live in the private site-media bucket (no client read policy), served server-side via /api/public/media/* only when referenced in published site_content.

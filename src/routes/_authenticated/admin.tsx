import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus, ArrowUp, ArrowDown, Upload, RotateCcw, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useContent, contentQuery } from "@/hooks/use-content";
import { defaultContent, type ContentKey } from "@/lib/content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [
    { title: "Website dashboard | All In Health & Wellness" },
    { name: "description", content: "Edit prices, instructors, classes, FAQs and announcements on the All In website." },
    { property: "og:title", content: "Website dashboard | All In Health & Wellness" },
    { property: "og:description", content: "Edit prices, instructors, classes, FAQs and announcements on the All In website." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AdminPage,
});

type Field = { k: string; label: string; type?: "text" | "textarea" | "image" | "bool" };
type Item = Record<string, unknown>;

const planFields: Field[] = [{ k: "name", label: "Name" }, { k: "price", label: "Price" }, { k: "note", label: "Short note" }, { k: "detail", label: "Extra detail (optional)", type: "textarea" }, { k: "cta", label: "Button label" }, { k: "href", label: "Button link" }];

const sections: { key: ContentKey; tab: string; title: string; fields: Field[]; single?: boolean }[] = [
  { key: "announcement", tab: "banner", title: "Announcement banner (top of every page)", single: true, fields: [{ k: "enabled", label: "Show banner", type: "bool" }, { k: "text", label: "Message" }, { k: "link", label: "Link (optional)" }] },
  { key: "introOffer", tab: "pricing", title: "Intro offer", single: true, fields: planFields },
  { key: "packages", tab: "pricing", title: "Class packages", fields: planFields },
  { key: "memberships", tab: "pricing", title: "Memberships", fields: [{ k: "name", label: "Name" }, { k: "freq", label: "Classes per month" }, { k: "monthly", label: "Monthly price" }, { k: "annual", label: "Annual-commit price per month" }, { k: "href", label: "Link" }, { k: "featured", label: "Highlight as most popular", type: "bool" }] },
  { key: "privates", tab: "pricing", title: "Private sessions & evaluation", fields: planFields },
  { key: "coachingReset", tab: "pricing", title: "30-Day Reset coaching", single: true, fields: planFields },
  { key: "instructors", tab: "instructors", title: "Instructors", fields: [{ k: "name", label: "Name" }, { k: "style", label: "Class style" }, { k: "img", label: "Photo", type: "image" }, { k: "alt", label: "Photo description (for screen readers)" }, { k: "description", label: "Style description", type: "textarea" }, { k: "bio", label: "Bio", type: "textarea" }] },
  { key: "classes", tab: "classes", title: "Classes", fields: [{ k: "name", label: "Class name" }, { k: "img", label: "Photo", type: "image" }, { k: "alt", label: "Photo description (for screen readers)" }, { k: "body", label: "Description", type: "textarea" }] },
  { key: "cancellationPolicy", tab: "classes", title: "Cancellation policy", single: true, fields: [{ k: "text", label: "Policy", type: "textarea" }] },
  { key: "faqs", tab: "faqs", title: "Frequently asked questions", fields: [{ k: "q", label: "Question" }, { k: "a", label: "Answer", type: "textarea" }] },
  { key: "reviews", tab: "reviews", title: "Google review highlights", fields: [{ k: "quote", label: "Quote (exact words from Google)", type: "textarea" }, { k: "name", label: "Reviewer name" }, { k: "detail", label: "Supporting line" }] },
];
const tabs = [["banner", "Banner"], ["pricing", "Pricing"], ["instructors", "Instructors"], ["classes", "Classes & policy"], ["faqs", "FAQs"], ["reviews", "Reviews"], ["messages", "Messages"]] as const;

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const role = useQuery({ queryKey: ["is-admin"], queryFn: async () => {
    const { data: u } = await supabase.auth.getUser();
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user?.id ?? "").eq("role", "admin").maybeSingle();
    return { admin: !!data, email: u.user?.email ?? "" };
  } });

  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <section className="section-y pt-10">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="eyebrow text-primary">Website dashboard</p><h1 className="mt-1 text-3xl md:text-4xl">Edit your site</h1></div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-peri-tint"><LogOut className="size-4" aria-hidden />Sign out</button>
        </div>
        {role.isLoading ? <p className="mt-8">Loading…</p> : !role.data?.admin ? (
          <div className="mt-8 rounded-[20px] border bg-sky-tint p-6">
            <h2 className="text-2xl">Waiting for access</h2>
            <p className="mt-2 text-muted-foreground">You're signed in as {role.data?.email}, but this account isn't an admin yet. Ask the site owner to grant access.</p>
          </div>
        ) : (
          <Tabs defaultValue="banner" className="mt-8">
            <TabsList className="h-auto flex-wrap">{tabs.map(([v, l]) => <TabsTrigger key={v} value={v}>{l}</TabsTrigger>)}</TabsList>
            {tabs.filter(([v]) => v !== "messages").map(([v]) => (
              <TabsContent key={v} value={v} className="space-y-8 pt-4">
                {sections.filter((s) => s.tab === v).map((s) => <Editor key={s.key} ckey={s.key} title={s.title} fields={s.fields} {...(s.single ? { single: true } : {})} />)}
              </TabsContent>
            ))}
            <TabsContent value="messages" className="pt-4"><Messages /></TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
}

function Editor({ ckey, title, fields, single }: { ckey: ContentKey; title: string; fields: Field[]; single?: boolean }) {
  const content = useContent();
  const qc = useQueryClient();
  const current = content[ckey] as unknown;
  const toItems = (v: unknown) => (single ? [v] : (v as Item[])) as Item[];
  const [items, setItems] = useState<Item[]>(() => structuredClone(toItems(current)));
  const [saving, setSaving] = useState(false);
  useEffect(() => { setItems(structuredClone(toItems(current))); }, [JSON.stringify(current)]);

  const set = (i: number, k: string, v: unknown) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const move = (i: number, d: number) => setItems((xs) => { const c = [...xs]; const t = c[i + d]; if (!t) return xs; c[i + d] = c[i]!; c[i] = t; return c; });
  const blank = () => Object.fromEntries(fields.map((f) => [f.k, f.type === "bool" ? false : f.k === "href" ? "https://app.glofox.com/portal/#/branch/6800273ac38efe7c330bf920/memberships?header=memberships" : ""]));

  async function save() {
    setSaving(true);
    const value = (single ? items[0] : items) as Json;
    const { error } = await supabase.from("site_content").upsert({ key: ckey, value, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`${title} saved — live on the site now.`);
    qc.invalidateQueries({ queryKey: contentQuery.queryKey });
  }
  async function reset() {
    if (!confirm(`Restore the original "${title}" content?`)) return;
    const { error } = await supabase.from("site_content").delete().eq("key", ckey);
    if (error) { toast.error(error.message); return; }
    setItems(structuredClone(toItems(defaultContent[ckey])));
    toast.success("Restored original content.");
    qc.invalidateQueries({ queryKey: contentQuery.queryKey });
  }

  return (
    <div className="rounded-[20px] border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl">{title}</h2>
        <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"><RotateCcw className="size-4" aria-hidden />Restore original</button>
      </div>
      <div className="mt-5 space-y-5">
        {items.map((it, i) => (
          <fieldset key={i} className="rounded-[16px] border bg-background p-4">
            {!single && (
              <legend className="flex items-center gap-1 px-1 text-sm font-semibold">
                <span className="mr-2">#{i + 1}</span>
                <button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="rounded p-1 hover:bg-peri-tint"><ArrowUp className="size-4" /></button>
                <button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="rounded p-1 hover:bg-peri-tint"><ArrowDown className="size-4" /></button>
                <button type="button" aria-label="Remove" onClick={() => setItems((xs) => xs.filter((_, j) => j !== i))} className="rounded p-1 text-destructive hover:bg-peri-tint"><Trash2 className="size-4" /></button>
              </legend>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((f) => <FieldInput key={f.k} id={`${ckey}-${i}-${f.k}`} f={f} value={it[f.k]} onChange={(v) => set(i, f.k, v)} />)}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {!single && <button onClick={() => setItems((xs) => [...xs, blank()])} className="inline-flex items-center gap-1.5 rounded-full border border-primary px-4 py-2 text-sm font-bold text-primary hover:bg-peri-tint"><Plus className="size-4" aria-hidden />Add item</button>}
        <button onClick={save} disabled={saving} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:bg-navy disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button>
      </div>
    </div>
  );
}

function FieldInput({ id, f, value, onChange }: { id: string; f: Field; value: unknown; onChange: (v: unknown) => void }) {
  const [uploading, setUploading] = useState(false);
  if (f.type === "bool") return <div className="flex items-center gap-3 md:col-span-2"><Switch id={id} checked={!!value} onCheckedChange={onChange} /><Label htmlFor={id}>{f.label}</Label></div>;
  if (f.type === "image") {
    async function upload(file: File) {
      setUploading(true);
      const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
      const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
      setUploading(false);
      if (error) { toast.error(error.message); return; }
      onChange(`/api/public/media/${path}`);
      toast.success("Photo uploaded — remember to save.");
    }
    return (
      <div className="md:col-span-2">
        <Label htmlFor={id}>{f.label}</Label>
        <div className="mt-1 flex items-center gap-4">
          {typeof value === "string" && value && <img src={value} alt="" className="size-20 rounded-[12px] object-cover" />}
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-peri-tint">
            <Upload className="size-4" aria-hidden />{uploading ? "Uploading…" : "Replace photo"}
            <input id={id} type="file" accept="image/*" className="sr-only" onChange={(e) => { const file = e.target.files?.[0]; if (file) upload(file); }} />
          </label>
        </div>
      </div>
    );
  }
  const v = typeof value === "string" ? value : "";
  return (
    <div className={f.type === "textarea" ? "md:col-span-2" : ""}>
      <Label htmlFor={id}>{f.label}</Label>
      {f.type === "textarea" ? <Textarea id={id} rows={3} value={v} onChange={(e) => onChange(e.target.value)} className="mt-1" /> : <Input id={id} value={v} onChange={(e) => onChange(e.target.value)} className="mt-1" />}
    </div>
  );
}

function Messages() {
  const q = useQuery({ queryKey: ["contact-submissions"], queryFn: async () => {
    const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    return data;
  } });
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    q.refetch();
  }
  if (q.isLoading) return <p>Loading…</p>;
  if (!q.data?.length) return <p className="text-muted-foreground">No messages yet.</p>;
  return (
    <ul className="space-y-4">
      {q.data.map((m) => (
        <li key={m.id} className="rounded-[20px] border bg-card p-5 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{m.name} {m.interest && <span className="ml-2 rounded-full bg-mint-tint px-2 py-0.5 text-xs">{m.interest}</span>}</p>
              <p className="text-sm text-muted-foreground"><a className="hover:text-primary" href={`mailto:${m.email}`}>{m.email}</a>{m.phone && <> · <a className="hover:text-primary" href={`tel:${m.phone}`}>{m.phone}</a></>} · {new Date(m.created_at).toLocaleString()}</p>
            </div>
            <button aria-label={`Delete message from ${m.name}`} onClick={() => remove(m.id)} className="rounded-full p-2 text-destructive hover:bg-peri-tint"><Trash2 className="size-4" /></button>
          </div>
          <p className="mt-3 whitespace-pre-wrap">{m.message}</p>
        </li>
      ))}
    </ul>
  );
}

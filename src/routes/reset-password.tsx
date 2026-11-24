import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Set a new password | All In Health & Wellness" },
    { name: "description", content: "Choose a new password for your All In staff account." },
    { property: "og:title", content: "Set a new password | All In Health & Wellness" },
    { property: "og:description", content: "Choose a new password for your All In staff account." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated.");
    navigate({ to: "/admin" });
  }
  return (
    <section className="section-y">
      <div className="container-site max-w-md">
        <form onSubmit={submit} className="space-y-4 rounded-[20px] border bg-card p-8 shadow-soft">
          <h1 className="text-3xl">Set a new password</h1>
          <div><Label htmlFor="pw">New password</Label><Input id="pw" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <button className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-navy">Save password</button>
        </form>
      </div>
    </section>
  );
}

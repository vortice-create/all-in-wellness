import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Staff sign in | All In Health & Wellness" },
    { name: "description", content: "Staff sign-in for the All In Health & Wellness website dashboard." },
    { property: "og:title", content: "Staff sign in | All In Health & Wellness" },
    { property: "og:description", content: "Staff sign-in for the All In Health & Wellness website dashboard." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
        setMode("in");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        toast.success("Password reset email sent.");
        setMode("in");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally { setBusy(false); }
  }

  return (
    <section className="section-y">
      <div className="container-site max-w-md">
        <div className="rounded-[20px] border bg-card p-8 shadow-soft">
          <p className="eyebrow text-primary">Staff only</p>
          <h1 className="mt-2 text-3xl">{mode === "in" ? "Sign in" : mode === "up" ? "Create staff account" : "Reset password"}</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            {mode !== "forgot" && <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required minLength={8} autoComplete={mode === "up" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} /></div>}
            <button disabled={busy} className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-navy disabled:opacity-60">
              {busy ? "Please wait…" : mode === "in" ? "Sign in" : mode === "up" ? "Create account" : "Send reset link"}
            </button>
          </form>
          <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm">
            {mode !== "in" ? <button className="font-semibold text-primary" onClick={() => setMode("in")}>Back to sign in</button> : <>
              <button className="font-semibold text-primary" onClick={() => setMode("up")}>Create an account</button>
              <button className="font-semibold text-primary" onClick={() => setMode("forgot")}>Forgot password?</button>
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}

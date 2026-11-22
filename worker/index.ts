interface AiBinding {
  run(model: string, input: Record<string, unknown>): Promise<{ response?: string; [key: string]: unknown }>;
}

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<{ success: boolean; meta?: { changes?: number } }>;
}
interface D1Database { prepare(sql: string): D1Statement; }
interface Env {
  ASSETS: Fetcher;
  AI: AiBinding;
  AUTH_DB: D1Database;
  OWNER_EMAIL?: string;
}

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });


const encoder = new TextEncoder();
const toHex = (bytes: Uint8Array) => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
const fromHex = (hex: string) => new Uint8Array((hex.match(/.{2}/g) || []).map(x => parseInt(x, 16)));
async function digest(value: string) { return toHex(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)))); }
async function passwordHash(password: string, saltHex: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  return toHex(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: fromHex(saltHex), iterations: 100000, hash: "SHA-256" }, key, 256)));
}
function sessionCookie(token: string, maxAge: number) {
  return `kgg_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}
function readCookie(request: Request, name: string) {
  return (request.headers.get("Cookie") || "").split(";").map(x => x.trim()).find(x => x.startsWith(name + "="))?.slice(name.length + 1) || "";
}

const websiteInstructions = `You are Webora AI, a professional front-end website generator.
Create a complete, polished, responsive, standalone HTML document from the user's requirements.
Return ONLY the HTML document. Do not use Markdown fences or explanations.
Include <!doctype html>, html, head, a useful title, viewport meta, and body.
Put all CSS in a style element. Use semantic accessible HTML and responsive layouts.
You may use inline SVG for decorative icons. Do not load external scripts, stylesheets, fonts, images, or libraries.
Do not add analytics, tracking, credential collection, hidden forms, payment flows, or code that sends data to any server.
Do not imitate an existing brand or use copyrighted logos. Use tasteful CSS gradients and placeholder visual elements where imagery is requested.
Make buttons and navigation work locally where practical; do not use network requests.
Keep the design cohesive, high quality, and suitable for a real public website.
If the user asks for a website that would facilitate fraud, credential theft, impersonation, or other wrongdoing, refuse by returning a simple safe informational page instead.`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);


    if (url.pathname === "/api/auth/register" || url.pathname === "/api/auth/login") {
      if (request.method !== "POST") return json({ error: "Use POST." }, 405);
      let body: { email?: unknown; password?: unknown };
      try { body = await request.json() as typeof body; } catch { return json({ error: "Invalid JSON." }, 400); }
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password : "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return json({ error: "Enter a valid email address." }, 400);
      if (password.length < 10 || password.length > 128) return json({ error: "Password must be 10–128 characters." }, 400);
      if (url.pathname.endsWith("/register")) {
        const existing = await env.AUTH_DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
        if (existing) return json({ error: "An account with this email already exists." }, 409);
        const id = crypto.randomUUID();
        const salt = toHex(crypto.getRandomValues(new Uint8Array(16)));
        const hash = await passwordHash(password, salt);
        await env.AUTH_DB.prepare("INSERT INTO users (id,email,password_hash,password_salt,password_iterations) VALUES (?,?,?,?,100000)").bind(id,email,hash,salt).run();
      }
      const user = await env.AUTH_DB.prepare("SELECT id,email,password_hash,password_salt,disabled_at,email_verified_at,phone_verified_at FROM users WHERE email = ?").bind(email).first<{id:string,email:string,password_hash:string,password_salt:string,disabled_at:string|null,email_verified_at:string|null,phone_verified_at:string|null}>();
      if (!user || user.disabled_at || !user.password_hash || !user.password_salt || await passwordHash(password,user.password_salt) !== user.password_hash) return json({ error: "Email or password is incorrect." }, 401);
      const token = toHex(crypto.getRandomValues(new Uint8Array(32)));
      const tokenHash = await digest(token);
      const expires = new Date(Date.now() + 30*24*60*60*1000).toISOString();
      await env.AUTH_DB.prepare("INSERT INTO sessions (id_hash,user_id,expires_at) VALUES (?,?,?)").bind(tokenHash,user.id,expires).run();
      const owner = !!env.OWNER_EMAIL && env.OWNER_EMAIL.trim().toLowerCase() === user.email;
      return Response.json({ ok:true, user:{id:user.id,email:user.email,verified:!!(user.email_verified_at || user.phone_verified_at),owner} }, { headers:{ "Cache-Control":"no-store", "Set-Cookie":sessionCookie(token,30*24*60*60) } });
    }

    if (url.pathname === "/api/auth/me") {
      if (request.method !== "GET") return json({ error: "Use GET." }, 405);
      const token = readCookie(request,"kgg_session");
      if (!token) return json({ user:null });
      const tokenHash = await digest(token);
      const user = await env.AUTH_DB.prepare("SELECT u.id,u.email,u.email_verified_at,u.phone_verified_at,u.disabled_at FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.id_hash=? AND s.revoked_at IS NULL AND s.expires_at > ?").bind(tokenHash,new Date().toISOString()).first<{id:string,email:string,email_verified_at:string|null,phone_verified_at:string|null,disabled_at:string|null}>();
      if (!user || user.disabled_at) return json({ user:null });
      return json({ user:{id:user.id,email:user.email,verified:!!(user.email_verified_at || user.phone_verified_at),owner:!!env.OWNER_EMAIL && env.OWNER_EMAIL.trim().toLowerCase()===user.email} });
    }

    if (url.pathname === "/api/auth/logout") {
      if (request.method !== "POST") return json({ error: "Use POST." }, 405);
      const token = readCookie(request,"kgg_session");
      if (token) await env.AUTH_DB.prepare("UPDATE sessions SET revoked_at=? WHERE id_hash=? AND revoked_at IS NULL").bind(new Date().toISOString(),await digest(token)).run();
      return new Response(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json","Cache-Control":"no-store","Set-Cookie":sessionCookie("",0)}});
    }

    if (url.pathname === "/api/health") {
      return json({ ok: true, service: "Kvara Global Group" });
    }

    if (url.pathname === "/api/generate-website") {
      if (request.method !== "POST") return json({ error: "Use POST to generate a website." }, 405);

      let body: { prompt?: unknown; language?: unknown };
      try {
        body = await request.json() as { prompt?: unknown; language?: unknown };
      } catch {
        return json({ error: "The request body must be valid JSON." }, 400);
      }

      const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
      if (prompt.length < 10) return json({ error: "Please describe the website in at least 10 characters." }, 400);
      if (prompt.length > 4000) return json({ error: "Please keep the website description under 4,000 characters." }, 400);

      const language = body.language === "ka" ? "Georgian" : body.language === "ru" ? "Russian" : "English";

      try {
        const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          prompt: `${websiteInstructions}

Write all user-facing website copy in ${language} unless the user explicitly requests another language.

Website requirements:
${prompt}

Generate the complete standalone HTML now:`,
          max_tokens: 3500,
          temperature: 0.35
        });

        let html = typeof result.response === "string" ? result.response.trim() : "";
        html = html.replace(/^\x60\x60\x60(?:html)?\s*/i, "").replace(/\s*\x60\x60\x60$/i, "");
        const firstTag = html.search(/<!doctype html|<html[\s>]/i);
        if (firstTag > 0) html = html.slice(firstTag);
        if (!html || !/<html[\s>]/i.test(html) || html.length > 120000) {
          return json({ error: "The AI did not return a complete website. Please try a more specific prompt." }, 502);
        }

        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const title = titleMatch?.[1]?.replace(/<[^>]+>/g, "").trim().slice(0, 100) || "Webora AI Website";
        return json({ ok: true, title, html });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown AI service error";
        return json({ error: `Website generation failed: ${message.slice(0, 240)}` }, 502);
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "This API route is not implemented yet." }, 501);
    }

    return env.ASSETS.fetch(request);
  }
};

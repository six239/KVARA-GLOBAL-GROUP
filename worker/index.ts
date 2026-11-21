interface AiBinding {
  run(model: string, input: Record<string, unknown>): Promise<{ response?: string; [key: string]: unknown }>;
}

interface Env {
  ASSETS: Fetcher;
  AI: AiBinding;
}

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

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

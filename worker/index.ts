interface Env {
  ASSETS: Fetcher;
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, service: "Kvara Global Group" });
    }
    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "This API route is not implemented yet." }, { status: 501 });
    }
    return env.ASSETS.fetch(request);
  }
};
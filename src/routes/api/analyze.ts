import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  tool: z.enum(["assistant", "health-check", "scam-detector", "url-analyzer", "legal-analyzer", "report-analyzer"]),
  input: z.string().trim().min(3).max(8000),
});

const json = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), { status, headers: { "content-type": "application/json" } });

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { rateLimited, inspectUrl, streamAnalysis } = await import("@/lib/ai.server");
        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "anon";
        if (rateLimited(ip)) return json(429, "You've made a lot of requests. Please wait a few minutes and try again.");
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return json(400, "Please enter between 3 and 8,000 characters.");
        let { tool, input } = parsed.data;
        try {
          if (tool === "url-analyzer") {
            const report = await inspectUrl(input.split(/\s+/)[0] ?? input);
            input = `Server-side check results:\n${report}`;
          }
          const result = streamAnalysis(tool, input, request.signal);
          return result.toTextStreamResponse();
        } catch (e) {
          return json(400, e instanceof Error ? e.message : "Something went wrong.");
        }
      },
    },
  },
});

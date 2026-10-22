export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Google-Extended",
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://pos.roosty.com.ar/sitemap.xml",
    host: "https://pos.roosty.com.ar",
  };
}

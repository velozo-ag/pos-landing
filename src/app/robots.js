export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/catalog-cards"],
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
        disallow: ["/api/", "/catalog-cards"],
      },
    ],
    sitemap: "https://pos.roosty.com.ar/sitemap.xml",
    host: "https://pos.roosty.com.ar",
  };
}

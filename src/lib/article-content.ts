const SAFE_LINK = /^(https?:\/\/|mailto:)/i;

/**
 * Keeps the small, editorial HTML subset produced by the article editor.
 * The database only receives these tags; all executable or layout-changing
 * markup is dropped before content reaches the public news page.
 */
export function sanitizeArticleHtml(value: unknown): string {
  let html = String(value ?? "").trim();

  html = html
    .replace(/<!--[^]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(script|style|iframe|object|embed|form)[^>]*\/?>/gi, "");

  html = html.replace(/<a\b[^>]*>/gi, (tag) => {
    const match = tag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = (match?.[1] ?? match?.[2] ?? match?.[3] ?? "").trim();
    if (!SAFE_LINK.test(href)) return "<a>";
    const escapedHref = href.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return `<a href="${escapedHref}" target="_blank" rel="noopener noreferrer">`;
  });

  html = html
    .replace(/<(p|h2|h3|strong|em|s|code|ul|ol|li|blockquote)\b[^>]*>/gi, "<$1>")
    .replace(/<br\b[^>]*>/gi, "<br>")
    .replace(/<hr\b[^>]*>/gi, "<hr>")
    .replace(/<\/?(?!p\b|h2\b|h3\b|strong\b|em\b|s\b|code\b|ul\b|ol\b|li\b|blockquote\b|br\b|hr\b|a\b)[^>]*>/gi, "");

  return html;
}

export function articleTextFromHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

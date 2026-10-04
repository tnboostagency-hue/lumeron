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

/** Adds an editorial hierarchy to older articles that were pasted as flat paragraphs. */
export function formatArticleHtmlForDisplay(value: string): string {
  const safeHtml = sanitizeArticleHtml(value);
  if (typeof DOMParser === "undefined") return safeHtml;

  const document = new DOMParser().parseFromString(safeHtml, "text/html");
  const initialChildren = Array.from(document.body.children);
  let startIndex = initialChildren.findIndex((node) => (node.textContent ?? "").trim().length > 0);

  if (startIndex >= 0) {
    const takeaways: Element[] = [];
    for (let index = startIndex; index < initialChildren.length; index += 1) {
      const node = initialChildren[index];
      const text = (node.textContent ?? "").trim();
      if (node.tagName !== "P" || !text || text.length > 260 || /[.!?]$/.test(text)) break;
      takeaways.push(node);
      if (takeaways.length === 4) break;
    }

    if (takeaways.length >= 2) {
      const list = document.createElement("ul");
      list.className = "article-key-points";
      takeaways.forEach((paragraph) => {
        const item = document.createElement("li");
        item.innerHTML = paragraph.innerHTML;
        list.appendChild(item);
      });
      takeaways[0].replaceWith(list);
      takeaways.slice(1).forEach((paragraph) => paragraph.remove());
    }
  }

  let previousWasHeading = false;
  Array.from(document.body.children).forEach((node) => {
    const text = (node.textContent ?? "").trim();
    if (!text) {
      node.remove();
      return;
    }

    if (node.tagName === "P" && /^[“”\"]/.test(text) && text.length > 140) {
      const quote = document.createElement("blockquote");
      quote.innerHTML = node.innerHTML;
      node.replaceWith(quote);
      previousWasHeading = false;
      return;
    }

    const isSectionLabel = node.tagName === "P"
      && text.length >= 8
      && text.length <= 90
      && !/[.!?;,]$/.test(text)
      && !text.includes("@")
      && !text.includes(":");

    if (isSectionLabel) {
      const heading = document.createElement(previousWasHeading ? "h3" : "h2");
      heading.innerHTML = node.innerHTML;
      node.replaceWith(heading);
      previousWasHeading = true;
    } else {
      previousWasHeading = node.tagName === "H2" || node.tagName === "H3";
    }
  });

  return document.body.innerHTML;
}

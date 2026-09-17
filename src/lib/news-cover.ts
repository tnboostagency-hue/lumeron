/** Max stored size for cover data URLs (~2MB image when base64-encoded). */
export const MAX_NEWS_COVER_DATA_URL_LENGTH = 2_800_000;
export const MAX_NEWS_COVER_IMAGES = 5;

export function getNewsCoverImages(raw: unknown): string[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string");
  } catch { /* Legacy single-image rows are stored as a direct data URL. */ }
  return [raw];
}

export function parseNewsCoverInput(raw: unknown): { ok: true; value: string | null } | { ok: false; error: string } {
  const images = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
  if (images.length > MAX_NEWS_COVER_IMAGES) return { ok: false, error: `Use up to ${MAX_NEWS_COVER_IMAGES} cover images.` };
  const valid: string[] = [];
  for (const rawImage of images) {
    const image = String(rawImage ?? "").trim();
    if (!image) continue;
    if (image.length > MAX_NEWS_COVER_DATA_URL_LENGTH) return { ok: false, error: "Each cover image must be under ~2MB." };
    if (!/^data:image\/(jpeg|jpg|png|gif|webp);base64,/i.test(image)) return { ok: false, error: "Covers must be JPEG, PNG, GIF, or WebP images." };
    valid.push(image);
  }
  return { ok: true, value: valid.length ? (valid.length === 1 ? valid[0] : JSON.stringify(valid)) : null };
}

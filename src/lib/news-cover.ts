/** Max stored size for cover data URLs (~2MB image when base64-encoded). */
export const MAX_NEWS_COVER_DATA_URL_LENGTH = 2_800_000;

export function parseNewsCoverInput(raw: unknown): { ok: true; value: string | null } | { ok: false; error: string } {
  if (raw === null) return { ok: true, value: null };
  if (raw === undefined) return { ok: true, value: null };
  const s = String(raw).trim();
  if (!s) return { ok: true, value: null };
  if (s.length > MAX_NEWS_COVER_DATA_URL_LENGTH) {
    return { ok: false, error: "Cover image is too large (max ~2MB). Use a smaller file." };
  }
  if (!/^data:image\/(jpeg|jpg|png|gif|webp);base64,/i.test(s)) {
    return { ok: false, error: "Cover must be a JPEG, PNG, GIF, or WebP image." };
  }
  return { ok: true, value: s };
}

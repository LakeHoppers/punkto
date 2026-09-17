/** Turkish/German-aware slugify for readable story URLs. */
export function slugify(text: string): string {
  return text
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

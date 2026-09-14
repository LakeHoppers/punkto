import { afterEach, describe, expect, it, vi } from 'vitest';
import { OpenAITranslator } from '@/modules/ai/providers/openai-translator';
const input = { headline: 'Başlık', body: 'Metin', whyItMatters: 'Önem' };
afterEach(() => vi.unstubAllGlobals());
function respond(value: unknown) {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => new Response(JSON.stringify({choices:[{message:{content:JSON.stringify(value)}}]}))));
}
describe('OpenAITranslator output validation', () => {
  it.each([null, [], 4, {headline:12,body:'B',whyItMatters:'C'}, {headline:'A',body:{text:'B'},whyItMatters:'C'}, {headline:'A',body:'B',whyItMatters:true}, {headline:' ',body:'B',whyItMatters:'C'}, {headline:'A',body:'\n\t',whyItMatters:'C'}, {headline:'A',body:'B',whyItMatters:''}])('rejects malformed output %j', async value => {
    respond(value);
    await expect(new OpenAITranslator('test-key').translate(input)).rejects.toThrow('incomplete');
  });
  it('accepts complete strings', async () => {
    const output = {headline:'Headline',body:'Paragraph one.\n\nParagraph two.',whyItMatters:'Why'};
    respond(output);
    await expect(new OpenAITranslator('test-key').translate(input)).resolves.toEqual(output);
  });
});

it('uses German glossary/dateline guards without changing the English target', async () => {
  respond({ headline: "KI", body: "Deutscher Nachrichtentext", whyItMatters: "Darum" });
  await new OpenAITranslator('test-key', 'de').translate(input);
  const de = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
  expect(de.messages[0].content).toContain('fluent German');
  expect(de.messages[0].content).toContain('"KI"');
  expect(de.messages[0].content).toContain('Berlin (dpa)');
  expect(de.messages[0].content).toContain("not evidence");
  expect(de.messages[1].content).toContain(JSON.stringify(input));
  expect(de.messages[1].content).toContain("German (de-DE)");
  await new OpenAITranslator('test-key').translate(input);
  expect(JSON.parse(vi.mocked(fetch).mock.calls[1][1]!.body as string).messages[0].content).toContain('fluent English');
});

it.each(["en", "de"] as const)("rejects an unchanged Turkish body for %s", async locale => {
  respond({ ...input, body: `  ${input.body}  ` });
  await expect(new OpenAITranslator("test-key", locale).translate(input)).rejects.toThrow("unchanged source body");
});

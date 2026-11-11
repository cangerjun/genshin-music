import type { NoteNameType } from './types';

/**
 * 怒独僧简谱字体 (jpfont-nds) addresses its octave dots with printable keys:
 * `'` / `"` / `` ` `` are one/two/three dots above, and `q` / `a` / `z` are
 * one/two/three dots below (no duration underlines). Keep the shared labels as
 * Unicode notation and translate only for display.
 */
export function noteLabelForDisplay(text: string, type: NoteNameType): string {
  if (type !== '1 2 3') return text;
  return text
    .replaceAll('\u0307\u0307', '"')
    .replaceAll('\u0323\u0323', 'a')
    .replaceAll('\u0307', "'")
    .replaceAll('\u0323', 'q');
}

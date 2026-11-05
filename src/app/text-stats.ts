/** Average adult reading speed, in words per minute. */
const WORDS_PER_MINUTE = 200;

export interface LetterCount {
  letter: string;
  count: number;
  percent: number;
}

export function countCharacters(text: string, excludeSpaces: boolean): number {
  return (excludeSpaces ? text.replace(/\s/g, '') : text).length;
}

export function countWords(text: string): number {
  return text.match(/\S+/g)?.length ?? 0;
}

/** Fragments between ., ! or ?; an unfinished last sentence still counts. */
export function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter((part) => part.trim()).length;
}

export function estimateReadingTime(text: string): string {
  const words = countWords(text);
  if (!words) return '0 minute';
  const minutes = Math.round(words / WORDS_PER_MINUTE);
  if (!minutes) return '<1 minute';
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}

/** Letter frequencies (any alphabet), most common first, ties in alphabetical order. */
export function letterDensity(text: string): LetterCount[] {
  const letters = text.toUpperCase().match(/\p{L}/gu) ?? [];
  const counts = new Map<string, number>();
  for (const letter of letters) counts.set(letter, (counts.get(letter) ?? 0) + 1);

  return [...counts]
    .map(([letter, count]) => ({ letter, count, percent: (count / letters.length) * 100 }))
    .sort((a, b) => b.count - a.count || a.letter.localeCompare(b.letter));
}

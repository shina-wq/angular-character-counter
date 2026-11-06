import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { countCharacters, countSentences, countWords } from '../text-stats';

interface StatCard {
  label: string;
  value: string;
  background: string;
}

@Component({
  selector: 'app-stat-cards',
  templateUrl: './stat-cards.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCards implements OnChanges {
  @Input() text = '';
  @Input() excludeSpaces = false;

  cards: StatCard[] = [];

  // Recount only when the text or the exclude-spaces option changes
  ngOnChanges(): void {
    this.cards = [
      {
        label: this.excludeSpaces ? 'Total Characters (no space)' : 'Total Characters',
        value: format(countCharacters(this.text, this.excludeSpaces)),
        background: 'bg-purple-400 bg-[url(/images/pattern-character-count.svg)]',
      },
      {
        label: 'Word Count',
        value: format(countWords(this.text)),
        background: 'bg-yellow-500 bg-[url(/images/pattern-word-count.svg)]',
      },
      {
        label: 'Sentence Count',
        value: format(countSentences(this.text)),
        background: 'bg-orange-500 bg-[url(/images/pattern-sentence-count.svg)]',
      },
    ];
  }
}

// At least two digits, like the design: 0 → "00", 1234 → "1,234"
function format(value: number): string {
  return value.toLocaleString('en-US', { minimumIntegerDigits: 2 });
}

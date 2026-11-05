import { DecimalPipe } from '@angular/common';
import { Component, input, OnChanges } from '@angular/core';
import { countCharacters, countSentences, countWords } from '../text-stats';

interface StatCard {
  label: string;
  value: number;
  background: string;
}

@Component({
  imports: [DecimalPipe],
  selector: 'app-stat-cards',
  templateUrl: './stat-cards.html',
})
export class StatCards implements OnChanges {
  readonly text = input.required<string>();
  readonly excludeSpaces = input.required<boolean>();

  protected cards: StatCard[] = [];

  // Recount whenever the text or the exclude-spaces option changes
  ngOnChanges(): void {
    const text = this.text();
    const excludeSpaces = this.excludeSpaces();

    this.cards = [
      {
        label: excludeSpaces ? 'Total Characters (no space)' : 'Total Characters',
        value: countCharacters(text, excludeSpaces),
        background: 'bg-purple-400 bg-[url(/images/pattern-character-count.svg)]',
      },
      {
        label: 'Word Count',
        value: countWords(text),
        background: 'bg-yellow-500 bg-[url(/images/pattern-word-count.svg)]',
      },
      {
        label: 'Sentence Count',
        value: countSentences(text),
        background: 'bg-orange-500 bg-[url(/images/pattern-sentence-count.svg)]',
      },
    ];
  }
}

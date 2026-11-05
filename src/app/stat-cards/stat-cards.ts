import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [DecimalPipe],
  selector: 'app-stat-cards',
  templateUrl: './stat-cards.html',
})
export class StatCards {
  protected readonly cards = [
    {
      label: 'Total Characters',
      value: 0,
      background: 'bg-purple-400 bg-[url(/images/pattern-character-count.svg)]',
    },
    {
      label: 'Word Count',
      value: 0,
      background: 'bg-yellow-500 bg-[url(/images/pattern-word-count.svg)]',
    },
    {
      label: 'Sentence Count',
      value: 0,
      background: 'bg-orange-500 bg-[url(/images/pattern-sentence-count.svg)]',
    },
  ];
}

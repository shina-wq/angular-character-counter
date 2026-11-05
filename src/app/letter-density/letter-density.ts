import { DecimalPipe } from '@angular/common';
import { Component, computed, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { LetterCount, letterDensity } from '../text-stats';

const PREVIEW_COUNT = 5;

@Component({
  imports: [DecimalPipe],
  selector: 'app-letter-density',
  templateUrl: './letter-density.html',
})
export class LetterDensity implements OnChanges {
  readonly text = input.required<string>();

  protected readonly rows = signal<LetterCount[]>([]);
  protected readonly expanded = signal(false);
  protected readonly hasMore = computed(() => this.rows().length > PREVIEW_COUNT);
  protected readonly visibleRows = computed(() =>
    this.expanded() ? this.rows() : this.rows().slice(0, PREVIEW_COUNT),
  );

  // Recalculate the letter frequencies whenever the text changes
  ngOnChanges(changes: SimpleChanges): void {
    console.log('[LetterDensity] ngOnChanges:', Object.keys(changes));
    this.rows.set(letterDensity(this.text()));
  }
}

import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { LetterCount, letterDensity } from '../text-stats';

@Component({
  selector: 'app-letter-density',
  templateUrl: './letter-density.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterDensity implements OnChanges {
  @Input() text = '';

  rows: LetterCount[] = [];
  expanded = false;
  previewCount = 5;

  // Recalculate the letter frequencies whenever the text changes
  ngOnChanges(): void {
    this.rows = letterDensity(this.text);
  }

  get visibleRows(): LetterCount[] {
    return this.expanded ? this.rows : this.rows.slice(0, this.previewCount);
  }
}

import { Component, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';

const DEFAULT_LIMIT = 300;
const NEAR_LIMIT_RATIO = 0.9; // heads-up once 90% of the limit is used

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.html',
})
export class TextInput implements OnChanges {
  readonly text = input.required<string>();
  readonly excludeSpaces = input.required<boolean>();
  readonly limit = input.required<number | null>();
  readonly readingTime = input.required<string>();

  readonly textChange = output<string>();
  readonly excludeSpacesChange = output<boolean>();
  readonly limitChange = output<number | null>();

  // Only this component cares whether the limit field is visible
  protected readonly limitEnabled = signal(false);
  protected limitReached = false;
  protected limitMessage = '';

  // Re-check the limit whenever the text or the limit changes
  ngOnChanges(changes: SimpleChanges): void {
    console.log('[TextInput] ngOnChanges:', Object.keys(changes));
    const limit = this.limit();
    const length = this.text().length;

    this.limitReached = limit !== null && length >= limit;

    // Fixed wording (no live count) so screen readers announce it once, not on every keystroke
    if (limit === null) {
      this.limitMessage = '';
    } else if (this.limitReached) {
      this.limitMessage = `Limit reached! Your text ${length > limit ? 'exceeds' : 'has reached'} ${limit} characters.`;
    } else if (length >= limit * NEAR_LIMIT_RATIO) {
      this.limitMessage = `Almost there! You're close to the ${limit}-character limit.`;
    } else {
      this.limitMessage = '';
    }
  }

  protected toggleLimit(enabled: boolean): void {
    this.limitEnabled.set(enabled);
    this.limitChange.emit(enabled ? DEFAULT_LIMIT : null);
  }

  protected setLimit(value: number): void {
    this.limitChange.emit(value >= 1 ? Math.floor(value) : null);
  }
}

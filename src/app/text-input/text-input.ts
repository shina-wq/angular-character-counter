import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

const DEFAULT_LIMIT = 300;

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInput implements OnChanges {
  // Data in from the parent
  @Input() text = '';
  @Input() excludeSpaces = false;
  @Input() limit: number | null = null;
  @Input() readingTime = '';

  // Events out to the parent. The "Change" suffix enables [(text)] two-way binding
  @Output() textChange = new EventEmitter<string>();
  @Output() excludeSpacesChange = new EventEmitter<boolean>();
  @Output() limitChange = new EventEmitter<number | null>();

  // Local UI state: only this component needs to know if the limit field is open
  limitEnabled = false;
  limitReached = false;
  warning = '';

  // ngOnChanges runs every time the parent passes a new input value
  ngOnChanges(): void {
    const length = this.text.length;
    const limit = this.limit;

    this.limitReached = limit !== null && length >= limit;

    if (limit === null) {
      this.warning = '';
    } else if (this.limitReached) {
      this.warning = `Limit reached! Your text ${length > limit ? 'exceeds' : 'has reached'} ${limit} characters.`;
    } else if (length >= limit * 0.9) {
      this.warning = `Almost there! You're close to the ${limit}-character limit.`;
    } else {
      this.warning = '';
    }
  }

  toggleLimit(enabled: boolean): void {
    this.limitEnabled = enabled;
    this.limitChange.emit(enabled ? DEFAULT_LIMIT : null);
  }

  setLimit(value: number): void {
    this.limitChange.emit(value >= 1 ? Math.floor(value) : null);
  }
}

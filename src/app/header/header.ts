import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  // OnPush: only re-check this component when its inputs change or one of its own events fires
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  // The header doesn't own the theme; it just tells the parent the button was clicked
  @Output() themeToggle = new EventEmitter<void>();
}

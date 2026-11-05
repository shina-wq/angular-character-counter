import { Component, input, output } from '@angular/core';

export type Theme = 'light' | 'dark';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  readonly theme = input.required<Theme>();
  readonly themeToggle = output<void>();
}

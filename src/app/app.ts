import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Header, Theme } from './header/header';
import { LetterDensity } from './letter-density/letter-density';
import { StatCards } from './stat-cards/stat-cards';
import { TextInput } from './text-input/text-input';
import { estimateReadingTime } from './text-stats';

@Component({
  imports: [Header, TextInput, StatCards, LetterDensity],
  selector: 'app-root',
  templateUrl: './app.html',
  host: { class: 'block px-4 pt-4 pb-8 md:px-8 lg:pt-8 lg:pb-16' },
})
export class App {
  // All app state lives here and flows down to the children
  protected readonly text = signal('');
  protected readonly excludeSpaces = signal(false);
  protected readonly limit = signal<number | null>(null);
  protected readonly theme = signal<Theme>('dark');

  protected readonly readingTime = computed(() => estimateReadingTime(this.text()));

  constructor() {
    const root = inject(DOCUMENT).documentElement;
    effect(() => (root.dataset['theme'] = this.theme()));
  }

  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }
}

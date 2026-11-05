import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Header, Theme } from './header/header';
import { LetterDensity } from './letter-density/letter-density';
import { StatCards } from './stat-cards/stat-cards';
import { TextInput } from './text-input/text-input';
import { estimateReadingTime } from './text-stats';

const THEME_KEY = 'character-counter:theme';

@Component({
  imports: [Header, TextInput, StatCards, LetterDensity],
  selector: 'app-root',
  templateUrl: './app.html',
  host: { class: 'block px-4 pt-4 pb-8 md:px-8 lg:pt-8 lg:pb-16' },
})
export class App implements OnInit, OnDestroy {
  // All app state lives here and flows down to the children
  protected readonly text = signal('');
  protected readonly excludeSpaces = signal(false);
  protected readonly limit = signal<number | null>(null);
  protected readonly theme = signal<Theme>('dark');

  protected readonly readingTime = computed(() => estimateReadingTime(this.text()));

  private readonly systemPrefersLight = matchMedia('(prefers-color-scheme: light)');

  constructor() {
    const root = inject(DOCUMENT).documentElement;
    effect(() => (root.dataset['theme'] = this.theme()));
  }

  // Start with the saved theme, or the system's if the user hasn't picked one
  ngOnInit(): void {
    const saved = this.savedTheme();
    this.theme.set(saved ?? this.systemTheme());
    this.systemPrefersLight.addEventListener('change', this.followSystemTheme);
    console.log(`[App] ngOnInit: theme "${this.theme()}" from ${saved ? 'saved choice' : 'system setting'}`);
  }

  // Stop listening to the system setting so the listener doesn't leak
  ngOnDestroy(): void {
    this.systemPrefersLight.removeEventListener('change', this.followSystemTheme);
    console.log('[App] ngOnDestroy: removed system theme listener');
  }

  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
    try {
      localStorage.setItem(THEME_KEY, this.theme());
    } catch {} // Storage can be blocked; the theme still switches for this visit
  }

  // Arrow function so it keeps `this` when used as an event listener
  private readonly followSystemTheme = (): void => {
    if (!this.savedTheme()) this.theme.set(this.systemTheme());
  };

  private systemTheme(): Theme {
    return this.systemPrefersLight.matches ? 'light' : 'dark';
  }

  private savedTheme(): Theme | null {
    try {
      const theme = localStorage.getItem(THEME_KEY);
      return theme === 'light' || theme === 'dark' ? theme : null;
    } catch {
      return null;
    }
  }
}

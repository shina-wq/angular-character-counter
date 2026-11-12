import { Component, OnDestroy, OnInit } from '@angular/core';
import { Header } from './header/header';
import { LetterDensity } from './letter-density/letter-density';
import { StatCards } from './stat-cards/stat-cards';
import { TextInput } from './text-input/text-input';
import { estimateReadingTime } from './text-stats';

type Theme = 'light' | 'dark';

const THEME_KEY = 'character-counter:theme';

@Component({
  selector: 'app-root',
  imports: [Header, TextInput, StatCards, LetterDensity],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  text = '';
  excludeSpaces = false;
  limit: number | null = null;

  private theme: Theme = 'dark';
  private systemLight = matchMedia('(prefers-color-scheme: light)');

  // Getter: re-evaluated on every change detection run, so it is always up to date
  get readingTime(): string {
    return estimateReadingTime(this.text);
  }

  // ngOnInit runs once, after Angular has created the component
  ngOnInit(): void {
    this.setTheme(this.savedTheme() ?? this.systemTheme());
    this.systemLight.addEventListener('change', this.followSystem);
  }

  // ngOnDestroy runs once, right before Angular removes the component: clean up here
  ngOnDestroy(): void {
    this.systemLight.removeEventListener('change', this.followSystem);
  }

  toggleTheme(): void {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    try {
      localStorage.setItem(THEME_KEY, this.theme);
    } catch {} // storage can be blocked; the theme still changes for this visit
  }

  // Arrow function so `this` still points to the component inside the listener
  private followSystem = (): void => {
    if (!this.savedTheme()) this.setTheme(this.systemTheme());
  };

  // The theme lives on <html data-theme="…">, which the CSS `dark:` styles read
  private setTheme(theme: Theme): void {
    this.theme = theme;
    document.documentElement.dataset['theme'] = theme;
  }

  private systemTheme(): Theme {
    return this.systemLight.matches ? 'light' : 'dark';
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

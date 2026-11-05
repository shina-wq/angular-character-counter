import { Component } from '@angular/core';
import { Header } from './header/header';
import { LetterDensity } from './letter-density/letter-density';
import { StatCards } from './stat-cards/stat-cards';
import { TextInput } from './text-input/text-input';

@Component({
  imports: [Header, TextInput, StatCards, LetterDensity],
  selector: 'app-root',
  templateUrl: './app.html',
  host: { class: 'block px-4 pt-4 pb-8 md:px-8 lg:pt-8 lg:pb-16' },
})
export class App {}

# Character Counter

Analyze text as you type: character, word and sentence counts, reading time and letter density, with an optional character limit.

Built with Angular and Tailwind CSS.

## Features

- Live character, word and sentence counts, with an option to exclude spaces
- Optional character limit that warns as you approach it and blocks extra input
- Approximate reading time
- Letter density, showing the top five letters with an option to see all
- Light and dark themes that follow your system and remember your choice
- Responsive layout and full keyboard support

## Tech stack

- [Angular 22](https://angular.dev): standalone components, signals, zoneless change detection
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript

## Getting started

Requires Node.js 22.22+ or 24.15+.

```bash
npm install
npm start
```

Then open [http://localhost:4200](http://localhost:4200).

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm start`     | Start the dev server with live reload |
| `npm run build` | Build for production into `dist/`     |
| `npm run watch` | Rebuild on changes (development)      |

## Project structure

```
src/app/
├── app.ts              Root component: holds the state and theme
├── text-stats.ts       Text analysis functions
├── header/             Logo and theme toggle
├── text-input/         Text area, options and limit warning
├── stat-cards/         Character, word and sentence counts
└── letter-density/     Letter frequency bars
```

`App` owns the state and passes it to each component through inputs. Components report user changes back through outputs.

## Acknowledgements

Design from the [Frontend Mentor](https://www.frontendmentor.io) Character Counter challenge.

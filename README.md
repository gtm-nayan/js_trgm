# JS_TRGM

Match text using trigrams in Javascript, similar to Postgres' pg_trgm extension.

## Installation

```bash
npm i js-trgm --save
```

## Usage

```js
import { similarity, trgm_search } from 'js-trgm';

const string1 = 'Hello Word';
const string2 = 'Hello World';
const coll1 = ['Hello World', 'Something else', 'Something else entirely'];

console.log(similarity(string1, string2));
console.log(trgm_search(string1, coll1));
```

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the demo in a new browser tab
pnpm dev -- --open
```

## Packaging

```bash
pnpm package
```

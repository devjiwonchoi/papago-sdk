# papago-sdk-js

> Papago SDK for Node.js

## Installation

```bash
$ pnpm add papago-sdk-js
```

## Usage

### `Papago`

Set up a client with your [Papago Translation credentials](https://api.ncloud-docs.com/docs/en/ai-naver-papagonmt).

```js
// CJS
const { Papago } = require('papago-sdk-js')

// ESM
import { Papago } from 'papago-sdk-js'

const papago = new Papago({
  client_id: 'PAPAGO_CLIENT_ID',
  client_secret: 'PAPAGO_CLIENT_SECRET',
})
```

### `text.translate()`

Translate the given text from one language to another.

```js
const textTranslation = await papago.text.translate({
  from: 'en',
  to: 'ko',
  text: 'Hello, World!'
});

// Output:
{
  message: {
    result: {
      srcLangType: 'en',
      tarLangType: 'ko',
      translatedText: '안녕, 세상아!'
    }
  }
}
```

#### `options.textOnly: Boolean`

Returns translated text only as `translatedText`.

```js
const textOnly = await papago.text.translate({
  from: 'en',
  to: 'ko',
  text: 'Hello, World!',
  options: {
    textOnly: true,
  },
});

// Output:
{ translatedText: '안녕, 세상아!' }
```

### `html.translate()`

Translate an HTML string from one language to another as  `translatedHtml`.

Note that the HTML structure will be preserved.

```js
const htmlTranslation = await papago.html.translate({
  from: 'en',
  to: 'ko',
  html: '<div>Hello, world!</div>'
});

// Output:
{ translatedHtml: '<div>안녕, 세상아!</div>' }
```

### `detect`

Detect lang code of the given text.

```js
const detection = await papago.detect({
  query: 'Hello World!',
})

// Output:
{ langCode: 'en' }
```

> **Good to know: when `from` is set to `'auto'`, the source language is detected automatically.**
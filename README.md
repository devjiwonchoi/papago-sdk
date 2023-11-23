# [Papago Translation API](https://guide.ncloud-docs.com/docs/en/papagotranslation-overview) SDK

SDK for Papago Translation API, supporting multiple programming languages.

## Prerequisites

**This SDK requires [Papago API Client ID and Secret](https://console.ncloud.com).**

> For further guidance, see [Client ID and Secret](https://github.com/devjiwonchoi/papago-sdk/blob/main/docs/client-id-and-secret.md).

## Note

- ~~Zero-cost Papago API is available [HERE](https://developers.naver.com/docs/papago/README.md), `text.translate()` and `detect()` is supported only.~~ (working on integration)
- [100,000 KRW(~$75)](https://www.google.com/search?q=100000+won+to+usd) worth credit for [Naver Cloud Console](https://console.ncloud.com) is available [HERE](https://www.ncloud.com/main/).

## Installation

```bash
pnpm add papago-sdk-js
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

## Language Support

> Order by Accuracy & Cross-Language Support

- 🇰🇷 한국어
- 🇺🇸 English
- 🇯🇵 日本語
- 🇨🇳 简体中文
- 🇹🇼 繁體中文
- 🇻🇳 Tiếng Việt
- 🇹🇭 ภาษาไทย
- 🇮🇩 Indonésia
- 🇫🇷 français
- 🇪🇸 español
- 🇷🇺 русский
- 🇩🇪 Deutsch
- 🇮🇹 italiàno

For more information, see [Language Support](https://github.com/devjiwonchoi/papago-sdk/blob/main/docs/language-support.md).

## Disclaimer

> `papago-sdk` is an open source published by an individual.
>
> The activities and announcements of `papago-sdk` are not affiliated with Naver Cloud, corp.

# papago-sdk-js

> Papago SDK for Node.js

## Installation

```bash
$ npm i papago-sdk-js
```

## Usage

### Papago

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

### translate

Translate text from one language to another.

```js
const translation = await papago.translate({
  from: 'en',
  to: 'ko',
  text: 'Hello, World!'
});

// Output:
{
  message: {
    result: {
      srcLangType: "en",
      tarLangType: "ko",
      translatedText: "안녕, 세상아!"
    }
  }
}
```

### detect

Detect lang code of the given text.

```js
const detection = await papago.detect({
  query: 'Hello World!',
})

// Output:
{
  langCode: 'en'
}
```

## TypeScript

You do not need to install `@types` package.

```ts
import {
  Papago,
  PapagoTranslateParams, 
  PapagoTranslateResponse,
  PapagoDetectParams,
  PapagoDetectResponse,
} from 'papago-sdk-js'

const papago = new Papago({
  client_id: 'PAPAGO_CLIENT_ID',
  client_secret: 'PAPAGO_CLIENT_SECRET',
})

const translateParams: PapagoTranslateParams = {
  from: 'en',
  to: 'ko',
  text: 'Hello World!',
}
const detectParams: PapagoDetectParams = { query: 'Hello World!' }

const translation: PapagoTranslateResponse = await papago.translate(translateParams)
const detection: PapagoDetectResponse = await papago.detect(detectParams)
```

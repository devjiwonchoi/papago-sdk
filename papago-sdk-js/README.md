# papago-sdk-js

> Papago SDK for Node.js

## Installation

```bash
$ npm i papago-sdk-js
```

## Usage

```js
// CJS
const { Papago } = require('papago-sdk-js');

// ESM
import { Papago } from 'papago-sdk-js';

const papago = new Papago({
  client_id: 'PAPAGO_CLIENT_ID',
  client_secret: 'PAPAGO_CLIENT_SECRET',
})

const translation = await papago.translate({
  from: 'en',
  to: 'ko',
  text: 'Hello World!'
});
```

## Output

```js
{
  message: {
    '@service': 'naverservice.nmt.proxy',
    '@type': 'response',
    '@version': '1.0.0',
    result: {
      engineType: 'N2MT',
      srcLangType: 'en',
      tarLangType: 'ko',
      translatedText: '안녕, 세상아!',
    },
  },
}
```

## TypeScript

Does not require a separate `@types` package.

```ts
import {
  Papago,
  PapagoTranslationParams,
  PapagoTranslationResponse
} from 'papago-sdk-js'

const papago = new Papago({
  client_id: 'PAPAGO_CLIENT_ID',
  client_secret: 'PAPAGO_CLIENT_SECRET',
})

const params: PapagoTranslationParams = {
  from: 'en',
  to: 'ko',
  text: 'Hello World!'
}

const translation: PapagoTranslationResponse = await papago.translate(params)
```

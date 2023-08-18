# papago-sdk-js
  
[![npm version](https://badge.fury.io/js/papago-sdk-js.svg)](https://badge.fury.io/js/papago-sdk-js)
[![GitHub license](https://img.shields.io/github/license/lemoncloud-io/papago-sdk-js.svg)](https://github.com/devjiwonchoi/papago-sdk/blob/main/LICENSE)

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

// translation
{
  "message": {
    "@type": "response",
    "@service": "naverservice.nmt.proxy",
    "@version": "1.0.0",
    "result": {
      "srcLangType": "en",
      "tarLangType": "ko",
      "translatedText": "안녕 세상!"
    }
  }
}
```

## TypeScript

Does not require a separate `@types` package.

```ts
import {
  Papago,
  PapagoClient,
  PapagoTranslateParams,
  PapagoTranslationResponse
} from 'papago-sdk-js'

const papago: PapagoClient = new Papago({
  client_id: 'PAPAGO_CLIENT_ID',
  client_secret: 'PAPAGO_CLIENT_SECRET',
})

const params: PapagoTranslateParams = {
  from: 'en',
  to: 'ko',
  text: 'Hello World!'
}

const translation: PapagoTranslationResponse = await papago.translate(params)
```

export interface PapagoClient {
  client_id: string
  client_secret: string
}

export interface PapagoTranslateParams {
  from: string
  to: string
  text: string
}

export interface PapagoTranslationResponse {
  message: {
    '@service': string
    '@type': string
    '@version': string
    result: {
      engineType: string
      srcLangType: string
      tarLangType: string
      translatedText: string
    }
  }
}

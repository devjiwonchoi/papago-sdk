export interface PapagoTranslationParams {
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

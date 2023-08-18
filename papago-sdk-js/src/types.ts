export type PapagoTranslateParams = {
  from: string
  to: string
  text: string
  options?: {
    textOnly?: boolean
  }
}

export type PapagoTranslateResponse = {
  message: {
    result: {
      srcLangType: string
      tarLangType: string
      translatedText: string
    }
  }
}

export type PapagoDetectParams = {
  query: string
}

export type PapagoDetectResponse = {
  langCode: string
}

export interface PapagoTranslateParams {
  from: string
  to: string
  text: string
  options?: {
    textOnly?: boolean
  }
}

export interface PapagoTranslateResponse {
  message: {
    result: {
      srcLangType: string
      tarLangType: string
      translatedText: string
    }
  }
}

export interface PapagoDetectParams {
  query: string
}

export interface PapagoDetectResponse {
  langCode: string
}

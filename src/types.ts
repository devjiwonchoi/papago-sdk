export type PapagoConfig = {
  client_id: string
  client_secret: string
}

export type PapagoDetectParams = {
  query: string
}

export type PapagoDetectResponse = {
  langCode: string
}

export type PapagoHtmlTranslateParams = {
  from: string
  to: string
  html: string
}

export type PapagoTextTranslateParams = {
  from: string
  to: string
  text: string
  options?: {
    textOnly?: boolean
  }
}

export type PapagoTranslateResponse = {
  message?: {
    result: {
      srcLangType: string
      tarLangType: string
      translatedText: string
    }
  }
  translatedHtml?: string
  translatedText?: string
}

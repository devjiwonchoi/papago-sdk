export type PapagoConfig = {
  id: string
  secret: string
}

export type PapagoDetectParams = {
  query: string
}

export type PapagoDetectResponse = {
  langCode: string
}

export type PapagoTranslateParams = {
  from: string
  to: string
  input: string
} & (
  | {
      type: 'text'
      textOnly?: boolean
    }
  | { type: 'html' }
)


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

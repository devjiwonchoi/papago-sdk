import {
  PapagoConfig,
  PapagoDetectParams,
  PapagoDetectResponse,
  PapagoTranslateParams,
  PapagoTranslateResponse,
} from './types'

export class Papago {
  constructor({ id, secret }: PapagoConfig) {
    this.id = id
    this.secret = secret
  }

  private id: string
  private secret: string
  private headers(): Record<string, string> {
    return {
      'X-NCP-APIGW-API-KEY-ID': this.id,
      'X-NCP-APIGW-API-KEY': this.secret,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }
  private async fetch(
    params: URLSearchParams,
    api: string
  ): Promise<PapagoTranslateResponse> {
    const headers = this.headers()
    const hasHtml = params.has('html')

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers,
        body: params,
      })

      return hasHtml
        ? { translatedHtml: await response.text() }
        : await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async translate({
    from,
    to,
    type,
    input,
    ...params
  }: PapagoTranslateParams): Promise<PapagoTranslateResponse> {
    const isText = type === 'text'
    const isTextOnly =
      'textOnly' in params && Boolean(params.textOnly) && isText
    const apiURL = `https://naveropenapi.apigw.ntruss.com/${
      isText ? 'nmt/v1/translation' : 'web-trans/v1/translate'
    }`
    const query = new URLSearchParams({
      source: from,
      target: to,
    })

    query.append(isText ? 'text' : 'html', input)

    const response = await this.fetch(query, apiURL)

    if (isTextOnly) {
      return { translatedText: response?.message?.result?.translatedText }
    }

    return response
  }

  async detect({ query }: PapagoDetectParams): Promise<PapagoDetectResponse> {
    const apiURL = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect'
    const headers = this.headers()
    const body = new URLSearchParams({ query })

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers,
        body,
      })

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

import {
  PapagoConfig,
  PapagoDetectParams,
  PapagoDetectResponse,
  PapagoTranslateParams,
  PapagoTranslateResponse,
} from './types'

export class Papago {
  protected id: string
  protected secret: string

  constructor({ id, secret }: PapagoConfig) {
    this.id = id
    this.secret = secret
  }

  private buildHeaders(): Record<string, string> {
    return {
      'X-NCP-APIGW-API-KEY-ID': this.id,
      'X-NCP-APIGW-API-KEY': this.secret,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }

  private async fetch(
    params: URLSearchParams,
    api: string
  ): Promise<PapagoTranslateResponse | undefined> {
    const headers = this.buildHeaders()
    const hasText = params.has('text')
    const hasHtml = params.has('html')

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers,
        body: params,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      if (hasText) return await response.json()
      if (hasHtml) return { translatedHtml: await response.text() }

      return undefined
    } catch (error) {
      console.error(error)
    }
  }

  async translate({ from, to, ...params }: PapagoTranslateParams) {
    const apiURL = `https://naveropenapi.apigw.ntruss.com/${
      params.html ? 'web-trans/v1/translate' : 'nmt/v1/translation'
    }`
    const query = new URLSearchParams({
      source: from,
      target: to,
      html: params?.html,
      text: params?.text,
    })

    const response = await this.fetch(query, apiURL)

    if (params?.options?.textOnly) {
      return { translatedText: response?.message?.result?.translatedText }
    }

    return response as PapagoTranslateResponse
  }

  async detect({ query }: PapagoDetectParams): Promise<PapagoDetectResponse> {
    const apiURL = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect'
    const headers = this.buildHeaders()
    const body = new URLSearchParams({ query })

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers,
        body,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = (await response.json()) as PapagoDetectResponse
      return responseData
    } catch (error) {
      throw error
    }
  }
}

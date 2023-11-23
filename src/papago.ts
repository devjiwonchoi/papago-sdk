import {
  PapagoConfig,
  PapagoDetectParams,
  PapagoDetectResponse,
  PapagoHtmlTranslateParams,
  PapagoTextTranslateParams,
  PapagoTranslateResponse,
} from './types'

export class Papago {
  protected client_id: string
  protected client_secret: string

  constructor({ client_id, client_secret }: PapagoConfig) {
    this.client_id = client_id
    this.client_secret = client_secret
  }

  private buildHeaders(): Record<string, string> {
    return {
      'X-NCP-APIGW-API-KEY-ID': this.client_id,
      'X-NCP-APIGW-API-KEY': this.client_secret,
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

  public readonly text = {
    translate: async ({
      from,
      to,
      text,
      options,
    }: PapagoTextTranslateParams): Promise<
      // TODO: simplify { message: string }
      PapagoTranslateResponse | { message: string }
    > => {
      const api = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation'
      const params = new URLSearchParams({
        source: from,
        target: to,
        text,
      })
      const response = await this.fetch(params, api)

      if (!response)
        return { message: 'Failed to translate. Please try again.' }

      if (options?.textOnly)
        return { translatedText: response.message?.result?.translatedText }

      return response as PapagoTranslateResponse
    },
  }

  public readonly html = {
    translate: async ({
      from,
      to,
      html,
    }: PapagoHtmlTranslateParams): Promise<PapagoTranslateResponse> => {
      const api = 'https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate'
      const params = new URLSearchParams({
        source: from,
        target: to,
        html,
      })
      const response = await this.fetch(params, api)
      return response as PapagoTranslateResponse
    },
  }

  async detect({ query }: PapagoDetectParams): Promise<PapagoDetectResponse> {
    const API_URL = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect'
    const headers = this.buildHeaders()
    const formData = new URLSearchParams({ query })

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: formData,
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

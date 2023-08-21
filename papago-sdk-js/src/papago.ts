import fetch from 'node-fetch'
import {
  PapagoConfig,
  PapagoDetectParams,
  PapagoDetectResponse,
  PapagoTranslateParams,
  PapagoTranslateResponse,
} from './types'

export class Papago {
  public client_id: string
  public client_secret: string

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

  private async fetch({
    formData,
    api,
  }: any): Promise<PapagoTranslateResponse> {
    const headers = this.buildHeaders()

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers,
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData: PapagoTranslateResponse = await response.json()
      return responseData
    } catch (error) {
      throw error
    }
  }

  public readonly text = {
    translate: async ({
      from,
      to,
      text,
      options,
    }: PapagoTranslateParams): Promise<PapagoTranslateResponse | string> => {
      const api = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation'
      const formData = new URLSearchParams({
        source: from,
        target: to,
        text,
      })
      const response = await this.fetch({
        formData,
        api,
      })

      if (options?.textOnly) {
        return response.message.result.translatedText
      }

      return response
    },
  }

  file() {}

  html() {}

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

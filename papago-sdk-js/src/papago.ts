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

  async translate({
    from,
    to,
    text,
    options,
  }: PapagoTranslateParams): Promise<PapagoTranslateResponse | string> {
    const API_URL = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation'
    const headers = this.buildHeaders()
    const formData = new URLSearchParams({
      source: from,
      target: to,
      text,
    })

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData: PapagoTranslateResponse = await response.json()
      return options?.textOnly
        ? responseData.message.result.translatedText
        : responseData
    } catch (error) {
      throw error
    }
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

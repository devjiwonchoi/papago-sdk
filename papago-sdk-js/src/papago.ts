import fetch from 'node-fetch'
import { PapagoTranslationParams, PapagoTranslationResponse } from './types'

export class Papago {
  public client_id: string
  public client_secret: string

  constructor({
    client_id,
    client_secret,
  }: {
    client_id: string
    client_secret: string
  }) {
    this.client_id = client_id
    this.client_secret = client_secret
  }

  private buildHeaders(): Record<string, string> {
    return {
      'X-Naver-Client-Id': this.client_id,
      'X-Naver-Client-Secret': this.client_secret,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }

  private buildFormData(
    from: string,
    to: string,
    text: string
  ): URLSearchParams {
    const formData = new URLSearchParams({
      source: from,
      target: to,
      text,
    })
    return formData
  }

  async translate({
    from,
    to,
    text,
  }: PapagoTranslationParams): Promise<PapagoTranslationResponse> {
    const API_URL = 'https://openapi.naver.com/v1/papago/n2mt'
    const headers = this.buildHeaders()
    const formData = this.buildFormData(from, to, text)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = (await response.json()) as PapagoTranslationResponse
      return responseData
    } catch (error) {
      throw error
    }
  }
}

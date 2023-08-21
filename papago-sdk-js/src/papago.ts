import fetch from 'node-fetch'
import {
  PapagoConfig,
  PapagoDetectParams,
  PapagoDetectResponse,
  PapagoTextTranslateParams,
  PapagoHTMLTranslateParams,
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

  // TODO: set api by given input
  private async fetch({ formData, api }: any): Promise<any> {
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

      return response
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
      PapagoTranslateResponse | string
    > => {
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

      const responseData = await response.json()

      if (options?.textOnly) {
        return responseData.message.result.translatedText
      }

      return responseData
    },
  }

  // TODO: Specify supporting lang: ko,ja,en,zh-CN
  // public readonly file = {
  //   translate: async ({
  //     from,
  //     to,
  //     file,
  //   }: any): Promise<PapagoTranslateResponse | string> => {
  //     const api = 'https://naveropenapi.apigw.ntruss.com/doc-trans/v1/translate'
  //     const formData = new FormData()
  //     formData.append('source', from)
  //     formData.append('target', to)
  //     formData.append('file', file)
  //     const response = await this.fetch({
  //       formData,
  //       api,
  //     })

  //     return response
  //   },
  // }

  public readonly html = {
    translate: async ({
      from,
      to,
      html,
    }: PapagoHTMLTranslateParams): Promise<any> => {
      const api = 'https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate'
      const formData = new URLSearchParams({
        source: from,
        target: to,
        html,
      })
      const response = await this.fetch({
        formData,
        api,
      })

      const responseData = await response.text()

      return responseData
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

import 'dotenv/config'
import { Papago } from '../src/papago'

const client = new Papago({
  client_id: process.env.PAPAGO_CLIENT_ID as string,
  client_secret: process.env.PAPAGO_CLIENT_SECRET as string,
})

describe('translate', () => {
  it('should return a translation', async () => {
    const translation = await client.translate({
      from: 'en',
      to: 'ko',
      text: 'Hello, world!',
    })

    expect(translation).toEqual({
      message: {
        result: {
          srcLangType: 'en',
          tarLangType: 'ko',
          translatedText: '안녕, 세상아!',
        },
      },
    })
  })
})

describe('detect', () => {
  it('should return a detection', async () => {
    const detection = await client.detect({
      query: 'Hello, world!',
    })

    expect(detection).toEqual({ langCode: 'en' })
  })
})

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
        '@service': 'naverservice.nmt.proxy',
        '@type': 'response',
        '@version': '1.0.0',
        result: {
          engineType: 'N2MT',
          srcLangType: 'en',
          tarLangType: 'ko',
          translatedText: '안녕, 세상아!',
        },
      },
    })
  })
})

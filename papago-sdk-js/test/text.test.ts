import { client } from './test-utils'

describe('text.translate()', () => {
  it('should return a translation', async () => {
    const translation = await client.text.translate({
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

  it('should handle options.textOnly', async () => {
    const translation = await client.text.translate({
      from: 'en',
      to: 'ko',
      text: 'Hello, world!',
      options: {
        textOnly: true,
      },
    })

    expect(translation).toEqual({ translatedText: '안녕, 세상아!' })
  })
})

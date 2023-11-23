import { client } from './test-utils'

describe('text.translate()', () => {
  it('should return a translation', async () => {
    const translation = await client.translate({
      from: 'en',
      to: 'ko',
      type: 'text',
      input: 'Hello, world!',
    })

    expect(translation).toEqual({
      message: {
        result: {
          srcLangType: 'en',
          tarLangType: 'ko',
          translatedText: '안녕, 세상!',
        },
      },
    })
  })

  it('should handle options.textOnly', async () => {
    const translation = await client.translate({
      from: 'en',
      to: 'ko',
      type: 'text',
      input: 'Hello, world!',
      options: {
        textOnly: true,
      },
    })

    expect(translation).toEqual({ translatedText: '안녕, 세상!' })
  })

  it('should detect language when set from to auto', async () => {
    const translation = await client.translate({
      from: 'auto',
      to: 'ko',
      type: 'text',
      input: 'Hello, world!',
      options: {
        textOnly: true,
      },
    })

    expect(translation).toEqual({ translatedText: '안녕, 세상!' })
  })
})

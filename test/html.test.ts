import { client } from './test-utils'

describe('html.translate()', () => {
  it('should return a translation', async () => {
    const translation = await client.translate({
      from: 'en',
      to: 'ko',
      type: 'html',
      input: '<div>Hello, world!</div>',
    })

    expect(translation).toEqual({ translatedHtml: '<div>안녕, 세상!</div>' })
  })

  it('should detect language when set from to auto', async () => {
    const translation = await client.translate({
      from: 'auto',
      to: 'ko',
      type: 'html',
      input: '<div>Hello, world!</div>',
    })

    expect(translation).toEqual({ translatedHtml: '<div>안녕, 세상!</div>' })
  })
})

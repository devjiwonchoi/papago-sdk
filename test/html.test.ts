import { client } from './test-utils'

describe('html.translate()', () => {
  it('should return a translation', async () => {
    const translation = await client.html.translate({
      from: 'en',
      to: 'ko',
      html: '<div>Hello, world!</div>',
    })

    expect(translation).toEqual({ translatedHtml: '<div>안녕, 세상!</div>' })
  })

  it('should detect language when set from to auto', async () => {
    const translation = await client.html.translate({
      from: 'auto',
      to: 'ko',
      html: '<div>Hello, world!</div>',
    })

    expect(translation).toEqual({ translatedHtml: '<div>안녕, 세상!</div>' })
  })
})

import { client } from './test-utils'

describe('html.translate()', () => {
  it('should return a translation', async () => {
    const translation = await client.html.translate({
      from: 'en',
      to: 'ko',
      html: '<div>Hello, world!</div>',
    })

    expect(translation).toEqual('<div>안녕, 세상아!</div>')
  })
})

import { client } from './test-utils'

describe('detect', () => {
  it('should return a detection', async () => {
    const detection = await client.detect({
      query: 'Hello, world!',
    })

    expect(detection).toEqual({ langCode: 'en' })
  })
})

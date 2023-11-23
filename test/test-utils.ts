import { Papago } from '../src/papago'

export const client = new Papago({
  id: process.env.PAPAGO_CLIENT_ID as string,
  secret: process.env.PAPAGO_CLIENT_SECRET as string,
})

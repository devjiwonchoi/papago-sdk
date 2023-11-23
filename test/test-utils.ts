import 'dotenv/config'
import { Papago } from '../src/papago'

export const client = new Papago({
  client_id: process.env.PAPAGO_CLIENT_ID as string,
  client_secret: process.env.PAPAGO_CLIENT_SECRET as string,
})

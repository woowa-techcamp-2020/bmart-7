import { encodeJwt, decodeJwt } from '../jwt'

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, './.env.prod') })

test('jwt 발행 테스트', async () => {
  const token = await encodeJwt(sampleUser)
  expect(token).not.toBeUndefined()
})

test('jwt decode 테스트', async () => {
  const userInfo = await decodeJwt(sampleToken)
  expect(userInfo.id).toEqual(sampleUser.id)
  expect(userInfo.userId).toEqual(sampleUser.userId)
})

const sampleUser = {
  userId: 'parkjihwanjay',
  id: 48053238,
}

const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgwNTMyMzgsInVzZXJuYW1lIjoicGFya2ppaHdhbmpheSIsImlhdCI6MTU5NzMwMTQzOCwiZXhwIjoxNTk5ODkzNDM4LCJpc3MiOiJqaWh3YW4iLCJzdWIiOiJ1c2VySW5mbyJ9.h6dl1hXY2D9zFfkPtRFKQRI-YC6O6rP1ipnhmYNPxYU'

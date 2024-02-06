import { DecodePayloadType, FastifyRequestWithContext } from '@/definitions'
import { FastifyReply } from 'fastify'
import { CACHE_SESSION_NAME } from '@/definitions/cache'

const JwtRefreshMiddleware = async (req: FastifyRequestWithContext, reply: FastifyReply) => {
  // const refreshToken = process.env.JWT_REFRESH_SECRET
  // const refreshToken = process.env.JWT_ACCESS_SECRET
  // const refreshToken = process.env.JWT_SECRET_KEY
  const refreshToken = null
  // console.log("🚀 ~ JwtRefreshMiddleware ~ refreshToken:", refreshToken)
  // console.log("token", token)
  // const decode: DecodePayloadType = await req.jwt.decode(refreshToken)
  const decode: DecodePayloadType = await req.jwtVerify(refreshToken)
  console.log("🚀 ~ JwtRefreshMiddleware ~ decode:", decode)
  // const decode: DecodePayloadType = await req.jwtVerify(token, accessToken)
  console.log("decode", decode)
  if (!decode) reply.code(401).send({ statusCode: 401, time: Date.now(), errors: { message: 'Unauthorized - Missing or wrong JsonWebToken', code: 'NJTW-G-01' } })


  return true

}







export default JwtRefreshMiddleware

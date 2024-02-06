import { FastifyRequest } from 'fastify'
import { FastifyHttpProxyOptions } from '@fastify/http-proxy'
import { preHandlerHookHandler } from 'fastify/types/hooks'
import { HTTPMethods } from 'fastify/types/utils'
import Redis from 'ioredis'
import { SignPayloadType } from '@fastify/jwt';
import { AbilityMiddlewareType, PermissionsType } from './ability'



export interface ServerProxyList {
  ms: string
  routes: Array<FastifyHttpProxyAlt | NatsProxyAlt>
}

export enum ProxyType {
  HTTP,
  NATS,
}

export interface FastifyHttpProxyAlt extends FastifyHttpProxyOptions {
  type: ProxyType.HTTP
  rules?: string
  comment?: string
}

export interface NatsProxyAlt {
  type: ProxyType.NATS
  rules?: string
  comment?: string
  httpMethods?: HTTPMethods[]
  prefix?: string
  command: string
  cacheExpire?: number
  preHandler?: preHandlerHookHandler[] | preHandlerHookHandler
  postHandler?: preHandlerHookHandler
  rawBody?: boolean
}

export interface FastifyRequestWithContext extends FastifyRequest {
  // JwtMiddleware(JWT_ACCESS_SECRET: string): unknown
  context: {
    config: {
      command?: string
      user?: object
      ability?: AbilityMiddlewareType
      cacheExpire?: number
      postHandler?: preHandlerHookHandler
    }
    cache?: {
      used: boolean
      bypass: boolean
      keys?: {
        cacheOrigin: string,
        cacheKey: string
      }
    }
    setCache?: boolean
    setCacheKeys: {
      cacheOrigin: string,
      cacheKey: string
    }
    bypassCache?: boolean
    response?: any
    filter?: any
    app?: {
      appId: string
      clientId?: string
      type?: number
    }
  }
  redis: Redis
  sig: string
  rawBody: string
  user: any
  jwtVerify: any
  jwt: any
}

export type cacheContext = FastifyRequestWithContext['context']['cache']
export type cacheKeysContext = cacheContext['keys']


export interface NatsRequestPayloadInterface {
  id: string
  data: {
    body: Object | null
    query: Object | null
    params: Object | null
    user: Object | null
    app: {
      appId: string
      clientId?: string
    }
    filter?: Object | null
    language?: RequestPayloadLanguageInterface
    sig: string
    rawBody: string
  }
}

export interface RequestPayloadLanguageInterface {
  browser: string
  available: Array<string>
}

export interface SignPayload {
  tokenPayload: any//SignPayloadType;
  cachePayload: {
    id: string
    internalId: string
    role?: string
    permissions?: PermissionsType
    ipRemote: string[]
    appId?: string
    clients?: Array<orderClientInterface>
    user?: any
    app?: any
  }
}

export interface DecodePayloadType {
  id: string
  internalId: string
  tokenId: string
  isActive: boolean
  role: string
  ipRemote: string[]
  permissions: PermissionsType
}


export interface orderClientInterface {
  clientId: string
  name: string
  type: string
  roleId: string
  permissions: PermissionsType
}

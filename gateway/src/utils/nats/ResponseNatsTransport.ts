import { FastifyRequestWithContext, NatsRequestPayloadInterface } from '@/definitions';
import { FastifyReply } from 'fastify';
import { addSeconds, relativeTime } from '../date';
import { getEnv } from '../validateEnv';
import { CACHE_RESPONSE_NAME } from '@/definitions/cache';

export const responseNatsFormatter = async (
  req: FastifyRequestWithContext,
  reply: FastifyReply,
  command: string,
  reqContext: NatsRequestPayloadInterface,
  payload: any,
) => {
  console.log("🚀 ~ file: ResponseNatsTransport.ts:18 ~ payload:", payload.response.datas)
  if (payload?.err) responseError(req, reply, command, reqContext, payload);
  else if (payload.response) await responseSuccess(req, reply, command, reqContext, payload);
  else responseNotFound(req, reply, command, reqContext);
};

const responseError = (
  req: FastifyRequestWithContext,
  reply: FastifyReply,
  command: string,
  reqContext: NatsRequestPayloadInterface,
  payload: any,
): void => {
  const response = {
    date: new Date(),
    statusCode: +payload.err?.statusCode || 500,
    error: {
      code: payload.err?.context?.error?.code,
      message: payload.err.message || payload.err.status,
    },
  };
  if (displayContext()) {
    reply.code(+payload.err?.statusCode || 500).send({
      ...response,
      context: {
        req: {
          command,
          ability: req.context.config.ability,
          urlFrom: req.url,
          ...reqContext,
          idGateway: reply.request.id,
        },
        target: payload.err.context,
      },
    });
  } else {
    reply.code(+payload.err?.statusCode || 500).send(response);
  }
};

const responseSuccess = async (
  req: FastifyRequestWithContext,
  reply: FastifyReply,
  command: string,
  reqContext: NatsRequestPayloadInterface,
  payload: any,
): Promise<void> => {
  req.context.response = payload.response.datas;
  if (req.context.config.postHandler) {
    payload.response.datas = await req.context.config.postHandler.call(this, req, reply);
  }
  let response = getSuccessResponseFormatted(req, reply, command, reqContext, payload);
  if (await setCache(req, response)) reply.code(+payload.response.statusCode || 200).header('etag', req.context.cache.keys.cacheKey).send(response);
  else reply.code(+payload.response.statusCode || 200).send(response);
};

const getSuccessResponseFormatted = (
  req: FastifyRequestWithContext,
  reply: FastifyReply,
  command: string,
  reqContext: NatsRequestPayloadInterface,
  payload: any,
) => {

  const response = {
    date: new Date(),
    statusCode: +payload.status || 200,
    ...payload.response,
  };
  if (displayContext()) {
    response.context = {
      req: {
        command,
        urlFrom: req.url,
        ability: req.context.config.ability,
        ...reqContext,
        idGateway: reply.request.id,
      },
    };
  }
  return response;
};

const responseNotFound = (req: FastifyRequestWithContext, reply: FastifyReply, command: string, reqContext: NatsRequestPayloadInterface): void => {
  const response = {
    date: new Date(),
    statusCode: 404,
    error: {
      code: 'G-DFT-1',
      message: 'not found',
    },
  };
  if (displayContext()) {
    reply.code(404).send({
      ...response,
      context: {
        req: {
          command,
          ability: req.context.config.ability,
          urlFrom: req.url,
          ...reqContext,
          idGateway: reply.request.id,
        },
      },
    });
  } else {
    reply.code(404).send(response);
  }
};

const displayContext = (): boolean => {
  if (getEnv<boolean>('HIDE_CONTEXT_RESPONSE', false).toString() === 'true') return false;
  return getEnv('NODE_ENV') == 'development' || getEnv<boolean>('FORCE_DEBUG', false);
};

const setCache = async (req: FastifyRequestWithContext, response): Promise<boolean> => {
  if (req.context?.cache?.bypass) {
    response.cache = 'bypassed';
    return false;
  }
  if (!req.context?.cache?.used) return false;

  delete response.context;
  response.cacheExpire = addSeconds(req.context.config.cacheExpire);
  await req.redis.set(`${CACHE_RESPONSE_NAME}${req.context.cache.keys.cacheKey}`, Buffer.from(JSON.stringify({ key: req.context.cache.keys.cacheOrigin, response })), 'EX', req.context.config.cacheExpire);

  return true;
};




// TODO: make dedicated devTools endpoint
// const setCacheList = async (req: FastifyRequestWithContext) => {

//   let list = await req.redis.keys(`${CACHE_RESPONSE_NAME}*`)
//   const r = await Promise.all(
//     list.map(async (el) => {
//       console.log("🚀 ~ file: ResponseNatsTransport.ts:145 ~ list.map ~ el", el)
//       const expire = await req.redis.ttl(el);
//       console.log("🚀 ~ file: ResponseNatsTransport.ts:147 ~ list.map ~ expire", expire)
//       return `${el} : ${relativeTime(addSeconds(expire))}`;

//     }))
//   console.log("🚀 ~ file: ResponseNatsTransport.ts:145 ~ setCacheList ~ list", r)
//   //await req.redis.set(CACHE_LIST_KEY)

// }

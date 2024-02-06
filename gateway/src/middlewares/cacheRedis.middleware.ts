import { FastifyRequestWithContext, cacheContext, cacheKeysContext } from '@/definitions';
import { relativeTime } from '@/utils/date';
import { FastifyReply } from 'fastify';
import sha1 from 'crypto-js/sha1';
import { CACHE_RESPONSE_NAME, cacheConfigInterface } from '@/definitions/cache';


const cacheRedisMiddleware = async (config: cacheConfigInterface, req: FastifyRequestWithContext, reply: FastifyReply) => {
  req.context.cache = setDefaultCacheContext();
   // disable cache for now
  //if (req.headers.hasOwnProperty('x-bypass-cache')) {
    req.context.cache.bypass = true;
    return true;
  //}

  const { cacheOrigin, cacheKey } = getCacheKeys(config, req)
  const cache = await req.redis.get(`${CACHE_RESPONSE_NAME}${cacheKey}`);

  if (cache) {
    if (req.headers['if-none-match'] === cacheKey) reply.code(304).send()
    else handlerCacheResponse(cache, cacheKey, reply);
  }

  req.context.cache.keys = { cacheOrigin, cacheKey };
  return true;
};

const handlerCacheResponse = (cache: string, cacheKey: string, reply: FastifyReply): void => {
  const cacheDatas = JSON.parse(cache);
  cacheDatas.response.cache = {
    used: true,
    expireTime: cacheDatas.response.cacheExpire,
    expireReadable: relativeTime(cacheDatas.response.cacheExpire),
    cacheOriginSlug: cacheDatas.key
  };
  delete cacheDatas.response.cacheExpire;

  reply.code(200)
    .header('etag', cacheKey) // Add Etag header (working with If-None-Match header)
    .send({ ...cacheDatas.response, date: new Date() });
}

const setDefaultCacheContext = (): cacheContext => {
  return {
    bypass: false,
    used: true
  } as cacheContext;
}

const getCacheKeys = (config: cacheConfigInterface, req: FastifyRequestWithContext): cacheKeysContext => {
  let key = `${config.id}:`;
  key = serializeAppParams(key, config.config, req.headers); // for APP Proxi Object elements
  key = serializeReqParams(key, config.config, req.params); // for PARAMS req elements
  console.log("🚀 ~ file: cacheRedis.middleware.ts:53 ~ getCacheKeys ~ key", key)

  return {
    cacheOrigin: `${key}${serializeReqQuery(req.query)}`,
    cacheKey: `${sha1(key).toString()}${serializeReqQuery(req.query)}`
  }
}

const serializeAppParams = (key: string, config: cacheConfigInterface['config'], reqHeaders: FastifyRequestWithContext['headers']): string => {
  console.log("🚀 ~ file: cacheRedis.middleware.ts:62 ~ serializeAppParams ~ reqHeaders", reqHeaders)
  key += reqHeaders['proxi-appid'] ? `${reqHeaders['proxi-appid'].toString()}:` : '';
  if (config.hasOwnProperty('useCliendId') && config.useCliendId === true) key += reqHeaders['proxi-clientid'] ? `${reqHeaders['proxi-clientid'].toString()}:` : '';
  return key;
}

const serializeReqQuery = (reqQuery: FastifyRequestWithContext['query']): string => {
  const query = Object.entries(reqQuery);
  let key = '';
  if (query.length > 0) {
    key += 'q='
    for (const q of query) key += `${q.join('-')},`
    key = key.slice(0, -1)
  }
  return key;
}

const serializeReqParams = (key: string, config: cacheConfigInterface['config'], reqParams: FastifyRequestWithContext['params']): string => {
  if (config.hasOwnProperty('params') && config.params.length > 0) {
    key += 'p='

    for (const param of config.params) key += reqParams[param] ? `${reqParams[param]},` : '';
    key = key.slice(0, -1)
    key += ':';
  }
  console.log("🚀 ~ file: cacheRedis.middleware.ts:84 ~ serializeReqParams ~ key", key)
  return key;
}



export default cacheRedisMiddleware;

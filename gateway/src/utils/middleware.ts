import { FastifyRequestWithContext } from "@/definitions";
import { Action, ConditionsInterface, ConditionsOperationsEnum, PermissionType, Subject } from "@/definitions/ability";
import { CACHE_SESSION_NAME, getCacheInterface } from "@/definitions/cache";
import { FastifyReply } from "fastify";
import { unauthorizedPayload } from "./response";

export const applyMiddleware = async (request: FastifyRequestWithContext, reply: FastifyReply, ...args: any[]) => {
  let passed = false;
  for (const middleware of args) {
    switch (middleware[0].name) {
      case 'JwtAbilityMiddleware':
        passed = await middleware[0].call(this, middleware[1], request, reply);
        break;
      case 'JwtAdminAbilityMiddleware':
        passed = await middleware[0].call(this, middleware[1], request, reply);
        break;
      case 'JwtAbilityWithConditionsMiddleware':
        passed = await middleware[0].call(this, middleware[1], middleware[2], request, reply);
        break;
      case 'cacheRedisMiddleware':
        passed = await middleware[0].call(this, middleware[1], request, reply);
        break;
      default:
        passed = await middleware[0].call(this, request, reply);
    }
    if (!passed) return false;
  }
  return true;
}

export const getCache = async (key: string, req: FastifyRequestWithContext, reply: FastifyReply): Promise<getCacheInterface> => {
  const cache = await req.redis.get(`${CACHE_SESSION_NAME}${key}`);
  if (!cache) reply.code(401).send(unauthorizedPayload('Unauthorized - JsonWebToken issue please signin again', 'NC-G-01'))
  return JSON.parse(cache);
}

export const permissionExist = (permissions: any, action: Action, subject: Subject): boolean => {
  return permissions.some((el: PermissionType) => {
    if (el[0] == 'manage' && el[1] == 'all') return true;  // TODO: CHECK SECU AND USAGE
    else if (el[0] && el[1] == 'all') return true;  // TODO: CHECK SECU AND USAGE
    else if (el[0] == 'manage' && el[1] === subject) return true;  // TODO: CHECK SECU AND USAGE
    else if (el[0] === action && el[1] === subject) return true;
    return false;
  })
}

export const conditionsProceed = (cache: getCacheInterface, conditions: ConditionsInterface, req: FastifyRequestWithContext): boolean => {
  return Object.entries(conditions).every(([key, value]) => {
    switch (key) {
      case 'id': return __proceedParamID(value, cache, req);
      case 'filter': return __proceedFilter(value, req);
      default: return true;
    }
  })
}




// dedicated process for :id process
export const __proceedParamID = (value: string, cache: getCacheInterface, request: FastifyRequestWithContext): boolean => {
  if (value !== cache.id) {
    request.context.filter = {
      args: {
        sessionId: cache.id,
        requestId: value,
      },
      type: ConditionsOperationsEnum.IS_EQUAL,
      result: false
    }
    return false;
  }
  return true;
}

// dedicated process for filter
export const __proceedFilter = (filter: any, request: FastifyRequestWithContext): boolean => {
  request.context.filter = filter;
  return true;
}



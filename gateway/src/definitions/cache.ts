import { getEnv } from "@/utils/validateEnv";

export const CACHE_DEFAULT_TTL = 60 * 10; // 10 min;
export const CACHE_HOUR_TTL = 60 * 60; // 60 min;
export const CACHE_DAY_TTL = 60 * 60 * 24; // 1 day;

export const CACHE_SESSION_NAME = `${getEnv<string>('APP_NAME', '')}${getEnv<string>('CACHE_SESSION_NAME', 'session_')}`
export const CACHE_RESPONSE_NAME = `${getEnv<string>('APP_NAME', '')}${getEnv<string>('CACHE_RESPONSE_NAME', 'response:')}`

export const CACHE_LIST_KEY = getEnv<string>('CACHE_LIST_KEY', 'cache_list');

export const SESSION_EXPIRATION = getEnv<number>('SESSION_EXPIRATION_MINUTES', 60 * 24);
export interface getCacheInterface {
  id: string;
  user: any;
  clients: [any],
  permissions: [[string, string]];
  app?: {
    id: string;
    name: string;
    status: string;
    type: number;
  }
};

export interface cacheConfigInterface {
  id: string,
  config: {
    params: string[];
    useCliendId?: boolean;
  }
}


export const CACHE_CONFIGS = {

  'ms-event': {
    "GET_EVENT_BY_ID": {
      params: ['eventId'],
      useCliendId: true,
    },
    "GET_EVENT_LANGUAGES":{
      params: ['eventId'],
      useCliendId: true,
    },
    "GET_EVENT_PACK":{
      params: ['eventId'],
      useCliendId: true,
    },
    "GET_ALL_CLIENT_EVENTS": {
      params: [],
      useCliendId: true,
    },
    "GET_LEGAL_BY_EVENT": {
      params: ['eventId'],
      useCliendId: true,
    },
    "GET_EVENT_CONFIG": {
      params: [],
      useCliendId: true,
    },
    "FILTER_EVENTS": {
      params: [],
      useCliendId: true,
    },
    "GET_PLACE_BY_ID": {
      params: ['placeId'],
      useCliendId: true,
    },
    "GET_DEFAULT_PLACE": {
      params: [],
      useCliendId: true,
    },
    "GET_CLIENT_PLACES": {
      params: [],
      useCliendId: true,
    },
    "GET_EVENT_PLACES": {
      params: ['eventId'],
      useCliendId: true,
    },
    "GET_SUBEVENT_BY_ID": {
      params: ['subEventId'],
      useCliendId: true,
    },
    "GET_ALL_SUBEVENTS_BY_EVENT": {
      params: ['eventId'],
      useCliendId: true,
    }
  },
  'ms-support': {
    "GET_SUPPORTS_BY_USER": {
      params: ['userId'],
      useCliendId: true,
    },
    "GET_CLIENT_SUPPORT": {
      params: [],
      useCliendId: true,
    },
    "GET_CLIENT_SUPPORT_BY_CLIENTID": {
      params: ['clientId'],
      useCliendId: true,
    },
    "GET_APP_SUPPORT": {
      params: [],
      useCliendId: false,
    },
    "GET_SUPPORT_BY_KEY": {
      params: ['key'],
      useCliendId: true,
    }
  },
  'ms-crm': {
    "GET_EXHIBITOR_BY_ID": {
      params: ['exhibitorId'],
      useClientId: true
    },
    "FIND_EXHIBITOR_GET": {
      params: [],
      useClientId: true
    },
    "GET_VISITOR_BY_ID": {
      params: ['exhibitorId'],
      useClientId: true
    },
    "FIND_VISITOR_GET": {
      params: [],
      useClientId: true
    },
    "GET_EXTRAFIELDS_BY_KEY": {
      params: ["key"],
      useClientId: true
    },
    "GET_COMPLETE_EXTRAFIELDS_FOR_VISITOR_OR_EXHIBITOR": {
      params: [],
      useClientId: true
    }
  },
  'ms-form': {
    "GET_AVAILABLE_PRESET_ELEMENTS": {
      params: ["formId"],
      useClientId: true
    },
    "GET_ALL_FORM_BY_TYPE_FOR_AN_EVENT": {
      params: [],
      useClientId: true
    },
    "GET_ONE_FORM": {
      params: ["formId"],
      useClientId: true
    },
    "GET_TEMPLATE_FORM_BY_TYPE": {
      params: [],
      useClientId: false
    },
    "GET_ONE_TEMPLATE_FORM": {
      params: ["templateFormId"],
      useClientId: false
    },
    "GET_ALL_PURCHASE_TUNNEL_BY_EVENT_ID": {
      params: ["eventId"],
      useClientId: false
    },
    "GET_ONE_PURCHASE_TUNNEL_BY_ID": {
      params: ["purchaseTunnelId"],
      useClientId: false
    }
  },
  'ms-configs': {
    "findConfigs": {
      params: [],
      useClientId: true
    },
    "findConfigsLight": {
      params: [],
      useClientId: true
    },
    "findOneConfig": {
      params: ["key"],
      useClientId: true
    },
    "findOneAppConfig": {
      params: ["key"],
      useClientId: false
    },
    "findOneValue": {
      params: ["key"],
      useClientId: true
    },
    "findOneValueFormatted": {
      params: ["key"],
      useClientId: true
    },
    "findConfigMultiValues": {
      params: [],
      useClientId: true
    },
    "findConfigMultiValuesByAdmin": {
      params: [],
      useClientId: false
    },
    "findOneConfigMultiValuesByAdmin": {
      params: ["key"],
      useClientId: false
    },
    "findOneConfigMultiValues": {
      params: ["key", "lang"],
      useClientId: true
    },
    "getClientPacks": {
      params: [],
      useClientId: true
    },
    "getAllPacks": {
      params: [],
      useClientId: false
    },
    "getOnePack": {
      params: ["_id"],
      useClientId: true
    },
  },
  'ms-list': {
    "findAllLists": {
      params: [],
      useClientId: true
    },
    "findOneDefaultList": {
      params: ["key", "lang"],
      useClientId: true
    },
    "findOneList": {
      params: ["key", "lang"],
      useClientId: true
    },
    "getListItemValue": {
      params: ["key", "lang"],
      useClientId: true
    },
  },
  'ms-shop': {
    "GENERATE_TICKET_TEST": {
      params: ["_id"],
      useClientId: true
    },
    "findOneTicket": {
      params: ["_id"],
      useClientId: true
    },
    "findTicketsByEventId": {
      params: ["_id"],
      useClientId: true
    },
    "getOneGoodie": {
      params: ["_id"],
      useClientId: true
    },
    "getAllGoodies": {
      params: [],
      useClientId: true
    },
    "getGoodiesByEvent": {
      params: ["_id"],
      useClientId: true
    },
    "getAvailableGoodiesByEvent": {
      params: ["_id"],
      useClientId: true
    },
    "findOneTicketTemplate": {
      params: ["_id"],
      useClientId: true
    },
    "findTemplateByTicketId": {
      params: ["_id"],
      useClientId: true
    },
    "findTicketTemplates": {
      params: [],
      useClientId: true
    },
  },
  "ms-price": {
    "findOnePrice": {
      params: ["_id"],
      useClientId: true
    },
    "getPricesForOneClient": {
      params: [],
      useClientId: true
    },
    "getPricesByEventId": {
      params: ["_id"],
      useClientId: true
    },
    "getPromosByEventId": {
      params: ["_id"],
      useClientId: true
    },
    "getOneById": {
      params: ["_id"],
      useClientId: true
    },
  }
}

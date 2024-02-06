# :tada: MS-GATEWAY V2

## UNDER CONSTRUCTION

Micro service dedicated to manage all logics regarding:
- Request transaction with private micro-service with :
  - http support
  - nats support
- Security gard ressource access
- Cache strategies



create .env file :

PORT=3005
NATS_DNS=51.83.105.174
NATS_PORT=14222
FASTIFY_LOGGER=true

docker run -p 4222:4222 -ti nats:latest nats en local

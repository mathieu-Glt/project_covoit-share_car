import { FastifyRequestWithContext, NatsRequestPayloadInterface, RequestPayloadLanguageInterface } from '@/definitions';
import { FastifyReply } from 'fastify';
import { connect, JSONCodec } from 'nats';
import { nanoid } from 'nanoid';
import { getEnv } from '@utils/validateEnv';
import { responseNatsFormatter } from './ResponseNatsTransport';
import Negotiator from 'negotiator';
export class NatsTransport {
  async processing(req: FastifyRequestWithContext, reply: FastifyReply) {

    try {

      const nats = await NatsTransport.__start();
      const command = getEnv<string>('APP_NAME', '') + req.context.config.command.toString();
      const payload = NatsTransport.__setPayload(req);
      const msg = await nats.request(command, JSONCodec().encode(payload), { timeout: getEnv<number>('NATS_TIMOUT', 50000) });


      return responseNatsFormatter(req, reply, command, payload, JSONCodec().decode(msg.data));
    } catch (error) {
      console.log("🚀 ~ file: nats.ts:17 ~ NatsTransport ~ processing ~ error", error)
      throw new Error(`NATS-processing: ${error.message}`);
    }
  }

  private static async __start(): Promise<any> {
    try {
      return await connect({ servers: [`nats://${getEnv<string>('NATS_DNS', 'nats')}:${getEnv<string>('NATS_PORT', '4222')}`] });
    } catch (error) {
      throw new Error(`NATS-start: ${error.message}`);
    }
  }

  private static __setPayload(req: FastifyRequestWithContext): any {
    return {
      id: nanoid(getEnv<number>('NATS_ID_LENGTH', 6)),
      data: {
        body: req.body || null,
        query: req.query || null,
        params: req.params || null,
        user: req?.user || null,
        app: req.context?.app || null,
        filter: req.context.filter || null,

      },
    };
  }

  private static __getLanguageNegotiator(req: FastifyRequestWithContext): RequestPayloadLanguageInterface {
    const negotiator = new Negotiator(req);
    return {
      browser: negotiator.language(),
      available: negotiator.languages()
    }
  }
}

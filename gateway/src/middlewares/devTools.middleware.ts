import { FastifyRequestWithContext } from '@/definitions';
import { enumRole } from '@/definitions/ability';
import { unauthorizedPayload } from '@/utils/response';
import { FastifyReply } from 'fastify';



const DevToolsMiddleware = async (req: FastifyRequestWithContext, reply: FastifyReply) => {

    // @ts-ignore
    if (process.env.NODE_ENV === 'development') {
        req.context.app = {
            // @ts-ignore
            appId: null,
        }
        return true;
    }

    reply.code(401).send(unauthorizedPayload('Unauthorized - Missing appId ', 'FMAI-01'))

};






export default DevToolsMiddleware;

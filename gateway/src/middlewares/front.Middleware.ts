import { FastifyRequestWithContext } from '@/definitions';
import { enumRole } from '@/definitions/ability';
import { unauthorizedPayload } from '@/utils/response';
import { FastifyReply } from 'fastify';



const FrontMiddleware = async (req: FastifyRequestWithContext, reply: FastifyReply) => {

    // @ts-ignore
    if (req.headers?.appid) {
        req.context.app = {
            // @ts-ignore
            appId: req.headers.appid,
        }
        req.user = {
            source: 'public',
            role: enumRole.VISITORS
        }
        return true;
    }
    reply.code(401).send(unauthorizedPayload('Unauthorized - Missing appId ', 'FMAI-01'))

};






export default FrontMiddleware;

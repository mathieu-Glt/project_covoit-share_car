
import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

/**
 * Interface for the response payload structure used for NATS communication.
 */
interface responsePayloadNatsInterface {
    paginate?: object;
    statusCode?: number;
    datas: any;
}

/**
 * Generates a response payload for NATS communication.
 * @param values - Data and additional information to include in the payload.
 * @returns A response payload conforming to responsePayloadNatsInterface.
 */
function responsePayloadNat(values: any): responsePayloadNatsInterface {
    // Initialize an empty payload object
    const payload = {} as responsePayloadNatsInterface;

    // Extract and set pagination details if provided
    if (values?.paginate) {
        payload.paginate = values.paginate;
        delete values.paginate;
    }

    // Extract and set status code if provided
    if (values?.code) {
        payload.statusCode = values.code;
        delete values.code;
    }
        
    // Determine the format of the data and set it in the payload
    if (values) {    
        payload.datas = Array.isArray(values) ? values : (Object.keys(values).length === 1 ? getFirstValue(values) : { ...JSON.parse(JSON.stringify(values)) })
    } else {
        payload.datas = null; // If no value is provided, set datas to null
    }

    return payload;
}

/**
 * Extracts the value of the first property from an object.
 * @param values - Object from which to extract the value.
 * @returns The value of the first property in the object.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function getFirstValue(values: Object): string {
    return values[Object.keys(values)[0]];
}

/**
 * Interceptor to handle successful responses for NATS communication.
 * This interceptor generates a standardized response payload using the responsePayloadNat function.
 */
@Injectable()
export class RpcSuccessInterceptor {
    /**
     * Intercepts the response and transforms it using the responsePayloadNat function.
     * @param _context - Execution context.
     * @param next - Next handler in the chain.
     * @returns Transformed Observable containing the standardized response payload.
     */
    intercept(_context: ExecutionContext, next: CallHandler) {
        return next
            .handle()
            .pipe(map(value => responsePayloadNat(value)));

    }
}


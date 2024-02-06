import { UserDocument } from "../Schema/user.schema";


class ResponseInterface {
    results?: UserDocument;
    error?: boolean;
    message: string;
    status: number;
}

export class ResponseSuccessInterface extends ResponseInterface {
    results?: UserDocument;
}

export class ResponseErrorInterface extends ResponseInterface {
    error?: boolean;
}
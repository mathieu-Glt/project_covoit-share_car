import { FileInfoInterface } from "./fileInfo.interface";

export class FileResponseInterface {
    message: string;   
    file: FileInfoInterface;
}

export class FilesResponseInterface {
    message: string;
    positionId: 'parent' | 'child';
    origin: FileInfoInterface;
    childs: FileInfoInterface[];
}
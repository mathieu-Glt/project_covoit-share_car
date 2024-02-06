import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FsUtil {
    constructor() { }


    async createDirectory(name: string): Promise<void> {
        await new Promise((resolve, reject) => {
            if (!fs.existsSync(`files/${name}`)) {
                fs.mkdir(`files/${name}`, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve('created');
                });
            }

        });
    }

    removeDirectory(name: string): void {
        fs.rmdirSync(`files/${name}`)
    }

    async readdir(dirname: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, (error, filenames) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(filenames);
                }
            });
        });
    };

}
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import * as path from 'path';

export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage;
    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: process.env.MONGO_DNS,
            file: (_req, file) => {              
                return new Promise((resolve, _reject) => {
                    const filename = file.originalname.trim();
                    resolve({
                        filename: `original_file_${Date.now()}${path.extname(filename)}`,
                        metadata: {
                            source: 'ext',
                            parent: 'origin',
                            originalname: filename
                        }
                    });
                });
            }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}
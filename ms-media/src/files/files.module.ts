import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { FilesService } from './files.service'
import { FormatterUtil } from 'src/utils/formatter.util';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        })
    ],
    controllers: [FilesController],
    providers: [GridFsMulterConfigService, FilesService, FormatterUtil],
})
export class FilesModule { }
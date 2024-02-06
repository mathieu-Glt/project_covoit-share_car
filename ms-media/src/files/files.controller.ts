import { Post, Get, Param, Res, Controller, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Body, Delete } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilesService } from './files.service';
import { FileResponseInterface, FilesResponseInterface } from './interfaces/fileResponse.interface';
import { FormatterUtil } from 'src/utils/formatter.util';
import { deleteFileInterface } from './interfaces/deleteFile.interface';


@Controller('/media')
export class FilesController {
    constructor(
        private filesService: FilesService,
        private eventEmitter: EventEmitter2,
        private formatterUtil: FormatterUtil
    ) { }

    @Post('')
    @UseInterceptors(FilesInterceptor('file'))
    async upload(@UploadedFiles() files, @Body() body: any) {

        return await Promise.all(
            files.map(async (file: any) => {
                console.log("🚀 ~ file: files.controller.ts:37 ~ FilesController ~ files.map ~ file", file)
                if (body.lowProcess && body.lowProcess == "true") {
                    const [result] = await this.eventEmitter.emitAsync('file.created', { body, file });
                    
                    result.shift();
                    return {
                        origin: this.formatterUtil.getOrigin(file),
                        childs: result
                    }
                }
                this.eventEmitter.emit('file.created', { body, file });
                return this.formatterUtil.getOrigin(file)

            })
        )
    }

    @Get('info/:id')
    async getFileInfo(@Param('id') id: string): Promise<FileResponseInterface> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been detected',
            file: file
        }
    }


    @Get('listFrom/:id')
    async getlistFrom(@Param('id') id: string): Promise<FilesResponseInterface> {
        const file = await this.filesService.findInfo(id)
        if (!file) throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        if (file.metadata.parent === 'origin') {
            const results = await this.filesService.findChildFilesFromParent(id)
            return {
                message: 'Files has been detected',
                positionId: 'parent',
                origin: file,
                childs: results
            }
        }
        return {
            message: 'Files has been detected',
            positionId: 'child',
            origin: await this.filesService.findInfo(file.metadata.parent),
            childs: await this.filesService.findChildFilesFromParent(file.metadata.parent)
        }
    }

    @Get('filename/:name')
    async getFileByFilename(@Param('name') name: string, @Res() res) {
        const file = await this.filesService.findInfoByFileName(name)
        const filestream = await this.filesService.readStream(file._id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }

    @Get('download/:id')
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)

        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res)
    }

    @Delete('/:id')
    async deleteFile(@Param('id') id: string, @Body() body: deleteFileInterface): Promise<FileResponseInterface> {

        const file = await this.filesService.findInfo(id)
        
        //if parent > supprimer le parents et les enfants
        if (file.metadata.parent == "origin"){
            let deleted = await this.filesService.deleteFile(id, true)
        } else {
            //if enfant > supprimer que l'enfant
            let deleted = await this.filesService.deleteFile(id)

        }
        this.eventEmitter.emit('file.deleted', { id, body, parent: file.metadata.parent })
        
        return {
            message: 'File has been deleted',
            file: file
        }
    }
}
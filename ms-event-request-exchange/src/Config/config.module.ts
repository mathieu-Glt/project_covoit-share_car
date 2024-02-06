import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [MongooseModule.forRoot(`${process.env.URI_BDD}?retryWrites=true&w=majority`)],
})
export class DatabaseModule {}
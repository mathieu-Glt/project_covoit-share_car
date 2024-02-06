import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [MongooseModule.forRoot(`${process.env.URI_BDD}?retryWrites=true&w=majority`)],
})
export class DatabaseModule { }
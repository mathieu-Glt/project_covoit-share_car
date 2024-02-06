import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'


export type RefreshTokenDocument = RefreshToken & Document
@Schema({ collection: 'refreshTokens', timestamps: true, versionKey: false, expires: '7d' })

export class RefreshToken {
    @Prop()
    refreshToken: string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)

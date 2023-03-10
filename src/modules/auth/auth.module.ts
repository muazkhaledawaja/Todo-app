/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: 'process.env.JWT_KEY',
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
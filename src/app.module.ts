/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

import config from 'config';

@Module({
  imports: [DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
    TasksModule,
    UsersModule,
  ],
})
export class AppModule { }

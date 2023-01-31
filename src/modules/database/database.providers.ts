/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { PROVIDERS, CONFIG } from '../../common/constants';

import { User } from '../users/user.model';
import { Task } from '../tasks/task.model';

export const databaseProviders = [{
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
        const sequelize = new Sequelize({
            ...configService.get(CONFIG.DATABASE),
        });
        sequelize.addModels([User, Task]);
        return sequelize;
    },
    inject: [ConfigService],
}];
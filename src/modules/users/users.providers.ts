/* eslint-disable prettier/prettier */
import { User } from './user.model';
import { USER_REPOSITORY } from '../../common/constants';

export const usersProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}];
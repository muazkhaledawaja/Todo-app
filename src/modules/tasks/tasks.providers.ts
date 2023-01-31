/* eslint-disable prettier/prettier */
import { Task } from './task.model';
import { TASK_REPOSITORY } from '../../common/constants';

export const tasksProviders = [{
    provide: TASK_REPOSITORY,
    useValue: Task,
}];
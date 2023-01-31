/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from 'class-validator';

export class TaskDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;
}
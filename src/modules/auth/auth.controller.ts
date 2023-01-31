/* eslint-disable prettier/prettier */
import { Controller, Body, Post, UseGuards } from '@nestjs/common';
 
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
 
import { JwtGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
 
export class AuthController {
    constructor(private authService: AuthService) { }

//    @UseGuards(JwtGuard)
    @Post('login')
    async login(@Body() user: UserDto) {
 
        return await this.authService.login(user);
    }

  
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.signup(user);
    }
}
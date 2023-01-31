// import { sign } from 'jsonwebtoken';
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string) {
        // find if user exist with this email
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new HttpException(
                {
                    statusCode: 404,
                    message: 'user not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            throw new HttpException(
                {
                    statusCode: 401,
                    message: 'password not match',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        if (user && match) {
            return user;
        }
        return null;
    }

    public async login(user) {
        // find if user exist with this email
        const userExist = await this.userService.findOneByEmail(user.email);
        if (!userExist) {
            throw new HttpException(
                {
                    statusCode: 404,
                    message: 'email not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        // find if user password match
        const match = await this.comparePassword(user.password, userExist.password);
        if (!match) {
            throw new HttpException(
                {
                    statusCode: 401,
                    message: 'password not match',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        // tslint:disable-next-line: no-string-literal
        const {   ...result } = userExist['dataValues'];
        // generate token
        const token = await this.generateToken(user);
        return {result  , userToken: token };
    }

    public async signup(user) {
        const userExist = await this.userService.findOneByEmail(user.email);
        if (userExist) {
            throw new HttpException(
                {
                    statusCode: 409,
                    message: 'email already exist',
                },
                HttpStatus.CONFLICT,
            );
        }
        // hash the password
        const pass = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ ...user, password: pass });

        const {  ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);
        //delete password from the result


        // return the user and the token
        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
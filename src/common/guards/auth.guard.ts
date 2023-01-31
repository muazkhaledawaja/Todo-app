/* eslint-disable prettier/prettier */
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
    import { verifyToken } from '../utils';
 
  
  @Injectable()
  export class JwtGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      try {
        const { token } = request.headers;
        if (!token) {
          throw new HttpException('Please Login first', 401);
        }
      
          
        const verify = verifyToken(token);
        const { id } = verify as any;
  
        if (id) {
          request.userId = id;
          return true;
        }
  
        return false;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }
  
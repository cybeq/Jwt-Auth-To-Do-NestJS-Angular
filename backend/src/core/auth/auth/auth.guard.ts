import {CanActivate, ExecutionContext, Injectable, UnauthorizedException, Headers} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../../../constants";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService) {
  }
  canActivate( context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean>
  {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if(!authHeader){
      return false;
    }
    let payload;
    try{
      payload = this.jwtService.verify(authHeader, {secret:jwtConstants.secret})
    }catch(e){
      return false;
    }

    request.userId = payload.id;
    return true;
  }
}

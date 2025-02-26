import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();

        //checking the bearer which contains the access token
        const authorization = request.headers.authorization; 

        //extracting the access_token in the header
        const token = authorization?.split(' ')[1];

        if(!token){
            throw new UnauthorizedException();
        }

        try{
            //checking if the token is valid
            await this.jwtService.verifyAsync(token)
            return true;
        }catch(error){
            throw new UnauthorizedException()
        } 
    }
}
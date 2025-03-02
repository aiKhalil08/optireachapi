import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AgentsModule } from 'src/agents/agents.module';
import { Agent } from 'src/agents/entities/agent.entity';



@Module({
    imports: [
        JwtModule.registerAsync({
           useFactory: async () => ({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '30m'}
           })
        }),
        AgentsModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}

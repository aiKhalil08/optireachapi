import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AgentModule } from 'src/agent/agent.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [AgentModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: '30m'}
      })
    })
  ]
})
export class AuthModule {}

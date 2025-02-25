import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AgentModule } from 'src/agent/agent.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [AgentModule]
})
export class AuthModule {}

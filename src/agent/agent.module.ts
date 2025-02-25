import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entity/agent.entity';
import { Otp } from './entity/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Otp])],
  controllers: [AgentController],
  providers: [AgentService]
})
export class AgentModule {}

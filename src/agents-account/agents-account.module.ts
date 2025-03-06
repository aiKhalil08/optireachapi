import { Module } from '@nestjs/common';
import { AgentsAccountService } from './agents-account.service';
import { AgentsAccountController } from './agents-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/agents/entities/agent.entity';
import { AgentAccount } from './entities/agentAccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgentAccount, Agent])],
  providers: [AgentsAccountService],
  controllers: [AgentsAccountController]
})
export class AgentsAccountModule {}

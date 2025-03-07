import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { AgentOtp } from './entities/agentOtp.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { AgentAccount } from 'src/agents-account/entities/agentAccount.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Agent, AgentOtp, Transaction, AgentAccount]),
    ],
    controllers: [AgentsController],
    providers: [AgentsService],
    exports: [AgentsService, TypeOrmModule.forFeature([Agent])]
})
export class AgentsModule {}

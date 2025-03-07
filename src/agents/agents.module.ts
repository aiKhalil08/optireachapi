import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { AgentOtp } from './entities/agentOtp.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Agent, AgentOtp, Transaction]),
    ],
    controllers: [AgentsController],
    providers: [AgentsService],
    exports: [AgentsService, TypeOrmModule.forFeature([Agent])]
})
export class AgentsModule {}

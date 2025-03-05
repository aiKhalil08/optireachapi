import { Module } from '@nestjs/common';
import { AgentsAccountService } from './agents-account.service';
import { AgentsAccountController } from './agents-account.controller';

@Module({
  providers: [AgentsAccountService],
  controllers: [AgentsAccountController]
})
export class AgentsAccountModule {}

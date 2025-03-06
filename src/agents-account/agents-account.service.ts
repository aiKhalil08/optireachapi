import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Agent } from "src/agents/entities/agent.entity";
import { AgentAccount } from "./entities/agentAccount.entity";
import { CreateAgentAccountDto } from "./dto/create-agentsAccount.dto";

@Injectable()
export class AgentsAccountService {
    constructor(
        @InjectRepository(AgentAccount)
        private readonly agentAccountRepository: Repository<AgentAccount>,

        @InjectRepository(Agent)
        private readonly agentRepository: Repository<Agent>
    ) {}

    async create(createAgentAccountDto: CreateAgentAccountDto): Promise<AgentAccount> {
        // Check if agent already has an account
        const existingAccount = await this.agentAccountRepository.findOne({ where: { bvn: createAgentAccountDto.bvn } });

        if (existingAccount) {
            throw new ConflictException('Agent account already exists');
        }

        // Find the agent using BVN
        const agent = await this.agentRepository.findOne({ where: { bvn: createAgentAccountDto.bvn } });

        if (!agent) {
            throw new NotFoundException('Agent not found');
        }

        // Create the Agent Account
        const agentAccount = new AgentAccount();
        agentAccount.accountNumber = await this._generateUniqueAccountNumber();
        agentAccount.bvn = createAgentAccountDto.bvn;
        agentAccount.balance = 0;
        agentAccount.agent = agent; // Associate the account with the agent

        // Save the new agent account
        await this.agentAccountRepository.insert(agentAccount);
        return agentAccount;
    }

    //function to generate account number
    private async _generateUniqueAccountNumber(): Promise<string> {
        function generate() {
            return "3" + Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
        }

        let accountNumber: string;
        let isUnique = false;

        do {
            accountNumber = generate();
            const existingAccount = await this.agentAccountRepository.findOne({ where: { accountNumber } });
            isUnique = !existingAccount;
        } while (!isUnique);

        return accountNumber;
    }
}

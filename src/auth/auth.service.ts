import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentService } from 'src/agent/agent.service';
import { AgentLoginDto } from 'src/agent/dto/agent-login.dto';
import { Agent } from 'src/agent/entity/agent.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Agent)
        private readonly agentRepository:Repository<Agent>
    ){}

    //validating the user 
    async validateAgent(agentLoginDto: AgentLoginDto){
        const agent = await this.agentRepository.findOne({where: {email: agentLoginDto.email}});

         if(!agent){
            throw new BadRequestException('Agent not found')
        }

        //checking if the agent has a password before comparing it to the value in the database
        if (!agent.password) {
            throw new Error('No password found for this agent.');
        }
        const isPasswordValid =  await bcrypt.compare(agentLoginDto.password, agent.password)

        if(!isPasswordValid){
            throw new Error('Invalid password');
        }

        return agent
    }

    //returing the user
    async agentLogin(agentLoginDto: AgentLoginDto){
        const agent = await this.validateAgent(agentLoginDto)

        return {
            accessToken: 'fake-token',
            agentId: agent.id,
            agentName: agent.name
        }
    }


}

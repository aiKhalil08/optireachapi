import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentService } from 'src/agent/agent.service';
import { AgentLoginDto } from 'src/agent/dto/agent-login.dto';
import { Agent } from 'src/agent/entity/agent.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Agent)
        private readonly agentRepository:Repository<Agent>,
        private jwtService: JwtService
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

    //generating access token for the user
    async agentLogin(agentLoginDto: AgentLoginDto){
        const agent = await this.validateAgent(agentLoginDto)

        const paylaod = {email: agent.email, id: agent.id}

        const access_token = await this.jwtService.sign(paylaod)

        return{
            access_token: access_token,
            email: agent.email
        }
        
    }


}

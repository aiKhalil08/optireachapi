import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const RANDOMFIRSTNAMES = ['Tayo', 'Musa', 'Ifeanyi'];
const RANDOMLASTNAMES = ['Jide', 'Bala', 'Chukwuemeka'];

@Injectable()
export class AgentsService {
    constructor (
        @InjectRepository(Agent)
        private agentRepository: Repository<Agent>,
    ) {}

    async create(createAgentDto: CreateAgentDto): Promise<Agent> {
        console.log(createAgentDto)
        try {
            const existingUser = await this.agentRepository.findOne({
                where: {email: createAgentDto.email}
            });

            if (existingUser) {
                throw new ConflictException('Email already taken');
            }

            const agent = new Agent();
            Object.assign(agent, createAgentDto);

            // firstName and lastName are generated from bvn
            agent.firstName = RANDOMFIRSTNAMES[Math.floor(Math.random() * 3)];
            agent.lastName = RANDOMLASTNAMES[Math.floor(Math.random() * 3)];


            return await this.agentRepository.save(agent);
        } catch (error) {
            console.log(error)
            if (error instanceof ConflictException)
                throw error;

            throw new Error('Failed to create user');
        }
    }

  findAll() {
    return `This action returns all agents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}

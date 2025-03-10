import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Agent } from 'src/agents/entities/agent.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Agent)
        private readonly agentRepository: Repository<Agent>,
        private jwtService: JwtService
    ){}


    async signIn(loginDto: LoginDto) {
        const agent = await this.agentRepository.findOne({where: {email: loginDto.email}});

        if (!agent)
            throw new NotFoundException("User not found");

        // console.log(loginDto, agent)
        const isPasswordValid =  await bcrypt.compare(loginDto.password, agent.password);

        if (!isPasswordValid)
            throw new UnauthorizedException("Incorrect password");

        return {
            user: {
                firstName: agent.firstName,
                lastName: agent.lastName,
                email: agent.email,
                phoneNumber: agent.phoneNumber,
                tier: agent.tier,
                avatar: agent.imageUrl
            },
            access_token: await this._generateJwtToken(agent)
        };
    }

    private async _generateJwtToken(agent: Agent) {
        const payload = {
            sub: agent.id,
        };

        return await this.jwtService.signAsync(payload)
    }
}

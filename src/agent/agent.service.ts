import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './entity/agent.entity';
import { Repository } from 'typeorm';
import { CreateAgentDto } from './dto/create-agent-dto';
import { Otp } from './entity/otp.entity';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { Twilio } from 'twilio';
import * as nodemailer from 'nodemailer';



@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agent)
        private readonly agentRepository:Repository<Agent>,

        @InjectRepository(Otp)
        private readonly otpRepository:Repository<Otp>
    ){}
    

    private twilioClient = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    private twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    //settung up nodemailer
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    

    //creating a user
    async createAgent(createAgentDto: CreateAgentDto){

        //check if the agent exists
        const existingAgent = await this.agentRepository.findOne({where: {email: createAgentDto.email}})

        if(existingAgent){
            throw new BadRequestException('Agent with this email already exists.');
        }

        //create and save the agent
        const agent = this.agentRepository.create(createAgentDto);
        await this.agentRepository.save(agent)

        //generating otp
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otp = this.otpRepository.create({otp: otpCode, agent, expiresAt: new Date(Date.now() + 5 * 60000 ) })
        await this.otpRepository.save(otp)

        //sending otp via sms
        try{
            const response = await this.twilioClient.messages.create({
                body: `Your OTP is: ${otpCode}`,
                from: this.twilioPhone,
                to: createAgentDto.phoneNumber
            });
        }catch(error){
            throw new BadRequestException(`Twilio Error: ${error.message}`);
        }

        //sending otp via email
        try{
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: createAgentDto.email,
                subject: 'Your OTP Code',
                text: `Your OTP is ${otpCode}`,
                html: `<p>Your OTP code is : <strong>${otpCode}</strong></p>`
            })
        }catch(error){
            throw new BadRequestException('Failed to send OTP via Email')
        }

        return {message: 'Agent registered successfully, OPT sent'}
    }


    //confirming the otp
    async confirmOtp(verifyOtpDto: VerifyOtpDto){

        //getting the information about the otp the user entered
        const otpRecord = await this.otpRepository.findOne({
            where: {otp: verifyOtpDto.opt, isUsed: false},
            relations: ['agent']
        });

        //if the user enters an OTP that does not exist or it has expired
        if(!otpRecord || otpRecord.expiresAt.getTime() <  Date.now()){
            throw new BadRequestException('Invalid or expired OTP')
        }

        //changing the value of isUsed to true
        otpRecord.isUsed = true;
        await this.otpRepository.save(otpRecord);

        return {message: 'OPT is verified', agentEmail: otpRecord.agent.email}
    }

    //creating the user password
    async setPasword(setPasswordDto: SetPasswordDto){
        const email = await this.agentRepository.findOne({where: {email: setPasswordDto.email}});

        if(!email){
            throw new BadRequestException('Agent not found')
        }

        email.password = setPasswordDto.password
        await this.agentRepository.save(email)

        return {message: "Password set successfully"};
    }

    //getting all agents
    async findAll(){
        return await this.agentRepository.find({
            select: ['id', 'name', 'email', 'bvn'] //this excluded the passowrd
        })
    }

    
}

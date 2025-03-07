import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentOtp } from './entities/agentOtp.entity';
import * as nodemailer from 'nodemailer';
import twilio from "twilio";
import { VerifyEmailDto } from './dto/verify-email-dto';
import { VerifyPhoneDto } from './dto/verify-phone-dto';
import { SetPasswordDto } from './dto/set-password.dto';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { AgentAccount } from 'src/agents-account/entities/agentAccount.entity';

const RANDOMFIRSTNAMES = ['Tayo', 'Musa', 'Ifeanyi'];
const RANDOMLASTNAMES = ['Jide', 'Bala', 'Chukwuemeka'];

@Injectable()
export class AgentsService {
    constructor (
        @InjectRepository(Agent)
        private agentRepository: Repository<Agent>,

        @InjectRepository(AgentOtp)
        private agentOtpRepository: Repository<AgentOtp>,

        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,

        // @InjectRepository(Transaction)
        // private agentTransactionRepository: Repository<Transaction>,

        @InjectRepository(AgentAccount)
        private agentAccountRepository: Repository<AgentAccount>
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

            this._verifyBVN(createAgentDto.bvn);
            // firstName and lastName are generated from bvn
            agent.firstName = RANDOMFIRSTNAMES[Math.floor(Math.random() * 3)];
            agent.lastName = RANDOMLASTNAMES[Math.floor(Math.random() * 3)];

            // generate and insert email and sms otps in db
            const emailOtp = new AgentOtp();
            emailOtp.type = 'email';
            emailOtp.token = this._generateOtp();
            emailOtp.expiresAt = new Date(new Date().getTime() + (15 * 60 * 1000));

            const smsOtp = new AgentOtp();
            smsOtp.type = 'sms';
            smsOtp.token = this._generateOtp();
            smsOtp.expiresAt = new Date(new Date().getTime() + (15 * 60 * 1000));

            agent.otps = [emailOtp, smsOtp];

            this._sendEmailOtp(createAgentDto.email);
            this._sendSmsOtp(createAgentDto.phoneNumber);

            // return {status: true, message: "Email and SMS OTPs have been sent", agent: await this.agentRepository.save(agent)};
            return await this.agentRepository.save(agent);
        } catch (error) {
            console.log(error)
            if (error instanceof ConflictException)
                throw error;

            throw new Error(error.message);
        }
    }

    async verifyEmail(verifyEmailDto: VerifyEmailDto) {
        const agent = await this.agentRepository.findOne({
            where: {email: verifyEmailDto.email},
        });

        if (!agent)
            throw new NotFoundException('User not found');

        const emailOtp = await this.agentOtpRepository.findOne({
            where: {agent: {email: verifyEmailDto.email}, type: 'email', isUsed: false},
            order: {id: "desc"},
        });

        if (!emailOtp || emailOtp?.token !== verifyEmailDto.otp)
            throw new BadRequestException('Invalid OTP');

        if (emailOtp.expiresAt < new Date()) 
            throw new BadRequestException('OTP has expired');

        emailOtp.isUsed = true;
        emailOtp.usedAt = new Date();

        this.agentOtpRepository.save(emailOtp);
        agent.emailVerified = true;
        this.agentRepository.save(agent);

        return {status: true, message: "Email verification successful"};
    }

    async verifyPhoneNumber(verifyPhoneDto: VerifyPhoneDto) {
        const agent = await this.agentRepository.findOne({
            where: {phoneNumber: verifyPhoneDto.phoneNumber},
        });

        if (!agent)
            throw new NotFoundException('User not found');

        const smsOtp = await this.agentOtpRepository.findOne({
            where: {agent: {phoneNumber: verifyPhoneDto.phoneNumber}, type: 'sms', isUsed: false},
            order: {id: "desc"},
        });

        if (!smsOtp || smsOtp?.token !== verifyPhoneDto.otp)
            throw new BadRequestException('Invalid OTP');

        if (smsOtp.expiresAt < new Date()) 
            throw new BadRequestException('OTP has expired');

        smsOtp.isUsed = true;
        smsOtp.usedAt = new Date();

        this.agentOtpRepository.save(smsOtp);
        agent.phoneVerified = true;
        this.agentRepository.save(agent);

        return {status: true, message: "Phone number verification successful"};
    }

    async setPassword(setPasswordDto: SetPasswordDto) {
        const agent = await this.agentRepository.findOne({where: {id: setPasswordDto.id}});

        if (!agent)
            throw new NotFoundException('User not found');

        agent.password = await bcrypt.hash(setPasswordDto.password, +<string>process.env.BCRYPT_SALT_ROUNDS);

        this.agentRepository.save(agent);

        return {status: true, message: "Password has been set successfully"};
    }

    findAll() {
        return `This action returns all agents`;
    }

    findOne(id: number) {
        return `This action returns a #${id} agent`;
    }

    //function to find the last 10 transactions for a single agent
    // Function to find the last 10 transactions for a single agent
async findAgentTransactions(agentId: string) {
    // Check if the agent exists
    const agent = await this.agentRepository.findOne({ where: { id: agentId } });

    if (!agent) {
        throw new NotFoundException('Agent not found');
    }

    // Fetch the latest 10 transactions directly from the Transaction table
   const transactions = await this.transactionRepository.find({
    where: { agent: { id: agentId } },
    relations: ['agent', 'account', 'transactionType', 'transactionClass'], // Load related data
    order: { createdAt: 'DESC' }, // Sort by latest transactions
    take: 10, // Limit to 10 transactions
    });


    if (!transactions.length) {
        throw new NotFoundException('No transactions found for this agent');
    }

    return transactions;
}


    //function to find all the transactions for a single agent
    async findAllAgentTransaction(agentId: string, page: number, limit: number){
         console.log(`Agent ID: ${agentId}, Page: ${page}, Limit: ${limit}`); // Debugging line
        const agent = await this.agentRepository.findOne({
            where: { id: agentId },
        });
    
        if (!agent) {
            throw new NotFoundException('Agent not found');
        }

        // Fetch transactions with pagination
        const [transactions, total] = await this.transactionRepository.findAndCount({
            where: { agent: { id: agentId } },
            relations: ['agent', 'account', 'transactionType', 'transactionClass'],
            order: { createdAt: 'DESC' }, // Sort by latest transactions
            skip: (page -1) * limit,
            take: limit,
        });

        console.log(`Transactions returned: ${transactions.length}`); // Debugging line
        // Return paginated response
        return {
            transactions: transactions,
            totalTransactions: total,
            currentPage: page,
            totalPages: total > 0 ? Math.ceil(total / limit) : 0,
            pageSize: limit,
        };
    }

    //function to return agent balance
    async findAgentBalance(agentId: string){
        const agentBalance = await this.agentAccountRepository.findOne({
            where: {agent: {id: agentId}}
        })

        if(!agentBalance){
            throw new NotFoundException('Agent account not found');
        }

        return{ balance: agentBalance.balance};
    }


    update(id: number, updateAgentDto: UpdateAgentDto) {
        return `This action updates a #${id} agent`;
    }

    remove(id: number) {
        return `This action removes a #${id} agent`;
    }

    _generateOtp() {
        const array = [1,2,3,4,5,6].map(_ => Math.floor(Math.random() * 9));
        return array.join('');
    }

    // private _attachOtp(otpCode: string, owner: Agent | {type: 'email', email: string} | {type: 'phoneNumber', phoneNumber: string}) {
    //     if (owner instanceof Agent) {

    //     } else if (owner.type === 'email') {
    //         const emailOtp = new EmailVerificationOtp();
    //         emailOtp.code = otpCode;
    //         emailOtp.email = owner.email;
    //         emailOtp.expiresAt = new Date(new Date().getTime() + (15 * 60 * 1000));
    //         this.emailVerificationOtp.upsert(emailOtp, ['email']);
    //     }
    // }

    private _verifyBVN(bvn: string) {
        return true;
    }

    private async _sendEmailOtp(email: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const otpCode = this._generateOtp();

        try{
            // this._attachOtp(otpCode, {type: 'email', email})

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your OTP Code',
                text: `Your OTP is ${otpCode}`,
                html: `<p>Your OTP code is : <strong>${otpCode}</strong></p>`
            })
        }catch(error){
            console.log(error);
            throw new BadRequestException('Unable to send email verification OTP')
        }

    }

    private async _sendSmsOtp(phoneNumber: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const otpCode = this._generateOtp();

        try{
            // this._attachOtp(otpCode, {type: 'phoneNumber', phoneNumber})

            // await transporter.sendMail({
            //     from: process.env.EMAIL_USER,
            //     to: email,
            //     subject: 'Your OTP Code',
            //     text: `Your OTP is ${otpCode}`,
            //     html: `<p>Your OTP code is : <strong>${otpCode}</strong></p>`
            // })
        }catch(error){
            console.log(error);
            throw new BadRequestException('Unable to send SMS verification OTP')
        }

    }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AgentsModule } from './agents/agents.module';
import { Agent } from './agents/entities/agent.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: +<string>process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Agent],
        synchronize: true,
        options: {
            trustServerCertificate: true,
            encrypt: true
        },
    } as TypeOrmModuleOptions),
    AgentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

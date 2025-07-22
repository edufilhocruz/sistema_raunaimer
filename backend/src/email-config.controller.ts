import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailConfigService } from './email-config.service';
import { IsBoolean, IsInt, IsNotEmpty, IsString, IsEmail, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class EmailConfigDto {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsInt()
  @Type(() => Number)
  port: number;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  pass: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsBoolean()
  @Type(() => Boolean)
  secure: boolean;
}

@Controller('email-config')
export class EmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  @Get()
  async getConfig() {
    return this.emailConfigService.getConfig();
  }

  @Post()
  async saveConfig(@Body() data: EmailConfigDto) {
    return this.emailConfigService.saveConfig(data);
  }

  @Post('test')
  async testSend(@Body() body: { to: string, subject: string, text?: string, html?: string }) {
    return this.emailConfigService.sendMail(body);
  }
} 
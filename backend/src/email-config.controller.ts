import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailConfigService } from './email-config.service';

@Controller('email-config')
export class EmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  @Get()
  async getConfig() {
    return this.emailConfigService.getConfig();
  }

  @Post()
  async saveConfig(@Body() data: any) {
    return this.emailConfigService.saveConfig(data);
  }

  @Post('test')
  async testSend(@Body() body: { to: string, subject: string, text?: string, html?: string }) {
    return this.emailConfigService.sendMail(body);
  }
} 
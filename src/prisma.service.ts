import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  logger: Logger = new Logger(PrismaService.name, { timestamp: true });

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('prisma connected');
    } catch (error) {
      this.logger.error(error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    process.exit(1);
  }
}

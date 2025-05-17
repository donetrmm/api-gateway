import { Module } from '@nestjs/common';
import { BarbershopController } from './barbershop.controller';
import { BarbershopService } from './barbershop.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BarbershopController],
  providers: [BarbershopService],
})
export class BarbershopModule {}
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../configuration/configuration.module';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}

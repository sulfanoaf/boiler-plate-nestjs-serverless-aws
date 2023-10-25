import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { CommonModule } from './modules/common/common.module';

const dynamoDBInit = () => {
  return DynamooseModule.forRootAsync({
    imports: [ConfigurationModule],
    inject: [ConfigurationService],
    useFactory: (configService: ConfigurationService) => configService.dynamoDB,
  });
};

const typeOrmInit = () => {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigurationModule],
    inject: [ConfigurationService],
    useFactory: (configService: ConfigurationService) => configService.mysql,
  });
};

@Module({
  imports: [dynamoDBInit(), typeOrmInit(), CommonModule],
  providers: [],
})
export class AppModule {}

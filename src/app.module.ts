import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { UnprocessableEntityException } from './exceptions';
import { AllExceptionFilter } from './filters/all-exception.filter';
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
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        exceptionFactory: errors => new UnprocessableEntityException(errors),
      }),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}

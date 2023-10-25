import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  validate,
} from 'class-validator';
import { DynamooseModuleOptions } from 'nestjs-dynamoose';

@Injectable()
export abstract class ConfigServiceBase implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    const result = await validate(this);
    if (result.length > 0) {
      const errors = result.map(v => {
        return {
          property: v.property,
          constraints: v.constraints,
        };
      });

      throw new Error(
        `Configuration failed - Is there an environment variable missing?
        ${JSON.stringify(errors, null, 1)}`,
      );
    }
  }
}

export class ConfigurationServiceAbstract extends ConfigServiceBase {
  @IsString()
  public type: any;
  @IsString()
  @IsNotEmpty()
  public host: string;
  @IsString()
  @IsNotEmpty()
  public username: string;
  @IsString()
  public password: string;
  @IsNumber()
  @IsNotEmpty()
  public port: number;
  @IsString()
  @IsNotEmpty()
  public database: string;
  @IsBoolean()
  public logging: boolean;
}

@Injectable()
export class ConfigurationService extends ConfigurationServiceAbstract {
  constructor(private configService: ConfigService) {
    super();
    this.type = this.configService.get('boilerPlate.type');
    this.database = this.configService.get('boilerPlate.database');
    this.host = this.configService.get('boilerPlate.host');
    this.username = this.configService.get('boilerPlate.username');
    this.password = this.configService.get('boilerPlate.password');
    this.port = this.configService.get('boilerPlate.port');
    this.logging = this.configService.get('boilerPlate.logging');
  }

  get config() {
    return {};
  }

  get dynamoDB(): DynamooseModuleOptions {
    return {};
  }

  get mysql(): TypeOrmModuleOptions {
    return {
      type: this.type,
      host: this.host,
      username: this.username,
      password: this.password,
      port: this.port,
      database: this.database,
      logging: this.logging,
      entities: [],
    };
  }
}

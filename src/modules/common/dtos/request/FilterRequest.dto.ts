import { IsString } from 'class-validator';

export class FilterRequestDto {
  @IsString()
  filter: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: 'Phone must be a 10-digit number' })
  phone: string;
}

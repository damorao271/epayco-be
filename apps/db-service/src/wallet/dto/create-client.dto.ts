import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  IsOptional,
} from 'class-validator';
import { phoneRegex, documentRegex } from '../../utils/regex';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @Matches(documentRegex, { message: 'Document must be a valid ID' })
  document: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(phoneRegex, { message: 'Phone must be a 10-digit number' })
  phone: string;
}

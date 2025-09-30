import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';
import { phoneRegex } from '../../../../../shared/regex';

export class RegisterClientDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(phoneRegex, { message: 'Phone must be a 10-digit number' })
  phone: string;
}

import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { phoneRegex } from '../../../../../shared/regex';

export class PayDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsString()
  @IsNotEmpty()
  @Matches(phoneRegex, { message: 'Phone must be a 10-digit number' })
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

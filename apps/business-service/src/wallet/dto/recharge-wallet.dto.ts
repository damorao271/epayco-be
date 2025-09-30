import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { phoneRegex } from '../../../../../shared/regex';

export class RechargeWalletDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @Matches(phoneRegex, { message: 'Phone must be a 10-digit number' })
  phone: string;
}

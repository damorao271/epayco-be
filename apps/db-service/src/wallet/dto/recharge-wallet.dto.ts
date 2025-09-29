import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { phoneRegex } from '../../utils/regex';

export class RechargeWalletDto {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  @Matches(phoneRegex, { message: 'Phone must be a 10-digit number' })
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

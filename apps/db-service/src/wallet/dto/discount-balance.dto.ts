import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { documentRegex } from '../../utils/regex';

export class DiscountBalanceDto {
  @IsString()
  @IsNotEmpty()
  @Matches(documentRegex, { message: 'Document must be a valid ID' })
  document: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

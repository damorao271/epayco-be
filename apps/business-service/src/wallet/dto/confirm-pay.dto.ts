import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPayDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

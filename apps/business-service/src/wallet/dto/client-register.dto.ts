import { IsNotEmpty, IsEmail, IsString, IsPhoneNumber } from 'class-validator';

export class RegistroClienteDto {
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
  @IsPhoneNumber('CO') // Asumiendo formato de celular colombiano o el que se necesite
  phone: string;
}

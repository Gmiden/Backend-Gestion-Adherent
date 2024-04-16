import { PartialType } from '@nestjs/mapped-types';
import {
  IsAlphanumeric,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateUserDto {

  @IsString()
  @MinLength(2, { message: 'prenomRepresentantLegal doit avoir minumum 2 charactères.' })
  @IsNotEmpty()
  prenomRepresentantLegal: string;

  @IsString()
  @MinLength(2, { message: 'nomRepresentantLegal doit avoir minumum 2 charactères.' })
  @IsNotEmpty()
  nomRepresentantLegal: string;

  @IsInt()
  telRepresentantLegal: number;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsString()
  password: string;

  @IsString()
  ville: string;

  @IsString()
  Gouvernorat: string;

  @IsInt()
  matriculeFiscale: number;
}
export class ResponseDto {
  data: CreateUserDto;
  jwt: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

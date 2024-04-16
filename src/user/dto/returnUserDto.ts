import {
    IsAlphanumeric,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';
export class AdminDto {
    @IsString()
    @MinLength(2, { message: 'prenomRepresentantLegal must have atleast 2 characters.' })
    @IsNotEmpty()
    prenomRepresentantLegal: string;
  
    @IsString()
    @MinLength(2, { message: 'nomRepresentantLegal must have atleast 2 characters.' })
    @IsNotEmpty()
    nomRepresentantLegal: string;
  
    @IsInt()
    telRepresentantLegal: number;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric(null, {
      message: 'Username does not allow other than alpha numeric chars.',
    })
  
    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsString()
    ville: string;

    @IsString()
    Gouvernorat: string;

    @IsInt()
    matriculeFiscale: number;
  
}

import { PartialType } from '@nestjs/mapped-types';
import {IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateCotisationDto {
    @IsString()
    @MinLength(2, { message: 'nom must have at least 2 characters.' })
    @IsNotEmpty()
    type: string;
  
    @IsInt()
    montant: number;
}
export class UpdateCotisationDto extends PartialType(CreateCotisationDto) {}

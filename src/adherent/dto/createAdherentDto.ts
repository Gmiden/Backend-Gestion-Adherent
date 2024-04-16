import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, MinLength, IsDate, IsDateString } from 'class-validator';
enum AdherentState {
  ACTIVE = 'active',
  WAITING = 'en attente',
  REJECTED = 'rejeté',
}

enum AdherentEtat {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateAdherentDto {
  @IsString()
  @MinLength(2, { message: 'prenom must have at least 2 characters.' })
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @MinLength(2, { message: 'nom must have at least 2 characters.' })
  @IsNotEmpty()
  nom: string;

  @IsInt()
  tel: number;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid Email.' })
  email: string;

  @IsString()
  ville: string;

  @IsString()
  Gouvernorat: string;

  @IsDateString()
  dateInscription: Date;

  @IsEnum(AdherentState)
  state: AdherentState;

  @IsEnum(AdherentEtat)
  etat: AdherentEtat;
}
export class UpdateAdherentDto extends PartialType(CreateAdherentDto) {}

export class AdherentDTO {
  id: number;
  prenom: string;
  nom: string;
  tel: number;
  email: string; 
  dateInscription: Date;
  state: AdherentState;
  etat: AdherentEtat;
  adress: { ville: string; adresse: string };
}
export class AdressDto{
  ville: string; 
  adresse: string;
}
import { Adress } from "src/entities/adress.entity";
import { AdressDto } from "../dto/createAdherentDto";

export class AdresseMapper {
    static adresseToAdressDto(adress:Adress): AdressDto{
        const adressDto = new AdressDto();
        adressDto.adresse=adress.adresse;
        adressDto.ville=adress.ville;
     return adressDto;
    }

    }
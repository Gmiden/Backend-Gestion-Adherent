import { Adherent } from "src/entities/adherent.entity";
import { CreateAdherentDto } from "../dto/createAdherentDto";
import { Adress } from "src/entities/adress.entity";


export class AdherentMapper {
  static createAdherentDtoToEntity(dto: CreateAdherentDto): Adherent {
    const adherent = new Adherent();
    adherent.prenom = dto.prenom;
    adherent.nom = dto.nom;
    adherent.tel = dto.tel;
    adherent.mail = dto.email;
    adherent.dateInscription = dto.dateInscription;
    adherent.state = dto.state;
    adherent.etat = dto.etat;
    const adress = new Adress(); // Create a new Adress entity
    adress.ville = dto.ville;
    adress.adresse = dto.Gouvernorat;
    adherent.adress = adress;
    return adherent;
  }

  static adherentEntityToCreateAdherentDto(entity: Adherent): CreateAdherentDto {
    const dto = new CreateAdherentDto();
    dto.prenom = entity.prenom;
    dto.nom = entity.nom;
    dto.tel = entity.tel;
    dto.email = entity.mail;
    dto.dateInscription = entity.dateInscription;
    dto.state = entity.state;
    dto.etat = entity.etat;

    // Map address properties
    if (entity.adress) {
      dto.ville = entity.adress.ville;
      dto.Gouvernorat = entity.adress.adresse;
    }

    // You might want to map cotisationList as well if it's included in CreateAdherentDto
    // dto.cotisationList = ???;
    return dto;
  }
}

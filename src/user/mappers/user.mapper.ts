import { User } from 'src/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/createUserDto';

export class UserMapper {
    static createUserDtoToEntity(dto: CreateUserDto): User {
        const user = new User();
        user.email = dto.email;
        user.password = dto.password;
        user.prenomRepresentantLegal = dto.prenomRepresentantLegal;
        user.nomRepresentantLegal = dto.nomRepresentantLegal;
        user.telRepresentantLegal = dto.telRepresentantLegal;
        user.ville = dto.ville;
        user.Gouvernorat = dto.Gouvernorat;
        user.matriculeFiscale = dto.matriculeFiscale;
        // map other properties as needed
        return user;
      }
    
      static entityToCreateUserDto(user: User): CreateUserDto {
        const dto = new CreateUserDto();
        dto.email = user.email;
        dto.password = user.password;
        dto.prenomRepresentantLegal = user.prenomRepresentantLegal;
        dto.nomRepresentantLegal = user.nomRepresentantLegal;
        dto.telRepresentantLegal = user.telRepresentantLegal;
        dto.ville = user.ville;
        dto.Gouvernorat = user.Gouvernorat;
        dto.matriculeFiscale = user.matriculeFiscale;
        // map other properties as needed
        return dto;
      }
    
      static entityToUpdateUserDto(user: User): UpdateUserDto {
        const dto = new UpdateUserDto();
        dto.email = user.email;
        dto.prenomRepresentantLegal = user.prenomRepresentantLegal;
        dto.nomRepresentantLegal = user.nomRepresentantLegal;
        dto.telRepresentantLegal = user.telRepresentantLegal;
        dto.ville = user.ville;
        dto.Gouvernorat = user.Gouvernorat;
        dto.matriculeFiscale = user.matriculeFiscale;
        // map other properties as needed
        return dto;
      }
}
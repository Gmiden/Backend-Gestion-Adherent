import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Adherent } from 'src/entities/adherent.entity';
import { Adress } from 'src/entities/adress.entity';
import { Connection, DataSource, Repository, getConnection } from 'typeorm';
import { CreateAdherentDto, UpdateAdherentDto } from './dto/createAdherentDto';
import { AdherentMapper } from './mappers/adherent.mapper';
@Injectable()
export class AdherentService {

    private readonly logger = new Logger(AdherentService.name);

    adherents: any;
    constructor(
        @InjectRepository(Adherent) private readonly adherentRepository: Repository<Adherent>,
        @InjectRepository(Adress) private readonly adressRepository: Repository<Adress>,
        @InjectDataSource() private dataSource: DataSource,
    ) { }
    async create(createAdherentDto: CreateAdherentDto) {

        try {
            const adherentEntity = AdherentMapper.createAdherentDtoToEntity(createAdherentDto);
            await this.adressRepository.save(adherentEntity.adress);
            const savedAdherent = await this.adherentRepository.save(adherentEntity);
            return  AdherentMapper.adherentEntityToCreateAdherentDto(savedAdherent);
          } catch (error) {
            console.error('Error occurred while creating adherent:', error);
            throw new Error('Failed to create adherent');
          }    }

    async findAll() {
        return (await this.adherentRepository.find({ relations: ['adress'], order: { dateInscription: 'DESC' } })).map(adherent => AdherentMapper.adherentEntityToCreateAdherentDto(adherent));
    }

    async findOne(id: number) {
        const adherent = await this.adherentRepository.findOneBy({ id: id });
        if (!adherent) {
            throw new NotFoundException('Adherent not found');
        }
        return AdherentMapper.adherentEntityToCreateAdherentDto(adherent);
    }

    async update(id: number, updateAdherentDto: UpdateAdherentDto) {
        const adherent = await this.adherentRepository.findOneBy({ id: id });
        if (!adherent) {
            throw new NotFoundException('Adherent not found');
        }
        const dtoProperties = Object.keys(updateAdherentDto);
        for (const property of dtoProperties) {
            if (updateAdherentDto[property] !== null && updateAdherentDto[property] !== undefined) {
                if (property === 'ville' || property === 'Gouvernorat') {
                    adherent.adress[property] = updateAdherentDto[property];
                } else {
                    adherent[property] = updateAdherentDto[property];
                }
            }
        }
        // Save and return the updated adherent
        return this.adherentRepository.save(adherent);
    }
    async executeCustomQuery(nom: string, prenom: string, tel: string): Promise<Adherent[]> {
        // Utiliser TypeORM pour construire la requête de manière sécurisée
        const queryBuilder = this.adherentRepository.createQueryBuilder('adherent');

        if (nom !== undefined) {
            queryBuilder.andWhere('adherent.nom = :nom', { nom });
        }

        if (prenom !== undefined) {
            queryBuilder.andWhere('adherent.prenom = :prenom', { prenom });
        }

        if (tel !== undefined) {
            queryBuilder.andWhere('adherent.tel = :tel', { tel });
        }

        // Exécuter la requête et renvoyer les résultats
        const result = queryBuilder.getMany();
        this.logger.log(`Filtered Adherents: ${result}`);
        return result;

    }

    remove(id: number) {
        return this.adherentRepository
            .createQueryBuilder()
            .delete()
            .from(Adherent)
            .where('id = :id', { id })
            .execute()
            ;
    }
}

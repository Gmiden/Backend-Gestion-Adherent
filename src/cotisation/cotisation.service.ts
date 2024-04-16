import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCotisationDto, UpdateCotisationDto } from 'src/adherent/dto/createCotisationDto';
import { Adherent } from 'src/entities/adherent.entity';
import { Cotisation } from 'src/entities/cotisation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CotisationService {
    constructor(
        @InjectRepository(Adherent) private readonly adherentRepository: Repository<Adherent>,
        @InjectRepository(Cotisation) private readonly cotisationRepository: Repository<Cotisation>
    ) { }
    async findAdherentCotisations(adherentId: number) {
        const adherent = await this.adherentRepository.findOneBy({ id: adherentId });
        if (!adherent) {
            throw new NotFoundException('Adherent not found');
        }
        return this.cotisationRepository.find({ where: { adherent: { id: adherentId } } });

      }
      async createCotisation(adherentId: number, createCotisationDto: CreateCotisationDto): Promise<Cotisation> {
        const adherent = await this.adherentRepository.findOneBy({ id: adherentId });
        if (!adherent) {
            throw new NotFoundException('Adherent not found');
        }        
        const cotisation = this.cotisationRepository.create({ ...createCotisationDto, adherent:adherent});
        return this.cotisationRepository.save(cotisation);
      }
      async getCotisation(adherentId: number, cotisationId: number): Promise<Cotisation> {
        const cotisation = await this.cotisationRepository.findOne({ where: { id: cotisationId, adherent: { id: adherentId } } });
        if (!cotisation) {
          throw new NotFoundException('Cotisation not found');
        }
        return cotisation;
      }
      async updateCotisation(adherentId: number, cotisationId: number, updateCotisationDto: UpdateCotisationDto): Promise<Cotisation> {
        await this.cotisationRepository.update({ id: cotisationId, adherent: { id: adherentId } }, updateCotisationDto);
        return this.getCotisation(adherentId, cotisationId);
      }
    
      async deleteCotisation(adherentId: number, cotisationId: number): Promise<void> {
        const result = await this.cotisationRepository.delete({ id: cotisationId, adherent: { id: adherentId } });
        if (result.affected === 0) {
          throw new NotFoundException('Cotisation not found');
        }
      }
      async findAdherent(adherentId: number){
        const adherent = await this.adherentRepository.findOneBy({ id: adherentId });
        if (!adherent) {
            throw new NotFoundException('Adherent not found');
        }  
      }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Logger, NotFoundException } from '@nestjs/common';
import { AdherentService } from './adherent.service';
import { validate } from 'class-validator';
import { CreateAdherentDto, UpdateAdherentDto } from './dto/createAdherentDto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CotisationService } from 'src/cotisation/cotisation.service';
import { CreateCotisationDto } from './dto/createCotisationDto';
@Controller('adherent')
export class AdherentController {
    
  private readonly logger = new Logger(AdherentController.name);

  constructor(private readonly adherentService: AdherentService,
    private readonly cotisationService: CotisationService,
  ) {}
  @Post()
  create(@Body() createAdherentDto: CreateAdherentDto) {
    validate(createAdherentDto).then(errors => {
      if (errors.length > 0) {
          console.log('Validation failed. Errors: ', errors);
      } else {
          console.log('Validation successful. Adherent DTO is valid.');
      }
  });
    return this.adherentService.create(createAdherentDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  async filterAdherents(
    @Query('nom') nom: string,
    @Query('prenom') prenom: string,
    @Query('tel') tel: string,
  ) {
    const results = await this.adherentService.executeCustomQuery(nom, prenom,tel);
    
    // Enregistrer les résultats dans les journaux
    this.logger.log(`Filtered Adherents: ${JSON.stringify(results)}`);

    return results; 
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adherentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdherentDto: UpdateAdherentDto) {
    return this.adherentService.update(+id, updateAdherentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adherentService.remove(+id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/cotisations')
  getAdherentCotisations(@Param('id') id: string) {
    return this.cotisationService.findAdherentCotisations(+id);
  }
  @Post(':adherentId/cotisations')
  createCotisation(@Param('adherentId') adherentId: number, @Body() createCotisationDto: CreateCotisationDto) {
    return this.cotisationService.createCotisation(adherentId, createCotisationDto);
  }
}

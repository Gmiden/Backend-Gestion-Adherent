import { Module } from '@nestjs/common';
import { AdherentService } from './adherent.service';
import { AdherentController } from './adherent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adherent } from 'src/entities/adherent.entity';
import { Adress } from 'src/entities/adress.entity';
import { CotisationService } from 'src/cotisation/cotisation.service';
import { Cotisation } from 'src/entities/cotisation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adherent]),
  TypeOrmModule.forFeature([Adress]),
  TypeOrmModule.forFeature([Cotisation])],
  controllers: [AdherentController],
  providers: [AdherentService,CotisationService],
})
export class AdherentModule {}

import { Module } from '@nestjs/common';
import { CotisationController } from './cotisation.controller';
import { CotisationService } from './cotisation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotisation } from 'src/entities/cotisation.entity';
import { Adherent } from 'src/entities/adherent.entity';
import { AdherentService } from 'src/adherent/adherent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cotisation]),
  TypeOrmModule.forFeature([Adherent])],
  controllers: [CotisationController],
  providers: [CotisationService]
})
export class CotisationModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdherentModule } from './adherent/adherent.module';
import { CotisationModule } from './cotisation/cotisation.module';

import config from 'ormconfig';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(config), AuthModule, AdherentModule, CotisationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

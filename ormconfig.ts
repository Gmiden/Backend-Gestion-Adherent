import { AdherentMessagerie } from 'src/entities/adherent-messagerie.entity';
import { Adherent } from 'src/entities/adherent.entity';
import { Adress } from 'src/entities/adress.entity';
import { Attachement } from 'src/entities/attachement.entity';
import { Cotisation } from 'src/entities/cotisation.entity';
import { Messagerie } from 'src/entities/messagerie.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'GestionAdherent',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  entities: [User,Adherent,Adress,Attachement,Messagerie,AdherentMessagerie,Cotisation],
  synchronize: true,
};

export default config;

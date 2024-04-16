import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Adherent } from './adherent.entity';
import { Messagerie } from './messagerie.entity';

@Entity('adherent_messagerie')
export class AdherentMessagerie {
  @PrimaryColumn({ name: 'adherent_id' })
  adherent_id: number;

  @PrimaryColumn({ name: 'messagerie_id' })
  messagerie_id: number;

  @ManyToOne(
    () => Adherent,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn({ name: 'adherent_id' })
  adherent: Adherent;

  @ManyToOne(
    () => Messagerie,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn({ name: 'messagerie_id' })
  messagerie: Messagerie;
}

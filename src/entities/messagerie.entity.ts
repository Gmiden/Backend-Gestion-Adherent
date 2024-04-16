import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Attachement } from './attachement.entity';
import { Adherent } from './adherent.entity';
import { AdherentMessagerie } from './adherent-messagerie.entity';

@Entity()
export class Messagerie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' ,default: () => 'CURRENT_TIMESTAMP'})
  dateEnvoi: Date;

  @ManyToMany(
    () => Adherent,
    adherent => adherent.messages,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  adherents?: Adherent[];

  @OneToMany(() => Attachement, attachement => attachement.messagerie)
  attachements: Attachement[];
}
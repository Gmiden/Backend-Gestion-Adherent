import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Messagerie } from './messagerie.entity';

@Entity()
export class Attachement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @ManyToOne(() => Messagerie, messagerie => messagerie.attachements)
  messagerie: Messagerie;
}
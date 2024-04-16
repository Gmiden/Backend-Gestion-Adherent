import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adherent } from './adherent.entity';

@Entity()
export class Cotisation {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  montant: number;

  @Column({ type: 'varchar', length: 15 })
  type: string;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   date: Date;
   @ManyToOne(() => Adherent)
   @JoinColumn({ name: "adherent_id" })
   public adherent!: Adherent;
}

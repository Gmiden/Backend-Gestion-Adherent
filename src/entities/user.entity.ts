import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'varchar', length: 30 })
  prenomRepresentantLegal: string;

  @Column({ type: 'varchar', length: 30 })
  nomRepresentantLegal: string;

  @Column({ type: 'int', nullable: true })
  telRepresentantLegal: number | null;

  @Column({ type: 'varchar', length: 15 })
  ville: string;

  @Column({ type: 'varchar', length: 15 })
  Gouvernorat: string;

  @Column({ type: 'int' })
  matriculeFiscale: number;

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string; // Required

  @Column()
  name: string; // Requerido

  @Column({ unique: true })
  email: string; // Requerido

  @Column()
  phone: string; // Requerido

  @OneToOne(() => Wallet, (wallet) => wallet.client, {
    cascade: true,
  })
  @JoinColumn()
  wallet: Wallet;
}

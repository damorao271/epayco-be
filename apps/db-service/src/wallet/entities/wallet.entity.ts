import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  balance: number;

  @OneToOne(() => Client, (client) => client.wallet)
  client: Client;
}

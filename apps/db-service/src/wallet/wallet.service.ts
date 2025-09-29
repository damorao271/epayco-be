import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import {
  //  Repository,
  Connection,
} from 'typeorm';
import { Client } from './entities/client.entity';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    // @InjectRepository(Client)
    // private clientRepository: Repository<Client>,
    // @InjectRepository(Wallet)
    // private walletRepository: Repository<Wallet>,
    private connection: Connection, // For transaction management
  ) {}

  // 1. Register Client
  async createClient(data: any): Promise<Client> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newClient = queryRunner.manager.create(Client, data);
      const savedClient = await queryRunner.manager.save(newClient);

      // Create the associated wallet with a balance of 0
      const newWallet = queryRunner.manager.create(Wallet, {
        client: savedClient,
        balance: 0,
      });
      await queryRunner.manager.save(newWallet);

      await queryRunner.commitTransaction();
      return savedClient;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // Handling TypeORM duplication errors (e.g., document, email)
      if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(
          'The document or email are already registered.',
        );
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

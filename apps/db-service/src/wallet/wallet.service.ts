import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Client } from './entities/client.entity';
import { Wallet } from './entities/wallet.entity';

interface DiscountResult {
  wallet: Wallet;
  email: string;
}
@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
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

  // 2. Recharge Wallet
  async rechargeBalance(
    document: string,
    phone: string,
    amount: number,
  ): Promise<Wallet | null> {
    const client = await this.clientRepository.findOne({
      where: { document, phone },
      relations: ['wallet'],
    });

    if (!client) {
      throw new NotFoundException('Client not found or incorrect credentials.');
    }

    // Ensure concurrency with lock (SELECT FOR UPDATE)
    const result = await this.walletRepository
      .createQueryBuilder()
      .update(Wallet)
      .set({ balance: () => `balance + ${amount}` })
      .where('id = :walletId', { walletId: client.wallet.id })
      .execute();

    if (result.affected === 0) {
      throw new BadRequestException('Could not update the balance.');
    }

    // Returns the updated wallet (needs to be reloaded from the DB)
    let wallet = await this.walletRepository.findOne({
      where: { id: client.wallet.id },
      relations: ['client'],
    });
    return wallet;
  }

  // 3. Check Balance
  async getBalance(document: string, phone: string): Promise<number> {
    if (!document || !phone) {
      throw new BadRequestException('Document and phone are required.');
    }

    const client = await this.clientRepository.findOne({
      where: { document, phone },
      relations: ['wallet'],
    });

    if (!client) {
      throw new NotFoundException('Client not found or incorrect credentials.');
    }

    return client.wallet.balance;
  }

  // 4. Pay (Discount - Used in Confirmation)
  // Change this later for a 2 step discount with email send

  async discountBalance(
    document: string,
    amount: number,
  ): Promise<DiscountResult | null> {
    const client = await this.clientRepository.findOne({
      where: { document },
      relations: ['wallet'],
    });

    if (!client) {
      throw new NotFoundException('Client not found.');
    }

    // Validate balance (Although the main validation is in the Business Service,
    // a final check is done before the atomic operation).
    if (client.wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance for the purchase.');
    }

    // Atomic discount
    const result = await this.walletRepository
      .createQueryBuilder()
      .update(Wallet)
      .set({ balance: () => `balance - ${amount}` })
      .where('id = :walletId', { walletId: client.wallet.id })
      .execute();

    if (result.affected === 0) {
      throw new BadRequestException('Could not deduct the balance.');
    }

    // Returns the updated wallet
    return { wallet: client.wallet, email: client.email };
  }

  // 5. Get Email by Document
  async getEmailByDocument(document: string): Promise<string | null> {
    const client = await this.clientRepository.findOne({
      where: { document },
    });

    if (!client) {
      throw new NotFoundException('Client not found.');
    }

    return client.email;
  }
}

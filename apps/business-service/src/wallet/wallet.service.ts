import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ResponseDto, RegisterClientDto } from './dto';

// Interface for the payment session cache (simulated)
const DB_SERVICE_URL = `http://db-service:3000/db-api/wallet`; // Assumes the DB Service port

@Injectable()
export class WalletService {
  constructor(private httpService: HttpService) {}

  // Utility for standard response
  private buildResponse<T>(
    code: string,
    message: string,
    data: T | null = null,
  ): ResponseDto<T> {
    return { code, message, data };
  }

  // 1. Register Client
  async registerClient(data: RegisterClientDto): Promise<ResponseDto<any>> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${DB_SERVICE_URL}/register-client`, data),
      );
      return this.buildResponse(
        '200',
        'Cliente registrado exitosamente.',
        response.data,
      );
    } catch (error) {
      //   Handle DB Service errors (e.g., duplication 400)
      const dbError =
        error.response?.data?.message || 'Error registering the client.';
      return this.buildResponse('400', dbError, null);
    }
  }

  //   // 2. Recharge Wallet
  async rechargeWallet(
    document: string,
    phone: string,
    amount: number,
  ): Promise<ResponseDto<any>> {
    if (amount <= 0) {
      throw new BadRequestException('The recharge value must be positive.');
    }

    try {
      await lastValueFrom(
        this.httpService.post(`${DB_SERVICE_URL}/recharge`, {
          document,
          phone,
          amount,
        }),
      );
      return this.buildResponse('200', 'Recharge successful.', amount);
    } catch (error) {
      const dbError = error.response?.data?.message || 'Recharge failed.';
      return this.buildResponse('400', dbError, null);
    }
  }

  //   // 4. Check Balance
  async checkBalance(
    document: string,
    phone: string,
  ): Promise<ResponseDto<{ balance: number }>> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${DB_SERVICE_URL}/balance`, {
          params: { document, phone },
        }),
      );
      const balance = response?.data;

      return this.buildResponse('200', 'Balance inquiry successful.', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        balance,
      });
    } catch (error) {
      const dbError =
        error.response?.data?.message || 'Error checking balance.';
      return this.buildResponse('404', dbError, null);
    }
  }
}

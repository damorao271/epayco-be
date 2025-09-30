import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ResponseDto, RegisterClientDto } from './dto';

interface PaymentSession {
  sessionId: string;
  document: string;
  amount: number;
  token_confirm: string;
  expirationDate: Date;
}

// Interface for the payment session cache (simulated)
const sessionCache = new Map<string, PaymentSession>();
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

  async initiatePayment(
    document: string,
    phone: string,
    amount: number,
  ): Promise<ResponseDto<{ sessionId: string }>> {
    const minBalance = 0; // Assumes a minimum value for the test.

    if (amount <= 0 || amount < minBalance) {
      throw new BadRequestException('Invalid purchase amount.');
    }

    const { data: balance } = await this.checkBalance(document, phone);
    if (!balance || balance.balance < amount) {
      return this.buildResponse(
        '403',
        'Insufficient balance to make the payment.',
        null,
      );
    }

    const sessionId = require('uuid').v4(); // Generate unique session ID
    const token_confirm = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); // 6-digit token

    const sesion: PaymentSession = {
      sessionId,
      document,
      amount,
      token_confirm,
      expirationDate: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5 minutes
    };
    sessionCache.set(sessionId, sesion);

    // SIMULATE EMAIL SENDING:
    console.log(
      `[SIMULATED EMAIL]: Token ${token_confirm} sent to the user's email with document ${document}.`,
    );

    return this.buildResponse(
      '200',
      'Confirmation token sent to email. Use the session ID to confirm the purchase.',
      { sessionId },
    );
  }

  async confirmPayment(
    sessionId: string,
    token: string,
  ): Promise<ResponseDto<any>> {
    const sesion = sessionCache.get(sessionId);

    if (!sesion) {
      return this.buildResponse(
        '404',
        'Session ID not found or expired.',
        null,
      );
    }

    if (new Date() > sesion.expirationDate) {
      sessionCache.delete(sessionId);
      return this.buildResponse(
        '408',
        'The session has expired. Please try the payment again.',
        null,
      );
    }

    if (sesion.token_confirm !== token) {
      return this.buildResponse('401', 'Incorrect confirmation token.', null);
    }

    // Logic to deduct the balance, consuming the DB Service
    try {
      await lastValueFrom(
        this.httpService.post(`${DB_SERVICE_URL}/discount`, {
          document: sesion.document,
          amount: sesion.amount,
        }),
      );

      sessionCache.delete(sessionId); // End the session
      return this.buildResponse(
        '200',
        'Payment successful. Balance deducted.',
        null,
      );
    } catch (error) {
      // This captures errors like 'Insufficient balance' that come from the DB Service
      const dbError =
        error.response?.data?.message || 'Failed to deduct balance.';
      sessionCache.delete(sessionId); // For security, if the deduction fails, the session is invalidated.
      return this.buildResponse('400', dbError, null);
    }
  }
}

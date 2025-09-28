import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletDbServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

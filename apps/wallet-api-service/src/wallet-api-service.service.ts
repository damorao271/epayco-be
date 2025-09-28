import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletApiServiceService {
  getHello(): string {
    return 'Hello World! api service';
  }
}

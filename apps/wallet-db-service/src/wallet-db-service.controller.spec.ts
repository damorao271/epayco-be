import { Test, TestingModule } from '@nestjs/testing';
import { WalletDbServiceController } from './wallet-db-service.controller';
import { WalletDbServiceService } from './wallet-db-service.service';

describe('WalletDbServiceController', () => {
  let walletDbServiceController: WalletDbServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletDbServiceController],
      providers: [WalletDbServiceService],
    }).compile();

    walletDbServiceController = app.get<WalletDbServiceController>(WalletDbServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(walletDbServiceController.getHello()).toBe('Hello World!');
    });
  });
});

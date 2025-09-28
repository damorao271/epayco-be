import { Test, TestingModule } from '@nestjs/testing';
import { WalletApiServiceController } from './wallet-api-service.controller';
import { WalletApiServiceService } from './wallet-api-service.service';

describe('WalletApiServiceController', () => {
  let walletApiServiceController: WalletApiServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletApiServiceController],
      providers: [WalletApiServiceService],
    }).compile();

    walletApiServiceController = app.get<WalletApiServiceController>(WalletApiServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(walletApiServiceController.getHello()).toBe('Hello World!');
    });
  });
});

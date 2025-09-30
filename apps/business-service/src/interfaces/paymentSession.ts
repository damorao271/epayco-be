export interface PaymentSession {
  sessionId: string;
  document: string;
  amount: number;
  token_confirm: string;
  expirationDate: Date;
}

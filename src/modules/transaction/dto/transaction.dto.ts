import { PaymentMethod, TransactionType } from 'generated/prisma';

export type transactionOverviewResponseDTO = {
  id: string;
  amount: number;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  createdAt: Date;
};

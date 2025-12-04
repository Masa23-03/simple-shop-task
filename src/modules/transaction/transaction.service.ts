import { Injectable } from '@nestjs/common';
import { PaginatedResult, PaginationAndSortType } from 'src/types/util.types';
import { DatabaseService } from '../database/database.service';
import { transactionOverviewResponseDTO } from './dto/transaction.dto';
import { removeFields } from 'src/utils/object.util';
import { UserTransaction } from 'generated/prisma';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: DatabaseService) {}
  create(createTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async findAllMyTransactions(
    id: bigint,
    query: PaginationAndSortType,
  ): Promise<PaginatedResult<transactionOverviewResponseDTO>> {
    const pagination = this.prismaService.handleQueryPagination(query);
    const orderByQ = query.sortBy ?? 'createdAt';
    const transactions = await this.prismaService.userTransaction.findMany({
      ...removeFields(pagination, ['page']),
      where: { userId: id },
      orderBy: { [orderByQ]: 'desc' },
    });
    const count = await this.prismaService.userTransaction.count({
      where: { userId: id },
    });

    return {
      data: transactions.map(this.mapToTransactionOverviewDTO),
      ...this.prismaService.formatPaginationResponse({
        page: pagination.page,
        count: count,
        limit: pagination.take,
      }),
    };
  }

  private mapToTransactionOverviewDTO(
    transaction: UserTransaction,
  ): transactionOverviewResponseDTO {
    return {
      id: String(transaction.id),
      type: transaction.type,
      amount: Number(transaction.amount),
      paymentMethod: transaction.paymentMethod,
      createdAt: transaction.createdAt,
    };
  }
}

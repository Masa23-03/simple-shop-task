import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  paginationAndOrderBySchema,
  paginationSchema,
} from 'src/utils/api.util';
import type {
  PaginationAndSortType,
  PaginationQueryType,
} from 'src/types/util.types';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
  @Roles(['CUSTOMER'])
  @Get()
  findAllMyTransaction(
    @Req() request: Express.Request,
    @Query(new ZodValidationPipe(paginationAndOrderBySchema))
    query: PaginationAndSortType,
  ) {
    return this.transactionService.findAllMyTransactions(
      BigInt(request.user!.id),
      query,
    );
  }
}

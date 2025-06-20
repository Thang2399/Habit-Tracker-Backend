import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';

@Module({
  imports: [],
  providers: [PaginationService]
})

export class PaginationModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStoreController } from './book-store.controller';
import { BookStoreService } from './book-store.service';
import { BooksRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository])],
  controllers: [BookStoreController],
  providers: [BookStoreService],
})
export class BookStoreModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookStoreService } from './book-store.service';
import { BookStatus } from './book-status.enum';
import { AddBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';
import { Book } from 'src/book.entity';

@Controller('book-store')
export class BookStoreController {
  constructor(private bookStoreService: BookStoreService) {}

  @Get()
  getBooks(@Query() filterDto: GetBookFilterDto): Promise<Book[]> {
    return this.bookStoreService.getBooks(filterDto);
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookStoreService.getBookById(id);
  }

  @Post()
  addNewBook(@Body() addBookDto: AddBookDto) {
    return this.bookStoreService.addNewBook(addBookDto);
  }

  @Delete('/:id')
  deleteBookById(@Param('id') id: string): Promise<void> {
    return this.bookStoreService.deleteBookById(id);
  }

  @Patch('/:id/status')
  updateBookStatus(
    @Param('id') id: string,
    @Body('status') status: BookStatus,
  ): Promise<Book> {
    return this.bookStoreService.updateBookStatus(id, status);
  }
}

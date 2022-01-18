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
import { Book, BookStatus } from './book.model';
import { AddBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';

@Controller('book-store')
export class BookStoreController {
  constructor(private bookStoreService: BookStoreService) {}

  @Get()
  getBooks(@Query() filterDto: GetBookFilterDto): Book[] {
    if (Object.keys(filterDto).length) {
      return this.bookStoreService.getBooksWithFilters(filterDto);
    } else {
      return this.bookStoreService.getAllBooks();
    }
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): Book {
    return this.bookStoreService.getBookById(id);
  }

  @Post()
  addNewBook(@Body() addBookDto: AddBookDto) {
    return this.bookStoreService.addNewBook(addBookDto);
  }

  @Delete('/:id')
  deleteBookById(@Param('id') id: string): Book {
    return this.bookStoreService.deleteBookById(id);
  }

  @Patch('/:id/status')
  updateBookStatus(
    @Param('id') id: string,
    @Body('status') status: BookStatus,
  ): Book {
    return this.bookStoreService.updateBookStatus(id, status);
  }
}

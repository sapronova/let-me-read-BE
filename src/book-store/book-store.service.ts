import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book.entity';
import { BookStatus } from './book-status.enum';
import { BooksRepository } from './books.repository';
import { AddBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BookStoreService {
  constructor(
    @InjectRepository(BooksRepository)
    private booksRepository: BooksRepository,
  ) {}

  async getBookById(id: string): Promise<Book> {
    const bookById = await this.booksRepository.findOne(id);
    if (!bookById) {
      throw new NotFoundException(`Task with ID "${id}" is not found`);
    }
    return bookById;
  }

  async addNewBook(addBookDto: AddBookDto): Promise<Book> {
    return this.booksRepository.addNewBook(addBookDto);
  }

  async getBooks(filterDto: GetBookFilterDto): Promise<Book[]> {
    return this.booksRepository.getBooks(filterDto);
  }

  deleteBookById(id: string): Promise<void> {
    return this.booksRepository.deleteBookById(id);
  }
  updateBookStatus(id: string, status: BookStatus): Promise<Book> {
    return this.booksRepository.updateBookStatus(id, status);
  }
}

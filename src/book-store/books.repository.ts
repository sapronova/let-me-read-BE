import { Repository, EntityRepository } from 'typeorm';
import { Book } from 'src/book.entity';
import { AddBookDto } from './dto/create-book.dto';
import { BookStatus } from './book-status.enum';
import { NotFoundException } from '@nestjs/common';
import { GetBookFilterDto } from './dto/get-books-filter.dto';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  async getBookById(id: string): Promise<Book> {
    const bookById = await this.findOne(id);
    if (!bookById) {
      throw new NotFoundException(`Task with ID "${id}" is not found`);
    }
    return bookById;
  }

  async addNewBook(addBookDto: AddBookDto): Promise<Book> {
    const book: Book = this.create({
      ...addBookDto,
      status: BookStatus.UNREAD,
    });

    await this.save(book);
    return book;
  }

  async deleteBookById(id: string): Promise<void> {
    const deletedBook = await this.delete(id);

    if (deletedBook.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" is not found`);
    }
  }

  async updateBookStatus(id: string, status: BookStatus): Promise<Book> {
    const bookToBeUpdated: Book = await this.getBookById(id);
    bookToBeUpdated.status = status;

    return await this.save(bookToBeUpdated);
  }

  async getBooks(filterDto: GetBookFilterDto): Promise<Book[]> {
    const { status, search } = filterDto;
    const getBooksQuery = this.createQueryBuilder('book');

    if (status) {
      getBooksQuery.andWhere('book.status = :status', { status });
    }

    if (search) {
      getBooksQuery.andWhere(
        'LOWER(book.title) LIKE LOWER(:search) OR LOWER(book.description) LIKE LOWER(:search) OR LOWER(book.author) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const books = await getBooksQuery.getMany();

    return books;
  }
}

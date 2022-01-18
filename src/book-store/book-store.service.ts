import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Book, BookStatus } from './book.model';
import { AddBookDto } from './dto/create-book.dto';
import { GetBookFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BookStoreService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book {
    return this.books.find((book) => book.id === id);
  }

  getBooksWithFilters(filterDto: GetBookFilterDto): Book[] {
    const { status, search } = filterDto;
    let books = this.getAllBooks();
    if (status) {
      books = books.filter((book) => book.status === status);
      console.log(status);
    }
    if (search) {
      books = books.filter((book) => {
        if (
          book.title.toLowerCase().includes(search) ||
          book.description.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    return books;
  }

  deleteBookById(id: string): Book {
    const deletedBook = this.books.find((book) => book.id === id);
    this.books = this.books.filter((book) => book.id !== id);
    return deletedBook;
  }

  updateBookStatus(id: string, status: BookStatus): Book {
    const bookToBeUpdated = this.getBookById(id);
    bookToBeUpdated.status = status;
    return bookToBeUpdated;
  }

  addNewBook(addBookDto: AddBookDto): Book {
    const book: Book = {
      id: uuid(),

      status: BookStatus.UNREAD,
      ...addBookDto,
    };

    this.books.push(book);

    return book;
  }
}

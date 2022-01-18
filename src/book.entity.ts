import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BookStatus } from './book-store/book.model';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  status: BookStatus;

  @Column()
  genre: string;
}

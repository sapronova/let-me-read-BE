import { Module } from '@nestjs/common';
import { BookStoreModule } from './book-store/book-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStoreService } from './book-store/book-store.service';

@Module({
  imports: [
    BookStoreModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'myPassword',
      database: 'book-store',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [BookStoreService],
})
export class AppModule {}

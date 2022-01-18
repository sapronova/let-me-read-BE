import { Module } from '@nestjs/common';
import { BookStoreModule } from './book-store/book-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
})
export class AppModule {}

import { BookStatus } from '../book-status.enum';

export class GetBookFilterDto {
  status?: BookStatus;
  search?: string;
}

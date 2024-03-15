import { IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'Maximum length is 15 characters' })
  title: string;
  @IsNotEmpty()
  @MaxLength(50, { message: 'Maximum length is 50 characters' })
  description: string;
  @IsDate()
  @IsOptional()
  createDate;
}

import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak, choose a stronger password between 6 and 15 characters',
  })
  password: string;
}

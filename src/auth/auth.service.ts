import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../DTO/registerUser.dto';
import { UserEntity } from '../Entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from '../DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterUserDto) {
    const { userName, password } = registerDto;
    const hashed = await bcrypt.hash(password, 12);
    const salt = await bcrypt.getSalt(hashed);

    const user: UserEntity = new UserEntity();
    user.userName = userName;
    user.password = hashed;
    user.salt = salt;

    this.repo.create(user);
    try {
      return await this.repo.save(user);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, user was not created...',
      );
    }
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const { userName, password } = userLoginDto;

    const user = await this.repo.findOne({
      where: { userName },
    } as FindOneOptions<UserEntity>);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials...');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      const jwtPayload = { userName };
      const jwtToken = await this.jwtService.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid Credentials...');
    }
  }
}

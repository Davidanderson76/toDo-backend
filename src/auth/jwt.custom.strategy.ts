import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sdfsdfsdfsdfsdf',
    });
  }

  async validate(payload: { userName: string }) {
    const { userName } = payload;
    const user = await this.repo.findOne({
      where: { userName },
    } as FindOneOptions<UserEntity>);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

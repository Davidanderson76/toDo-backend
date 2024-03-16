import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}

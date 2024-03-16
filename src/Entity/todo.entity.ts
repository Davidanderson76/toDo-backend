import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: ToDoStatus;
  @Column()
  createDate: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.todos)
  user: UserEntity;

  @Column()
  userId: number;
}

export enum ToDoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN PROGRESS',
  COMPLETED = 'COMPLETED',
}

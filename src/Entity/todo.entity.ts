import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export enum ToDoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN PROGRESS',
  COMPLETED = 'COMPLETED',
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoStatus, TodoEntity } from '../Entity/todo.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTodoDto } from 'src/DTO/createTodo.dto';
import { UserEntity } from 'src/Entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllToDos(user: UserEntity) {
    const query = await this.repo.createQueryBuilder('todo');
    query.where(`todo.userId = :userId`, { userId: user.id });
    try {
      return await query.getMany();
    } catch (err) {
      throw new InternalServerErrorException('No todo found...');
    }
  }

  async createToDo(createToDoDTO: CreateTodoDto, user: UserEntity) {
    const todo: TodoEntity = new TodoEntity();
    const { title, description } = createToDoDTO;
    todo.title = title;
    todo.description = description;
    todo.status = ToDoStatus.OPEN;
    todo.createDate = new Date();
    todo.userId = user.id;
    this.repo.create(todo);
    try {
      return await this.repo.save(todo);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong while creating...',
      );
    }
  }

  async updateToDo(id: number, status: ToDoStatus, user: UserEntity) {
    try {
      await this.repo.update({ id, userId: user.id }, { status });
      return this.repo.findOne({ where: { id } } as FindOneOptions<TodoEntity>);
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteToDo(id: number, user: UserEntity) {
    const result = await this.repo.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException('ToDo not deleted...');
    } else {
      return { success: true };
    }
  }
}

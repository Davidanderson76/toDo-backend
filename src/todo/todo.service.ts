import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoStatus, TodoEntity } from '../Entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from 'src/DTO/createTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllToDos() {
    try {
      return await this.repo.find();
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong while getting All Todos...',
      );
    }
  }

  async createToDo(createToDoDTO: CreateTodoDto) {
    const todo: TodoEntity = new TodoEntity();
    const { title, description } = createToDoDTO;
    todo.title = title;
    todo.description = description;
    todo.status = ToDoStatus.OPEN;
    todo.createDate = new Date();
    this.repo.create(todo);
    try {
      return await this.repo.save(todo);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong while creating...',
      );
    }
  }

  async updateToDo(
    id: number,
    status: ToDoStatus,
  ): Promise<TodoEntity | undefined> {
    try {
      const toDoToUpdate = await this.repo.findOne({ where: { id } });
      if (!toDoToUpdate) {
        return undefined;
      }
      toDoToUpdate.status = status;
      await this.repo.save(toDoToUpdate);
      return toDoToUpdate;
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong while updating...',
      );
    }
  }

  async deleteToDo(id: number) {
    try {
      return await this.repo.delete({ id });
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong while deleting...',
      );
    }
  }
}

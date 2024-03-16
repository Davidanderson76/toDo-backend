import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '../DTO/createTodo.dto';
import { ToDoStatus } from 'src/Entity/todo.entity';
import { ToDoStatusValidationPipe } from '../pipes/ToDoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../Entity/user.entity';
import { User } from '../auth/user.decorator';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private readonly toDoService: TodoService) {}

  @Get()
  getAllTodos(@User() user: UserEntity) {
    return this.toDoService.getAllToDos(user);
  }

  @Post()
  createNewToDo(
    @Body(ValidationPipe) data: CreateTodoDto,
    @User() user: UserEntity,
  ) {
    return this.toDoService.createToDo(data, user);
  }

  @Patch(':id')
  updateToDo(
    @Body('status', ToDoStatusValidationPipe) status: ToDoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.toDoService.updateToDo(id, status, user);
  }

  @Delete(':id')
  deleteToDo(@Param('id') id: number, @User() user: UserEntity) {
    return this.toDoService.deleteToDo(id, user);
  }
}

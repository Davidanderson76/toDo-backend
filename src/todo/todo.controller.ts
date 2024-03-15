import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/createTodo.dto';
import { ToDoStatus } from 'src/Entity/todo.entity';
import { ToDoStatusValidationPipe } from 'src/pipes/ToDoStatusValidation.pipe';

@Controller('todo')
export class TodoController {
  constructor(private readonly toDoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.toDoService.getAllToDos();
  }

  @Post()
  createNewToDo(@Body(ValidationPipe) data: CreateTodoDto) {
    return this.toDoService.createToDo(data);
  }

  @Patch(':id')
  updateToDo(
    @Body('status', ToDoStatusValidationPipe) status: ToDoStatus,
    @Param('id') id: number,
  ) {
    return this.toDoService.updateToDo(id, status);
  }

  @Delete(':id')
  deleteToDo(@Param('id') id: number) {
    return this.toDoService.deleteToDo(id);
  }
}

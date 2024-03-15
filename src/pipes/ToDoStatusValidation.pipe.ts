import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ToDoStatus } from 'src/Entity/todo.entity';

export class ToDoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus: ToDoStatus[] = [
    ToDoStatus.COMPLETED,
    ToDoStatus.OPEN,
    ToDoStatus.IN_PROGRESS,
  ];

  transform(value: any): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status!`);
    }
    return value;
  }

  private isStatusValid(status: any): boolean {
    const index: number = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}

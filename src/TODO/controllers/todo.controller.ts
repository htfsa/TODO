import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Todo } from "../entities/todo.entity";
import { TodoService } from "../services/todo.service";

Controller('/todo')
export class TodoController {

    constructor(
        private readonly todoService: TodoService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    callCreate(@Body() todo: Todo): Promise<Todo> {
        return this.todoService.create(todo);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(@Body() todo: Todo) {
        return this.todoService.update(todo);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    callDelete(@Param('id', ParseUUIDPipe) id: string) {
        return this.todoService.delete(id);
    }
}
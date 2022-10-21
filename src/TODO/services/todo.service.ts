import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Todo } from "../entities/todo.entity";


@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>
    ) { }

    async create(todo: Todo): Promise<Todo> {
        return await this.todoRepository.save(todo);
    }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async update(todo: Todo): Promise<Todo> {
        const todoFound = await this.todoRepository.findOne({
            where: {
                id: todo.id
            }
        });

        if (!todoFound || !todo.id) {
            throw new HttpException('não tem todo', HttpStatus.NOT_FOUND);
        }

        return await this.todoRepository.save(todo);
    }

    async delete(id: string): Promise<DeleteResult> {
        const todoFound = await this.todoRepository.findOneBy({ id });

        if (!todoFound) {
            throw new HttpException('não tem todo', HttpStatus.NOT_FOUND);
        }

        return this.todoRepository.delete(id);
    }

}
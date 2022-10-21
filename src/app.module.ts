import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true
    }),
    todoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
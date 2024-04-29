import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AtGuard } from './common/guards';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { AnimeModule } from './anime/anime.module';
import { MailerModule } from './mailer/mailer.module';
import { GenreModule } from './genre/genre.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';

import { User } from './users/users.model';
import { AnimeTitle } from './anime/anime.model';
import { AnimeTag } from './tag/tag-anime.model';
import { AnimeGenre } from './genre/genre-anime.model';
import { AnimeComment } from './comment/comment-anime.model';
import { Tag } from './tag/tag.model';
import { Genre } from './genre/genre.model';
import { Comment } from './comment/comment.model';


@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        AnimeTitle,
        AnimeTag,
        AnimeGenre,
        AnimeComment,
        Tag,
        Genre,
        Comment
      ],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    ImagesModule,
    AnimeModule,
    MailerModule,
    GenreModule,
    TagModule,
    CommentModule
  ],
})
export class AppModule {}

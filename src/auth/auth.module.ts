import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy
  ],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({})
  ],
  exports: [
    AuthService,
    JwtModule,
  ]
})

export class AuthModule {}
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from 'src/common/common.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    CommonModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

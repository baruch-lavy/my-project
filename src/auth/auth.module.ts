
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AdminService } from '../admin/admin.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    UsersModule,
    JwtModule.register({
      global : true,
      secret : jwtConstants.secret,
      signOptions : { expiresIn : '60m'}
    }),
  ],
  providers: [
    AdminService,
    AuthService, {
    provide : APP_GUARD,
    useClass : AuthGuard
  }
],
  controllers: [AuthController],
  exports : [AuthService, AdminModule]
})

export class AuthModule {}

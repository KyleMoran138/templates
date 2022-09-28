import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const PRODUCTION = process.env.NODE_ENV === 'production';
const imports = [];

if (PRODUCTION) {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/client'),
    }),
  );
}

@Module({
  imports: [...imports, AuthModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

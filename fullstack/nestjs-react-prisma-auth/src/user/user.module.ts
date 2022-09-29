import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [CommonModule],
})
export class UserModule {}

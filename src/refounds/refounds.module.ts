import { Module } from '@nestjs/common';
import { RefoundsController } from './refounds.controller';
import { RefoundsService } from './refounds.service';

@Module({
  controllers: [RefoundsController],
  providers: [RefoundsService]
})
export class RefoundsModule {}

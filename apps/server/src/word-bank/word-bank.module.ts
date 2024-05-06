import { Module } from '@nestjs/common';
import { WordBankService } from './word-bank.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WordBankService],
  exports: [WordBankService],
})
export class WordBankModule {}

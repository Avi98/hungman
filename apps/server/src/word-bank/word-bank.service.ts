import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WORD_BANK_API } from '../utils/constants';

@Injectable()
export class WordBankService {
  constructor(private readonly fetch: HttpService) {}

  fetchWord(): Promise<string[]> {
    return this.fetch.axiosRef
      .get(WORD_BANK_API)
      .then((res) => res.data)
      .catch((e) => {
        //log to logging services
        console.log('fetchWord failed:', e);
      });
  }
}

import { Injectable } from '@angular/core';
import Call from '../models/call';
import CALLS from './mocks/data/calls.json';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  constructor() { }

  getCalls(): Call[] {
    return CALLS;
  }
 }
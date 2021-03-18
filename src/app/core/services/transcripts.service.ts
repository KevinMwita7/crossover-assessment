import { Injectable } from '@angular/core';
import { Transcripts } from '../models/transcripts';
import TRANSCRIPTS from './mocks/data/transcripts.json';

@Injectable({
  providedIn: 'root'
})
export class TranscriptsService {

  constructor() { }

  getTranscripts(): Transcripts {
    return TRANSCRIPTS;
  }
 }

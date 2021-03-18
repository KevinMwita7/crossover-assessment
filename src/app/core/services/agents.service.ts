import { Injectable } from '@angular/core';
import { Agent } from '../models/agent';
import AGENTS from './mocks/data/agents.json';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor() { }

  getAgents(): Agent[] {
    return AGENTS;
  }
 }

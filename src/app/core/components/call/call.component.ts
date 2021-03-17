import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Agent } from '../../models/agent';
import Customer from '../../models/customer';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() tableHeader: String = ""; // Dynamic table header
  @Input() category: String = ""; // Whether real or expected call
  @Input() sliderValue: number = 38; // The current value of the slider in the subHeader
  @Input() agents: Agent[] = []; // The complete list of agents
  @Input() customer: Customer[] = []; // The customer who made the call
  @Input() agent: Agent[] = []; // The agent who answered the call

  displayedColumns: string[] = [
    'time',
    'speaker',
    'sentence'
  ];

  // Calculate the time a message was sent
  calculateTime(timeFrom: number): String {
    return `0${Math.floor(timeFrom / 60)}:${timeFrom < 59 ? timeFrom : timeFrom % 60}`;
  }

  // Get the name of the sender
  getSender(channel: number) {
    // Get the customer's first name
    if(channel === 2) return this.customer[0].full_name.split(/\s+/)[0];
    else {
      // Details of the agent who answered the call
      let answererDetails = this.agents.filter((agent:Agent) => agent.agentID === this.agent[0].agentID);
      return channel === 1 ? answererDetails[0].fullName : "Unknown";
    };
  }

  constructor() { }

  ngOnInit(): void {
  }

}

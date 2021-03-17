import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Agent } from '../../models/agent';
import Customer from '../../models/customer';
import Script from '../../models/script';
import Transcript from '../../models/transcript';
import { Transcripts } from '../../models/transcripts';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  @Input() dataSource: Transcripts = new Transcripts();
  @Input() tableHeader: String = ""; // Dynamic table header
  @Input() category: String = ""; // Whether real or expected call
  @Input() sliderValue: number = 38; // The current value of the slider in the subHeader
  @Input() agents: Agent[] = []; // The complete list of agents
  @Input() customer: Customer[] = []; // The customer who made the call
  @Input() agent: Agent[] = []; // The agent who answered the call
  @Output() expectedScriptIndex = new EventEmitter<Number>(); // Update the parent element so as to highlight the matching comparison column
  @Input() matchingExpectedColumnIndex: Number = -1;

  displayedColumns: string[] = [
    'time',
    'speaker',
    'sentence'
  ];

  // From the provided transcript, determine which messages array to use
  get getDataSource() {
    if(this.category === "REAL") return this.dataSource.transcript;
    else return this.dataSource.script;
  }

  // Calculate the time a message was sent
  calculateTime(timeFrom: number): String {
    return `0${Math.floor(timeFrom / 60)}:${timeFrom < 59 ? timeFrom : timeFrom % 60 < 10 ? "0" + timeFrom % 60 : timeFrom % 60}`;
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

  // Get matching comparison of the current selected message
  getMatchingSentence = (transcript:Transcript): string => {
    let lineNumber = 1;
    // Only show tooltip for messages that meet the threshold or are in the REAL panel
    if(transcript.similarity * 100 < this.sliderValue || this.category === "EXPECTED") return "";
    // Search for matches from the intended speech panel if the user
    // hovers over the real call panels, else search the real call panel
    for(let el of this.dataSource.script) {
      if(el.sentence === transcript.matching_sentence) {
        return `${Math.round(transcript.similarity * 100)}% matching with line #${lineNumber} "${el.sentence}"`;
      }
      ++lineNumber;
    }
    return "";
  }

  // Highlight the matching message in the intended script panel
  matchingMessageIndex(transcript: Transcript) {
    if(transcript.similarity * 100 < this.sliderValue || this.category !== "REAL") return;
    let intendedScript = this.getMatchingSentence(transcript);
    if(!intendedScript) return;
    // Get the index of the # sign depicting the index of the matching intended script
    let indexOfPoundSign = intendedScript.indexOf("#");
    // Get the index of the first space after the index of the # sign
    let firstSpaceIndex = intendedScript?.substring(indexOfPoundSign).indexOf(" ");
    // Ignore the # sign at the beginning of the string.
    let match = intendedScript.substring(indexOfPoundSign + 1, indexOfPoundSign + firstSpaceIndex);
    // Subtract 1 since the index in the sentences are 1 based
    this.expectedScriptIndex.emit(Number(match) - 1);
  }

  // Reset the index of the message in comparison column to -1
  resetMatchingIndex() {
    this.expectedScriptIndex.emit(-1);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}

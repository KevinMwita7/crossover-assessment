import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Call from 'src/app/core/models/call';

import TemplateService from 'src/app/core/services/template.service';
import { MatSliderChange } from '@angular/material/slider';
import { MatSelectChange } from '@angular/material/select';
import { Transcripts } from 'src/app/core/models/transcripts';
import { AgentsService } from 'src/app/core/services/agents.service';
import { TranscriptsService } from 'src/app/core/services/transcripts.service';
import { Agent } from 'src/app/core/models/agent';
import { CallsService } from 'src/app/core/services/calls.service';

@Component({
    selector: 'app-analyzer',
    templateUrl: './analyzer.component.html',
    styleUrls: ['./analyzer.component.scss']
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {
    constructor(
        private _tplService: TemplateService,
        private _fb: FormBuilder,
        private agentsService: AgentsService,
        private transcriptsService: TranscriptsService,
        private callsService: CallsService
    ) {
        this._form = this._fb.group({
            agent: _fb.control(null),
            call: _fb.control({ value: null, disabled: true }),
            slider: _fb.control(38),
        });
    }

    ngAfterViewInit(): void {
        this._tplService.register('subHeader', this.subHeader);
    }

    ngOnInit(): void {
        this.getAgents();
        this.getTranscripts();
        this.getCalls();
    }

    displayedColumns: string[] = [
        'time',
        'speaker',
        'sentence'
    ];

    agents: Agent[] = [];
    transcripts: Transcripts = new Transcripts();
    calls: Call[] = [];
    // The index of the message in the expected messages column that
    // matches the message hovered over in the real messages column
    matchingExpectedColumnIndex:Number = -1;

    @ViewChild('subHeader')
    subHeader?: TemplateRef<any>;

    get form(): FormGroup {
        return this._form;
    }
    private _form: FormGroup;

    // Update the slider's formControl in real time
    updateSliderValue = (event: MatSliderChange): void => {
        if(event.value) {
            this._form.get("slider")?.setValue(event.value);
        }
    }

    // Highlight the script in the expected panel matching the one
    // currently hovered over in the expected panel
    highlightExpectedMessage(newIndex: Number) {
        this.matchingExpectedColumnIndex = newIndex;
    }

    // Filter the calls made by the selected agent
    get filterCalls(): Call[] {
        let agentFormControl = this._form.get("agent");
        let callFormControl = this._form.get("call");
        // Only enable the calls select element if there were calls made
        let filteredCalls = this.calls.filter((call:Call) => call.agent[0].agent_id === agentFormControl?.value);
        if(filteredCalls.length) callFormControl?.enable();
        else callFormControl?.disable();
        return filteredCalls;
    }

    // Return the slider's form control value
    get sliderValue(): number{
        return this.form.get('slider')?.value
    }

    // Reset the slider whenever the call changes
    handleCallChange = (event: MatSelectChange):void => {
        this.form.get('slider')?.setValue(38);
    }

    // Fetch the agents
    getAgents():void {
        this.agents = this.agentsService.getAgents();
    }

    // Fetch the transcript
    getTranscripts(): void {
        this.transcripts = this.transcriptsService.getTranscripts();
    }
    
    // Fetch the calls
    getCalls(): void {
        this.calls = this.callsService.getCalls();
    }
}
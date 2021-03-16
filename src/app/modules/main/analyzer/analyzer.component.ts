import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Call from 'src/app/core/models/call';

import TemplateService from 'src/app/core/services/template.service';
import Agents from 'src/app/core/services/mocks/data/agents.json';
import Calls from 'src/app/core/services/mocks/data/calls.json';
import Transcript from 'src/app/core/services/mocks/data/transcripts.json';
import { MatSliderChange } from '@angular/material/slider';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-analyzer',
    templateUrl: './analyzer.component.html',
    styleUrls: ['./analyzer.component.scss']
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
        'time',
        'speaker',
        'sentence'
    ];

    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    dataSourceRep: MatTableDataSource<any> = new MatTableDataSource();
    AGENTS = Agents;

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

    constructor(
        private _tplService: TemplateService,
        private _fb: FormBuilder
    ) {
        this._form = this._fb.group({
            agent: _fb.control(null),
            call: _fb.control({ value: null, disabled: true }),
            slider: _fb.control(38),
        });
    }

    ngOnInit(): void {
        this.dataSource.data = Transcript.transcript;
        this.dataSourceRep.data = Transcript.script;
    }

    ngAfterViewInit(): void {
        this._tplService.register('subHeader', this.subHeader);
    }

    // Filter the calls made by the selected agent
    get filterCalls(): Call[] {
        let agentFormControl = this._form.get("agent");
        let callFormControl = this._form.get("call");
        // Only enable the calls select element if there were calls made
        let filteredCalls = Calls.filter((call:Call) => call.agent[0].agent_id === agentFormControl?.value);
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
}

const MOCK_DATA = () => {
    const DATA: any[] = [];
    const SPEAKERS: string[] = [
        'Harvey',
        'Luke',
        'Unknown'
    ];

    let currentTime = 30;

    for (let i = 0; i < 100; i++) {
        const min = Math.floor(currentTime / 60);
        const sec = Math.floor(currentTime - min * 60);

        DATA.push({
            time: `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`,
            speaker: SPEAKERS[Math.floor(Math.random() * (SPEAKERS.length))],
            sentence: `This is a sample sentence #${i + 1}`
        });

        currentTime += (Math.random() *  10) + 5;
    }

    return DATA;
};

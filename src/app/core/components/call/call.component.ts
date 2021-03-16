import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  @Input() dataSource: any;
  @Input() tableHeader: String = "";

  displayedColumns: string[] = [
    'time',
    'speaker',
    'sentence'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

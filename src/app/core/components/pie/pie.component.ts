import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChange } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() id!: String; // The id of the pie chart in the template
  @Input() transcripts!: any[]; // The real or expected messages depending on the category
  @Input() sliderValue!: number; // The current slider value
  @Input() matches!: any;

  private svg:any;
  private width = 30;
  private height = 24;
  // The radius of the pie chart is half the smallest side
  private radius = 10;
  private colors:any;

  private createSvg(): void {
    this.svg = d3.select("figure#" + this.id)
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain([this.matchingPercentage.hits.toString(), this.matchingPercentage.misses.toString()])
    .range(["#5a5a71", "#eceff1"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: number) => d);

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie([
      this.matchingPercentage.hits, 
      this.matchingPercentage.misses
    ]))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d:any, i:any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
}

  get matchingPercentage(): {[propertyName: string]: number} {
    let matches = this.transcripts.filter(transcript => transcript.similarity * 100 >= this.sliderValue);
    return {
      "hits": Math.round(matches.length / this.transcripts.length * 100),
      "misses": 100 - Math.round(matches.length / this.transcripts.length * 100)
    };
  }

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    // Update the pie chart when the slider moves
    if(changes["sliderValue"] && !changes["sliderValue"].firstChange) {
      this.drawChart();
    }
  }

}

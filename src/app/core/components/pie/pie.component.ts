import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, AfterViewInit {
  @Input() id!: String; // The id of the pie chart in the template

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
  ];
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
    .domain(this.data.map(d => d.Stars.toString()))
    .range(["#5a5a71", "#eceff1"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
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

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

}

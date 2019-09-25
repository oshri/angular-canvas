import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnChanges,
  AfterViewInit,
  SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';
import { SvgElement, INode } from '../../models';
import { ColorsService } from '../../utils/colors/colors.service';
// Link for working demo : https://bl.ocks.org/jodyphelan/5dc989637045a0f48418101423378fbd

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  containerEl: any;
  canvasEl: any;
  canvasWidth: number;
  canvasHeight: number;
  d3Transform: d3.ZoomTransform;
  canvas2d: CanvasRenderingContext2D;

  data: INode[];

  constructor(private colorsService: ColorsService) {

  }

  @ViewChild('container', { read: ElementRef, static: true })
  container: ElementRef;

  ngOnInit(): void {
    this.containerEl = d3.select(this.container.nativeElement);
  }

  ngAfterViewInit(): void {
      this.setSvgDimensions();
      this.data = this.generateData();
      this.createCanvas(this.canvasWidth, this.canvasHeight);
    }

  private createCanvas(width: number, height: number): void {
      this.canvasEl = d3.select(this.container.nativeElement)
        .append('canvas')
        .classed('mainCanvas', true)
        .attr('width', width)
        .attr('height', height)
        .node();

      this.canvas2d = this.canvasEl.getContext('2d');

      this.updateCanvas(this.canvas2d, this.data);
  }

  private updateCanvas(context: CanvasRenderingContext2D, data: INode[]) {
    context.save();

    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    data.forEach((d: INode, i) => {
      context.beginPath();
      context.arc(d.x, d.y, 10, 0, 2 * Math.PI, true);
      context.fillStyle = this.colorsService.genColor();
      context.fill();
    });

    context.restore();
  }

  private setSvgDimensions() {
    const container: HTMLDivElement = this.container.nativeElement;
    this.canvasHeight = container.clientHeight;
    this.canvasWidth = container.clientWidth;
  }

  private generateData(): INode[] {
    const nodes = [];
    const r = 5;
    const space = 10;

    let n = 1;

    while (n < 20) {
      let point;

      point = {id: n.toString(), label: `NodeNumber ${n}`, x: (n * space) * r, y: this.canvasHeight / 2};

      nodes.push(point);
      n++;
    }

    console.log(nodes);
    return nodes;
  }

}

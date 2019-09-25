import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import * as d3 from "d3";
import { INode } from "../../models";
import { ColorsService } from "../../utils/colors/colors.service";
// Link for working demo : https://bl.ocks.org/jodyphelan/5dc989637045a0f48418101423378fbd

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"]
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  canvasEl: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;
  canvas2d: CanvasRenderingContext2D;
  transform: d3.ZoomTransform;
  data: INode[];

  constructor(private colorsService: ColorsService) {}

  @ViewChild("container", { read: ElementRef, static: true })
  container: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Init transform with default values.
    this.transform = d3.zoomIdentity;
    this.setSvgDimensions();
    this.data = this.generateData();
    this.createCanvas(this.canvasWidth, this.canvasHeight);
    this.enableZoom();
  }

  ngOnDestroy(): void {}

  private enableZoom() {
    d3.select(this.container.nativeElement).call(
      d3.zoom().on("zoom", () => {
        // Update this.transform value and update canvas
        this.transform = d3.event.transform;
        this.updateCanvas(this.canvas2d, this.data);
      })
    );
  }

  private createCanvas(width: number, height: number): void {
    this.canvasEl = d3
      .select(this.container.nativeElement)
      .append("canvas")
      .classed("mainCanvas", true)
      .attr("width", width)
      .attr("height", height)
      .node();

    this.canvas2d = this.canvasEl.getContext("2d");

    this.updateCanvas(this.canvas2d, this.data);
  }

  private updateCanvas(context: CanvasRenderingContext2D, data: INode[]) {
    context.save();

    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Set canvas translate and scale based on last this.transform value
    context.translate(this.transform.x, this.transform.y);
    context.scale(this.transform.k, this.transform.k);

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

      point = {
        id: n.toString(),
        label: `NodeNumber ${n}`,
        x: n * space * r,
        y: this.canvasHeight / 2
      };

      nodes.push(point);
      n++;
    }

    console.log(nodes);
    return nodes;
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  NgZone
} from '@angular/core';
import Konva from 'konva';

export interface INode {
  id: string;
  label: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-konva-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class KonvaCanvasComponent
  implements OnInit, AfterViewInit, OnDestroy {
  canvasEl: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;
  stage: Konva.Stage;
  nodesLayer: Konva.Layer;
  data: INode[];

  constructor(private ngZone: NgZone) {}

  @ViewChild('container', { read: ElementRef, static: true })
  container: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setSvgDimensions();
    this.data = this.generateData();
    this.drawStage();
    this.zoom();
  }

  ngOnDestroy(): void {}


  public drawStage(): void {
    this.stage = new Konva.Stage({
      container: this.container.nativeElement,
      width: this.canvasWidth,
      height: this.canvasHeight,
      draggable: true
    });

    this.nodesLayer = new Konva.Layer();

    const topNodes: number[] = [];

    this.data.forEach((node: INode) => {
      const nodeGroup = new Konva.Group({
        id: node.id.toString(),
        x: node.x,
        y: node.y
      });

      const mainCircle = new Konva.Circle({
        x: 0,
        y: 0,
        radius: 50,
        fill: 'black',
        strokeWidth: 5
      });

      nodeGroup.add(mainCircle);
      this.nodesLayer.add(nodeGroup);
  });

    this.stage.add(this.nodesLayer);
    this.stage.draw();
  }


  private zoom(): void {
    this.ngZone.runOutsideAngular(() => {
      const scaleBy = 1.01;

      this.stage.on('wheel', e => {
        e.evt.preventDefault();
        const oldScale = this.stage.scaleX();

        const mousePointTo = {
          x:
            this.stage.getPointerPosition().x / oldScale -
            this.stage.x() / oldScale,
          y:
            this.stage.getPointerPosition().y / oldScale -
            this.stage.y() / oldScale
        };

        const newScale =
          e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        this.stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x:
            -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) *
            newScale,
          y:
            -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) *
            newScale
        };
        this.stage.position(newPos);
        this.stage.batchDraw();
      });
    });
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

    while (n < 20000) {
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

    return nodes;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonvaCanvasComponent } from './components/canvas/canvas.component';
const COMPONENTS = [KonvaCanvasComponent];

@NgModule({
	imports: [CommonModule],
	exports: COMPONENTS,
	declarations: COMPONENTS
})
export class KonvaCanvasModule {}

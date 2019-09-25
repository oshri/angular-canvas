// tslint:disable: no-bitwise
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorsService {
    nextCol = 1;

    genColor() {
        const ret = [];

        if (this.nextCol < 16777215) {
            ret.push(this.nextCol & 0xff); // R
            ret.push((this.nextCol & 0xff00) >> 8); // G
            ret.push((this.nextCol & 0xff0000) >> 16); // B

            this.nextCol += 1;
        }

        return `rgb(${ret.join(',')})`;
    }
}

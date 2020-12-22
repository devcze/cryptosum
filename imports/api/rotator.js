export default class Rotator  {
    constructor(ar) {
        this.index = 0;
        this.ar = ar;
    }

    getVal() {
        console.log(this.ar.length);
        console.log(this.index);
        var ret = this.ar[this.index];
        this.index = (this.index + 1);
        console.log(this.index);
        if (this.index === this.ar.length) this.index = 0;
        return ret;
    }
}
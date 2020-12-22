'user strict'

class Stopwatch {
    start() {
        this.startTime = new Date().getMilliseconds();
    }

    stop() {
        this.stopTime = new Date().getMilliseconds();
    }

    getTime() {
        return this.stopTime - this.startTime;
    }

    getTimeWithMs() {
        return this.getTime() + " ms";
    }
}

export default Stopwatch;
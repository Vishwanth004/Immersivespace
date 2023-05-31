class MicrophoneRecorderWorklet extends AudioWorkletProcessor {
    constructor(e) {
        super(), this.port.onmessage = this.handleOnMessage.bind(this), this.processingBuffers = null, this.currentIndex = 0, this.currentBuffer = 0
    }
    handleOnMessage(e) {
        this.processingBuffers = [];
        for (var r = 0; r < 16; ++r) this.processingBuffers.push(new Float32Array(e.data.bufferLength))
    }
    process(e, r, s) {
        let t = e[0];
        if (t.length > 0) {
            let e = t[0];
            this.processingBuffers && this.processingBuffers.length > 0 && (this.processingBuffers[this.currentBuffer].set(e, this.currentIndex), this.currentIndex += e.length, this.currentIndex >= this.processingBuffers[this.currentBuffer].length && (this.port.postMessage(this.processingBuffers[this.currentBuffer]), this.currentIndex = 0, this.currentBuffer = (this.currentBuffer + 1) % this.processingBuffers.length))
        }
        return !0
    }
}
registerProcessor("recorder-worklet", MicrophoneRecorderWorklet);
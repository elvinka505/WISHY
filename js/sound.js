/*
Инициализирует Web Audio Context
Создаёт простые тона для
добавления желания
поздравления
 */
export class SoundPlayer {
    constructor() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.audioCtx = null;
        }
    }

    playAdd() {
        if (!this.audioCtx) return;
        const ctx = this.audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    }

    playCelebrate() {
        if (!this.audioCtx) return;
        const ctx = this.audioCtx;
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
            gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.12);
            osc.stop(ctx.currentTime + i * 0.12 + 0.28);
        });
    }
}

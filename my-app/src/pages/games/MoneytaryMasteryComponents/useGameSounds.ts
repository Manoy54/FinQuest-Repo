import { useCallback } from 'react';

export function useGameSounds() {
    const playSound = useCallback((type: 'correct' | 'wrong' | 'flip' | 'click') => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const now = ctx.currentTime;

        if (type === 'correct') {
            // A subtle, clean coin ping
            // Much softer (0.05 gain) and simpler
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now); // Clear high pitch
            osc.frequency.exponentialRampToValueAtTime(1450, now + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            // Very low volume ping
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

            osc.start(now);
            osc.stop(now + 0.4);

            // Tiny sparkle overtone
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(2800, now);

            osc2.connect(gain2);
            gain2.connect(ctx.destination);

            gain2.gain.setValueAtTime(0, now);
            gain2.gain.linearRampToValueAtTime(0.02, now + 0.02);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

            osc2.start(now);
            osc2.stop(now + 0.3);
        }
        else if (type === 'wrong') {
            // A dull, soft "thud" or "bonk" - not harsh
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'triangle'; // Softer than sawtooth, but audible
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.3); // Pitch drop

            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3); // Quick decay

            osc.start(now);
            osc.stop(now + 0.3);
        }
        else if (type === 'flip') {
            // Simulating a "whoosh" using white noise and filter
            // This sounds much more like a physical card moving
            const bufferSize = ctx.sampleRate * 0.3; // 300ms
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1; // White noise
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, now); // Start muffled
            filter.frequency.linearRampToValueAtTime(1200, now + 0.1); // Open up
            filter.frequency.linearRampToValueAtTime(200, now + 0.3); // Close down

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(now);
        }
        else if (type === 'click') {
            // crisp "pop"
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.start(now);
            osc.stop(now + 0.05);
        }

    }, []);

    return { playSound };
}

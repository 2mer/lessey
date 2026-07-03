let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
	if (!ctx) {
		try {
			ctx = new AudioContext()
		} catch {
			return null
		}
	}
	return ctx
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
	const c = getCtx()
	if (!c) return
	const osc = c.createOscillator()
	const gain = c.createGain()
	osc.frequency.value = freq
	osc.type = type
	gain.gain.value = volume
	gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
	osc.connect(gain)
	gain.connect(c.destination)
	osc.start()
	osc.stop(c.currentTime + duration)
}

export function playMunch() {
	playTone(300, 0.1, 'square', 0.1)
	setTimeout(() => playTone(200, 0.08, 'square', 0.08), 80)
}

export function playKiss() {
	playTone(600, 0.12, 'sine', 0.12)
	setTimeout(() => playTone(800, 0.15, 'sine', 0.1), 60)
}

export function playGuitar() {
	playTone(220, 0.3, 'sawtooth', 0.08)
	setTimeout(() => playTone(330, 0.25, 'sawtooth', 0.06), 150)
}

export function playThud() {
	playTone(60, 0.25, 'sine', 0.55)
	playTone(120, 0.08, 'triangle', 0.4)
}

export function playChew() {
	playTone(300 + Math.random() * 200, 0.05, 'sawtooth', 0.05)
}

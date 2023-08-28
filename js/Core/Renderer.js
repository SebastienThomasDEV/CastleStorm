export class Renderer {
	/** @type {HTMLCanvasElement} */
	#canvas;

	/** @type {CanvasRenderingContext2D} */
	#context;

	/** @type {?Number} */
	#requestId;

	/** @type {?Function} */
	#render;

	#loop = function() {
		try {
			this.#requestId = requestAnimationFrame(loop);

			this.#render();
		} catch (error) {
			this.pause();
		}
	};

	/** @param {HTMLCanvasElement} canvas */
	constructor(canvas) {
		this.#canvas = canvas;
		this.#context = this.#canvas.getContext("2d");
	}

	/** @returns {HTMLCanvasElement} */
	getCanvas() {
		return this.#canvas;
	}

	/** @param {HTMLCanvasElement} canvas */
	setCanvas(canvas) {
		this.#canvas = canvas;
	}

	/** @returns {CanvasRenderingContext2D} */
	getContext() {
		return this.#context;
	}

	/** @param {CanvasRenderingContext2D} context */
	setContext(context) {
		this.#context = context;
	}

	/** @returns {Function} */
	setRender(render) {
		this.#render = render;
	}

	run() {
		if (this.#render === null) throw ReferenceError("No render() bound");

		this.#loop.bind(this);
	}

	pause() {
		cancelAnimationFrame(this.#requestId);

		this.#requestId = null;
	}
}
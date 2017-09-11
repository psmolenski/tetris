class Canvas {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  public readonly viewportWidth: number;
  public readonly viewportHeight: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = <CanvasRenderingContext2D> canvas.getContext('2d');

    this.viewportWidth = this.canvas.width;
    this.viewportHeight = this.canvas.height;
  }

  get fillStyle() {
    return this.context.fillStyle;
  }

  set fillStyle(fillStyle) {
    this.context.fillStyle = fillStyle;
  }

  get strokeStyle() {
    return this.context.strokeStyle;
  }

  set strokeStyle(strokeStyle) {
    this.context.strokeStyle = strokeStyle;
  }

  get lineWidth() {
    return this.context.lineWidth;
  }

  set lineWidth(lineWidth) {
    this.context.lineWidth = lineWidth;
  }

  fillRect(x: number, y: number, width: number, height: number) {
    this.context.fillRect(x, y, width, height);
  }

  strokeRect(x: number, y: number, width: number, height: number) {
    this.context.strokeRect(x, y, width, height);
  }


}

export {Canvas};
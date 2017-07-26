class Canvas {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly scale: number = 10;
  public readonly viewportWidth: number;
  public readonly viewportHeight: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = <CanvasRenderingContext2D> canvas.getContext('2d');
    this.context.scale(this.scale, this.scale);

    this.viewportWidth = this.canvas.width / this.scale;
    this.viewportHeight = this.canvas.height / this.scale;
  }

  get fillStyle() {
    return this.context.fillStyle;
  }

  set fillStyle(fillStyle) {
    this.context.fillStyle = fillStyle;
  }

  fillRect(x: number, y: number, width: number, height: number) {
    this.context.fillRect(x, y, width, height);
  }


}

export {Canvas};
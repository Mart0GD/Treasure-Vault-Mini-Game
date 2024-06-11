import { Vector2 } from "pixi-spine";

export class Mouse {
    public static readonly isButtonDown: Map<number, boolean> = new Map<number, boolean>();
    public static mousePosition: Vector2;

    public static initialize(): void {
        document.addEventListener('mousedown', Mouse.mouseDown)
        document.addEventListener('mouseup', Mouse.mouseUp)
        document.addEventListener('mousemove', Mouse.trackMouse);

        document.addEventListener('contextmenu', (e) => e.preventDefault())
    }

    private static mouseDown(e: MouseEvent): void{
        Mouse.isButtonDown.set(e.button, true);
    }

    private static mouseUp(e: MouseEvent): void {
        Mouse.isButtonDown.set(e.button, false);
    }

    private static trackMouse(e: MouseEvent) {
        this.mousePosition = new Vector2(e.clientX, e.clientY);
    }

}
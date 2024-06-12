import { Vector2 } from "pixi-spine";

export class Input {
    public static readonly isMouseButtonDown: Map<number, boolean> = new Map<number, boolean>();
    public static readonly isKeyboardButtondown: Map<string, boolean> = new Map<string, boolean>();
    public static mousePosition: Vector2;

    public static initialize(): void {
        document.addEventListener('mousedown', Input.mouseDown)
        document.addEventListener('mouseup', Input.mouseUp)
        document.addEventListener('keydown', Input.keyDown)
        document.addEventListener('keyup', Input.keyUp)
        document.addEventListener('mousemove', Input.trackMouse);

        //document.addEventListener('contextmenu', (e) => e.preventDefault())
    }

    private static mouseDown(e: MouseEvent): void{
        Input.isMouseButtonDown.set(e.button, true);
    }

    private static keyDown(e: KeyboardEvent): void{
        Input.isKeyboardButtondown.set(e.key, true)
    }

    private static keyUp(e: KeyboardEvent): void{
        Input.isKeyboardButtondown.set(e.key, false);
    }

    private static mouseUp(e: MouseEvent): void {
        Input.isMouseButtonDown.set(e.button, false);
    }

    private static trackMouse(e: MouseEvent) {
        this.mousePosition = new Vector2(e.clientX, e.clientY);
    }

}
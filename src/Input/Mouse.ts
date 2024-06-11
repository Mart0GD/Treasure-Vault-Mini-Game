export class Mouse{
    public static readonly isButtonDown: Map<number, boolean> = new Map<number, boolean>();

    public initialize(): void{
        document.addEventListener('mousedown', Mouse.mouseDown)
        document.addEventListener('mouseup', Mouse.mouseUp)
    }
    private static mouseDown(e: MouseEvent): void{
        Mouse.isButtonDown.set(e.button, true);
    }

    private static mouseUp(e: MouseEvent): void{
        Mouse.isButtonDown.set(e.button, false);
    }

}
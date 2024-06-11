import { DisplayObject} from "pixi.js"

export interface IScene extends DisplayObject {
    load?(): void | Promise<void>;
    onDestroyed?(): void | Promise<void>; 
    start?(): void | Promise<void>;
    update?(dt: number): void;
    onResize?(width: number, height: number): void; 
}

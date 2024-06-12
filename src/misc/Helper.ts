import { Sprite } from "pixi.js";

export class Helper{

    public static resize(sprite: Sprite, newWidth: number, newHeight: number): void {
        if (sprite) {
            sprite.width = newWidth; sprite.height = newHeight;
            sprite.position.set(newWidth / 2, newHeight / 2);
        }
    }
}
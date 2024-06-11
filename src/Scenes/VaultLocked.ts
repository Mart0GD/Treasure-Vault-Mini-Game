import { Container, Sprite } from "pixi.js";
import * as PIXY from "pixi.js";
import { IScene } from "../core/scene";
import { AssetLoader } from "../core/AssetLoader"
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export class VaultLocked extends Container implements IScene {

    private handle: Sprite = new Sprite();

    public constructor() {
        super();
    }

    public async start(): Promise<void> {
        await AssetLoader.loadAssetsGroup('VaultLocked');
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXY);

        this.createSprites();
    }

    //#region  rotation
    private rotateWheelClockwise() {
        gsap.fromTo(this.handle, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) },
            duration: 1,
        }, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) + 60 },
            duration: 1,
        })
    }

    private rotateWheelCounterClockwise(){
        gsap.fromTo(this.handle, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) },
            duration: 1,
        }, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) - 60 },
            duration: 1,
        })
    }
    //#endregion


    //#region Sprites
    private createSprites(): void {
        window.addEventListener('resize', () => {
            this.resize(bg, window.innerWidth, window.innerHeight);
        })

        //Background
        const bg = Sprite.from('bg');
        bg.anchor.set(0.5, 0.5);
        this.resize(bg, window.innerWidth, window.innerHeight);
        this.addChild(bg);

        //Door
        const door = Sprite.from('door')
        door.anchor.set(0.5);
        bg.addChild(door);

        // Shadow
        const handleShadow = Sprite.from('handleShadow');
        handleShadow.position.x -= 90;
        handleShadow.pivot.set(-90, 0);
        handleShadow.anchor.set(0.6, 0.45)
        door.addChild(handleShadow);

        handleShadow.interactive = true;
        handleShadow.eventMode = 'dynamic';

        handleShadow.addEventListener('rightclick', () => this.rotateWheelCounterClockwise());
        handleShadow.addEventListener('click', () => this.rotateWheelClockwise());

        //Handle
        const handle = Sprite.from('handle');
        handle.anchor.set(0.63, 0.5);
        handleShadow.addChild(handle);

        this.handle = handleShadow;
    }

    private resize(sprite: Sprite, newWidth: number, newHeight: number): void {
        if (sprite) {
            sprite.width = newWidth; sprite.height = newHeight;
            sprite.position.set(newWidth / 2, newHeight / 2);
        }
    }
    //#endregion
}

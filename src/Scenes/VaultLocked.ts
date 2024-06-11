import { Container, Sprite } from "pixi.js";
import { IScene } from "../core/scene";
import {AssetLoader} from "../core/AssetLoader"

export class VaultLocked extends Container implements IScene{

    public async start(): Promise<void> {
        await AssetLoader.loadAssetsGroup('VaultLocked');
        window.addEventListener('resize', () => {
            bg.width = window.outerWidth; bg.height = window.outerHeight
            bg.position.set(window.outerWidth / 2, window.outerHeight / 2);
        })

        //Background
        const bg = Sprite.from('bg');
        bg.anchor.set(0.5,0.5)
        bg.width = window.outerWidth; bg.height = window.outerHeight
        bg.position.set(window.outerWidth / 2, window.outerHeight / 2);

        //Door
        const door = Sprite.from('door')
        door.anchor.set(0.5)

        this.addChild(bg);
        
    }

    public update(): void {
       
    }

    public constructor(){
        super();
    }

    private Resize(): void {
        
    }
}

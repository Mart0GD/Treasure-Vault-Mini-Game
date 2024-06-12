import { Container, Sprite } from "pixi.js";
import { IScene } from "../core/IScene";
import { AssetLoader } from "../core/AssetLoader";
import { Helper } from "../misc/Helper";


export class VaultUnlocked extends Container implements IScene{

    async start(): Promise<void> {
        await AssetLoader.loadAssetsGroup('VaultOpen');
        
        this.createSprites();
    }


    private createSprites(){

        // Background
        const bg = Sprite.from('bg');
        Helper.resize(bg, window.innerWidth, window.innerHeight);
        bg.anchor.set(0.5);
        this.addChild(bg);

        window.addEventListener('resize', () => Helper.resize(bg, window.innerWidth, window.innerHeight));
    }

}
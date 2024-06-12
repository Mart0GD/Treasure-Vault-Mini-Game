import { Container, Sprite } from "pixi.js";
import * as PIXY from "pixi.js";
import { IScene } from "../core/IScene";
import { AssetLoader } from "../core/AssetLoader"
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Timer } from "../prefabs/Timer";
import { Code } from "../prefabs/Code";
import { Input } from "../Input/Input";
import { SceneManager } from "../core/SceneManager";
import { VaultUnlocked } from "./VaultUnlocked";
import { Helper } from "../misc/Helper";
import { Globals } from "../core/Globals";

export class VaultLocked extends Container implements IScene {

    private currentSteps: number;
    private combinationsCounter: number;

    private handle: Sprite;
    private timer: Timer 
    private code: Code;

    public constructor() {
        super();
        console.log('Super duper secret code 🤫');

        this.code = new Code();
        this.timer = new Timer(64, 0xff0000);
        this.handle = new Sprite();
        Globals.timer = this.timer;

        this.currentSteps = 0;
        this.combinationsCounter = 0;
    }

    async start(): Promise<void> {
        await AssetLoader.loadAssetsGroup('VaultLocked');
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXY);

        this.createSprites();
        this.timer.startTimer();

        document.addEventListener('keydown', (e) => this.checkCurrentPass(e), { capture: true })
    }

    update(): void {
        if (Input.isKeyboardButtondown.get('1')) {
            this.timer.stopTimer();
            const nextScene = new VaultUnlocked();
            SceneManager.changeScene(nextScene);
        }
    }

    //#region Game Logic    

    private checkCurrentPass(e: KeyboardEvent): void {
        let currentCombination = this.code.getCombinations.find(x => !x.trigger);
        if (e.code != 'Enter' || Input.isKeyboardButtondown.get('Enter') || !currentCombination) return;

        this.combinationsCounter++;
        currentCombination.trigger = true;
        if (currentCombination && this.currentSteps == this.getNeededSteps()) {
            currentCombination.completed = true;
        }

        if (this.combinationsCounter == this.code.getCombinations.length) {
            this.checkFinalPass();
        }
    }

    private getNeededSteps(): number {
        let neededSteps = 0;

        for (const combination of this.code.getCombinations) {
            if (!combination.trigger) { break; }
            
            neededSteps = 
            combination.direction == this.code.getDirections[0]
                ? neededSteps + combination.steps
                : neededSteps - combination.steps
        }

        return neededSteps
    }

    private checkFinalPass(): void {
        if (this.code.getCombinations.every(combination => combination.completed)) {
            this.timer.stopTimer();
            const nextScene = new VaultUnlocked();
            SceneManager.changeScene(nextScene); 
            return;
        }

        this.refreshVault();
    }

    private refreshVault() {
        //console.clear();

        console.log('Told ya it was super duper secret 😜');
        this.currentSteps = 0;
        this.combinationsCounter = 0
        this.timer.stopTimer();
        this.handle.eventMode = 'none'

        gsap.fromTo(this.handle, {
            pixi: { rotation: this.handle.rotation },
            duration: 0
        }, {
            pixi: { rotation: 3000 },
            duration: 3,
            onComplete: () => {
                gsap.to(this.handle, {
                    pixi: { rotation: 0 },
                    duration: 3,
                    onComplete: () => {
                        this.timer.restartTimer()
                        this.handle.eventMode = 'dynamic';
                        this.code = new Code();
                    }
                });
            }
        })

    }

    //#endregion 

    //#region  rotation
    private rotateWheelClockwise() {
        gsap.fromTo(this.handle, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) },
            duration: 1,
        }, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) + 60 },
            duration: 1,
        })

        this.currentSteps += 1;
    }

    private rotateWheelCounterClockwise() {
        gsap.fromTo(this.handle, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) },
            duration: 1,
        }, {
            pixi: { rotation: (180 / Math.PI * this.handle.rotation) - 60 },
            duration: 1,
        })

        this.currentSteps -= 1;
    }
    //#endregion

    //#region Sprites
    private createSprites(): void {

        //Background
        const bg = Sprite.from('bg');
        bg.anchor.set(0.5, 0.5);
        Helper.resize(bg, window.innerWidth, window.innerHeight);
        this.addChild(bg);

        window.addEventListener('resize', () => Helper.resize(bg, window.innerWidth, window.innerHeight));

        //Door
        const door = Sprite.from('door')
        door.anchor.set(0.5);
        bg.addChild(door);


        // Shadow
        const handleShadow = Sprite.from('handleShadow');
        handleShadow.position.x -= 90;
        handleShadow.pivot.set(-68, 15);
        handleShadow.anchor.set(0.6, 0.45)
        door.addChild(handleShadow);

        //timer
        door.addChild(this.timer);
        this.timer.position.set(-1260, -180)

        handleShadow.eventMode = 'dynamic';
        handleShadow.cursor = 'pointer'

        handleShadow.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {this.rotateWheelClockwise()}
            else              {this.rotateWheelCounterClockwise()}
        });

        //Handle
        const handle = Sprite.from('handle');
        handle.anchor.set(0.6, 0.48);
        handleShadow.addChild(handle);

        this.handle = handleShadow;
    }

    //#endregion
}

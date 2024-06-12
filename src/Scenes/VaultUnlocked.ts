import { Container, Sprite } from "pixi.js";
import { IScene } from "../core/IScene";
import { AssetLoader } from "../core/AssetLoader";
import { Helper } from "../misc/Helper";
import * as PIXY from "pixi.js"
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/all";
import { Globals } from "../core/Globals";
import { Timer } from "../prefabs/Timer";
import { TimeKeeper } from "pixi-spine";
import { SceneManager } from "../core/SceneManager";
import { VaultLocked } from "./VaultLocked";


export class VaultUnlocked extends Container implements IScene {

    private timer: Timer;
    private timerForRestart: TimeKeeper;
    private closeDoorStarted = false;

    private closedDoor: Sprite;
    private openDoor: Sprite;

    constructor() {
        super();

        this.timer = Globals?.timer;
        this.timerForRestart = new TimeKeeper();
        this.closedDoor = new Sprite();
        this.openDoor = new Sprite();

    }

    async start(): Promise<void> {
        await AssetLoader.loadAssetsGroup('VaultOpen');
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXY);

        this.closedDoor = Sprite.from('door');
        this.openDoor = Sprite.from('doorOpen');
        this.createSprites();
    }

    update(): void {
        if (Math.round(this.timerForRestart.totalTime % 59) == 10) {
            this.closeDoor();
        }

        this.timerForRestart.update();
    }

    private closeDoor(): void {
        if (this.closeDoorStarted) return;1
        this.removeChildren(1,4)

        gsap.to(this.closedDoor, {
            pixi: { alpha: 1 },
            duration: 2,
        })

        gsap.to(this.openDoor.parent, {
            pixi: { alpha: 0 },
            duration: 1,
            onComplete: () => {
                gsap.fromTo(doorHandleShadow, {
                    pixi: { rotation: doorHandleShadow.rotation },
                    duration: 0
                }, {
                    pixi: { rotation: 3000 },
                    duration: 3,
                    onComplete: () => {
                        gsap.to(doorHandleShadow, {
                            pixi: { rotation: 0 },
                            duration: 3,
                            onComplete: () => {
                                console.clear();
                                SceneManager.changeScene(new VaultLocked());
                            }
                        });
                    }
                })
            }
        })

        const doorHandle = Sprite.from('handle');
        doorHandle.anchor.set(0.63, 0.5);

        const doorHandleShadow = Sprite.from('handleShadow');
        doorHandleShadow.position.x -= 90;
        doorHandleShadow.pivot.set(-90, 0);
        doorHandleShadow.anchor.set(0.6, 0.45)

        this.closedDoor.addChild(doorHandleShadow);
        doorHandleShadow.addChild(doorHandle);

        this.closeDoorStarted = true;
    }

    private createSprites(): void {

        // Background
        const bg = Sprite.from('bg');
        Helper.resize(bg, window.innerWidth, window.innerHeight);
        bg.anchor.set(0.5);
        this.addChild(bg);

        window.addEventListener('resize', () => Helper.resize(bg, window.innerWidth, window.innerHeight));
        this.createGlitters()

        // #region Vault Door

        this.closedDoor.anchor.set(0.5);
        bg.addChild(this.closedDoor);

        const openDoorShadow = Sprite.from('doorOpenShadow');
        openDoorShadow.anchor.set(0.5);
        openDoorShadow.alpha = 0;
        openDoorShadow.position.x = 1500;
        bg.addChild(openDoorShadow);

        this.openDoor.anchor.set(0.5);
        this.openDoor.position.x = -100;
        openDoorShadow.addChild(this.openDoor);

        // Animations
        gsap.to(this.closedDoor, {
            pixi: { alpha: 0 },
            duration: 1.5,
        })

        gsap.to(openDoorShadow, {
            pixi: { alpha: 1 },
            duration: 2
        })

        //#endregion

        this.openDoor.addChild(this.timer);
        this.timer.position.set(-2660, -180)

        //timer

    }

    private createGlitters(): void{
        const glitterOne = Sprite.from('blink');
        glitterOne.anchor.set(0.5);
        glitterOne.scale.set(0.2);
        glitterOne.position.set(770, 470)
        gsap.fromTo(glitterOne, {
            pixi: {scale: 0.2, rotation: 0},
            duration: 0,
            repeat: Infinity
        }, {
            pixi: {scale: 0.17, rotation: 5},
            duration: 1.8,
            repeat: Infinity,
            yoyo: true
        })

        const glitterTwo = Sprite.from('blink');
        glitterTwo.anchor.set(0.5);
        glitterTwo.scale.set(0.2);
        glitterTwo.position.set(650,460)
        gsap.fromTo(glitterTwo, {
            pixi: {scale: 0.2, rotation: 0},
            duration: 0,
            repeat: Infinity
        }, {
            pixi: {scale: 0.17, rotation: -8},
            duration: 2,
            repeat: Infinity,
            yoyo: true
        })

        const glitterThree = Sprite.from('blink');
        glitterThree.anchor.set(0.5);
        glitterThree.scale.set(0.2);
        glitterThree.position.set(830, 580)
        gsap.fromTo(glitterThree, {
            pixi: {scale: 0.2, rotation: 0},
            duration: 0,
            repeat: Infinity
        }, {
            pixi: {scale: 0.17, rotation: -10},
            duration: 1.5,
            repeat: Infinity,
            yoyo: true
        })

        this.addChild(glitterOne);
        this.addChild(glitterTwo);
        this.addChild(glitterThree);
    }

}
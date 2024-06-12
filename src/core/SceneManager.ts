import { Application } from "pixi.js";
import { IScene } from "./IScene";
import { AssetLoader } from "./AssetLoader";
import { Input } from "../Input/Input";
import { TextGenerator } from "./TextGenerator";

export class SceneManager {
    private constructor() { };

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return SceneManager._width;
    }

    public static get height(): number {
        return SceneManager._height;
    }

    public static Initialize(width: number, height: number, background: number): void {
        SceneManager._width = width;
        SceneManager._height = height;

        SceneManager.app = new Application<HTMLCanvasElement>({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            resizeTo: window,
            backgroundColor: background,
            width: width,
            height: height
        });

        AssetLoader.Initialize();
        Input.initialize();
        TextGenerator.loadFont('Play-Regular', "white", 'sans-serif', 32);
        (globalThis as any).__PIXI_APP__ = SceneManager.app;

        SceneManager.app.ticker.add(SceneManager.update);
    }

    public static async changeScene(Scene: IScene): Promise<void> {
        if (SceneManager.currentScene) {
            SceneManager.app.stage.removeChild(SceneManager?.currentScene);
            if (SceneManager.currentScene.onDestroyed) await SceneManager.currentScene.onDestroyed();
        }

        SceneManager.currentScene = Scene;

        if (SceneManager.currentScene.start) {

            SceneManager.currentScene.start();
        }
        SceneManager.app.stage.addChild(SceneManager.currentScene);
    }

    private static update(dt: number): void {
        if (SceneManager.currentScene && SceneManager.currentScene.update) {
            SceneManager.currentScene.update(dt);
        }
    }
}
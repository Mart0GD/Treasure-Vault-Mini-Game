import { BitmapText, Container, Ticker } from "pixi.js";
import { TextGenerator } from "../core/TextGenerator";
import { TimeKeeper } from "pixi-spine";

export class Timer extends Container{

    private timerText: BitmapText;
    private ticker: Ticker = new Ticker();
    public timer: TimeKeeper = new TimeKeeper();

    // time
    private minutes: number = 0;
    private seconds: number = 0;

    constructor(size: number, color: any) {
        super();
        this.timerText = TextGenerator.generateText("00:00",'Play-Regular',size, color);

        this.addChild(this.timerText)
        this.cursor = 'pointer'

        this.ticker.stop()
        this.ticker.add(() => this.update());
    }

    update(): void{
        this.timer.update();
        
        this.minutes = Math.floor(this.timer.totalTime / 59);
        this.seconds = Math.round(this.timer.totalTime % 59)
        
        this.timerText.text = this.getTimer;

    }

    public startTimer(){this.ticker.start(); }
    public stopTimer(){this.ticker.stop();}
    public restartTimer()
    {
        this.stopTimer()
        this.timer = new TimeKeeper();
        this.startTimer();
    }

    public get getTimer(){
        return this.seconds > 9 ? `0${this.minutes}:${this.seconds}` : `0${this.minutes}:0${this.seconds}`
    }
}
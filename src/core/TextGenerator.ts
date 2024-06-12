import { BitmapFont, BitmapText } from "pixi.js";

export class TextGenerator{

    public static loadFont(fontName: string, fill: string, fontFamily: string, fontSize: number){
        BitmapFont.from(fontName, {
            fill,
            fontFamily,
            fontSize,
        }, 
        {
            chars: [['a', 'z'], ['0', '9'], ['A', 'Z'], ' \\|/.-:^%$&*()!?']
        });
    }

    public static generateText(text: string, fontName: string, fontSize: number, tint: any): BitmapText{
        return new BitmapText(text, {
            fontName,
            fontSize,
            tint
        });
    }
}
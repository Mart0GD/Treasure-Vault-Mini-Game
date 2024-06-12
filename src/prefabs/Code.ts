import { Combination } from "./Combination";


export class Code {
    private readonly directions = ['clockwise', 'counterclockwise'];
    private readonly combinationsCount = 3;
    private readonly minSteps = 1;
    private readonly maxSteps = 9;

    private combinations: Combination[] = new Array<Combination>();

    constructor() {
        this.generateCode();
        console.log(this.combinations.map(x => `${x.steps}:${x.direction}`).join(";\n"));
    }

    private generateCode() {
        for(let i = 0; i < this.combinationsCount; i++){
            this.combinations.push(new Combination
                (Math.floor(Math.random() * (this.maxSteps - this.minSteps + 1) + this.minSteps), 
                this.directions[Math.round(Math.random())], 
                false,
                false))
        }

        let previousSteps = 0;
        for (const combination of this.combinations) {
            if (previousSteps != 0 && previousSteps == combination.steps) 
            {
                this.combinations = new Array<Combination>();
                this.generateCode();
            }
            previousSteps = (combination.steps as number);
        }
    }

    public get getCombinations(): Combination[]{
        return this.combinations;
    }

    public get getDirections(): string[]{
        return this.directions
    }
}

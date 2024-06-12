
export class Combination{
    steps: number;
    direction: string;
    completed: boolean;
    trigger: boolean;

    constructor(steps: number, direction: string, completed: boolean, trigger: boolean) {
        this.steps = steps;
        this.direction = direction;
        this.completed = completed;
        this.trigger = trigger;
    }

    
}
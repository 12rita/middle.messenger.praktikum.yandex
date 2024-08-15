export class Stack {
    state: unknown[] = [];
    constructor(args: unknown[]) {
        this.state.push(...args);
    }

    push = (...items: unknown[]) => {
        return this.state.push(...items);
    };

    pop = () => {
        return this.state.pop();
    };
}

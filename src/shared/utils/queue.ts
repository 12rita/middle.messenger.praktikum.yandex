export class Queue {
    queue: unknown[] = [];
    constructor(...item: unknown[]) {
        this.queue.push(...item);
    }
    enqueue(...item: unknown[]) {
        this.queue.push(...item);
    }
    dequeue() {
        return this.queue.shift();
    }
}

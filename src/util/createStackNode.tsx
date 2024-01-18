import { v4 as uuidv4 } from 'uuid';

interface StackType {
    posX: number;
    posY: number;
    height: number;
    width: number;
    value: string;
    id: string;
    id2: string;
}

interface StacksArray extends Array<StackType> { }


class StackNode {
    posX: number;
    posY: number;
    height: number;
    width: number;
    value: string;
    id: string;
    id2: string

    constructor(posX: number, posY: number, height: number, width: number, value: string, id: string, id2: string) {
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.width = width;
        this.value = value;
        this.id= id;
        this.id2= id2;
    }
}

class Stack {
    value: StacksArray;
    size: number;
    head: StackNode;
    push: Function;
    update: Function

    constructor() {
        this.value = [];
        this.size = this.value.length;
        this.head = this.value[this.size];
        this.push = (value: string, size: number) => {
            let posY, posX, height, width, id, id2;
            if (this.size > 0) {
                posY = this.head.posY - 20;
                posX = this.head.posX;
                height = this.head.height;
                width = this.head.width;
            } else {
                posY = 380;
                posX = (size - 25) / 2;
                height = 10;
                width = 25;
            }
            id = uuidv4()
            id2 = uuidv4()
            let newStackNode = new StackNode(posX, posY, height, width, value, id, id2);
            this.value.push(newStackNode);
            this.update()
        };
        this.update = () => {
            this.head = this.value[this.size];
        };

    }
}

export { Stack }
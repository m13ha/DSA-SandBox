import { v4 as uuidv4 } from 'uuid';

interface QueueType {
    posX: number;
    posY: number;
    height: number;
    width: number;
    value: string;
    id: string;
    id2: string;
}

interface QueuesArray extends Array<QueueType> { }


class QueueNode {
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
        this.id = id;
        this.id2 = id2;
    }
}

class Queue {
    value: QueuesArray;
    size: number;
    head: QueueNode;
    // push: Function;
    // update: Function

    constructor(value: QueuesArray, size: number) {
        this.value = value;
        this.size = size;
        this.head = this.value[this.size - 1];
    }


    enqueueNode(value: string, size: number) {
        let posY, posX, height, width, id, id2;
        if (this.size > 0) {
            posY = this.head.posY;
            posX = this.head.posX + 130;
            height = this.head.height;
            width = this.head.width;
        } else {
            posY = 200;
            posX = 60;
            height = 55;
            width = 120;
        }
        id = uuidv4()
        id2 = uuidv4()
        let newQueueNode = new QueueNode(posX, posY, height, width, value, id, id2);
        this.value.push(newQueueNode);
        this.size++
        this.head = this.value[this.size - 1];
    };


    dequeueNode() {
        if (this.size > 0) {
            this.value.shift();
            this.size--
            this.head = this.value[this.size - 1];
            this.moveQueueLeft()
        }
    }

    clearQueue() {
        this.value = [];
        this.size = 0
        this.head = this.value[this.size - 1];
    }

    moveQueueRight() {
        this.value.forEach((obj) => {
            obj.posX = obj.posX - 130
        })
    }

    moveQueueLeft() {
        this.value.forEach((obj) => {
            obj.posX = obj.posX - 130
        })
    }
}

export { Queue }
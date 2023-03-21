import Direction from "./ElevatorDirection.js";

class Elevator {
    constructor(id, floorCount, delay = 1000) {
        this.id = id;
        this.floorCount = floorCount;
        this.currentFloor = 0;
        this.delay = delay;
        this.doorOpen = false;
        this.doorClosed = true;
        this.direction = Direction.IDLE;
        this.targetFloors = [];
        this.pickupFloors = [];
    }

    addPickupFloor(floor) {
        if (floor < 0 || floor > this.floorCount)
            return;

        if (this.pickupFloors.includes(floor))
            return;

        if (this.direction === Direction.IDLE) {
            this.direction = floor > this.currentFloor ? Direction.PICKUP_UP : Direction.PICKUP_DOWN;
        }

        this.pickupFloors.push(floor);
        this.pickupFloors.sort((a, b) => a - b);
    }

    removePickupFloor(floor) {
        const index = this.pickupFloors.indexOf(floor);
        if (index >= 0){
            this.pickupFloors.splice(index, 1);
        }
    }

    addTargetFloor(floor) {
        if (floor < 0 || floor > this.floorCount)
            return;

        if (this.targetFloors.includes(floor))
            return;
        
        if (this.direction === Direction.IDLE) {
            this.direction = floor > this.currentFloor ? Direction.UP : Direction.DOWN;
        }

        this.targetFloors.push(floor);
        this.targetFloors.sort((a, b) => a - b);
    }

    removeTargetFloor(floor) {
        const index = this.targetFloors.indexOf(floor);
        if (index >= 0)
            this.targetFloors.splice(index, 1);
    }

    targetFloorsAbove(floor) {
        return this.targetFloors.filter(f => f > floor);
    }

    targetFloorsBelow(floor) {
        return this.targetFloors.filter(f => f < floor);
    }

    pickupFloorsAbove(floor) {
        return this.pickupFloors.filter(f => f > floor);
    }

    pickupFloorsBelow(floor) {
        return this.pickupFloors.filter(f => f < floor);
    }

    distanceToFloor(floor) {
        return Math.abs(this.currentFloor - floor);
    }

    isGoingPassFloor(floor) {
        const targetFloorsAbove = this.targetFloorsAbove(this.currentFloor);
        if (this.direction === Direction.UP && 
            targetFloorsAbove.length > 0 && 
            floor <= targetFloorsAbove[targetFloorsAbove.length - 1])
            return true;

        const targetFloorsBelow = this.targetFloorsBelow(this.currentFloor);
        if (this.direction === Direction.DOWN &&
            targetFloorsBelow.length > 0 &&
            floor >= targetFloorsBelow[0])
            return true;

        const pickupFloorsAbove = this.pickupFloorsAbove(this.currentFloor);
        if (this.direction === Direction.PICKUP_UP &&
            pickupFloorsAbove.length > 0 &&
            floor <= pickupFloorsAbove[pickupFloorsAbove.length - 1])
            return true;

        const pickupFloorsBelow = this.pickupFloorsBelow(this.currentFloor);
        if (this.direction === Direction.PICKUP_DOWN &&
            pickupFloorsBelow.length > 0 &&
            floor >= pickupFloorsBelow[0])
            return true;

        return false;
    }

    closeTheDoor(){
        this.doorOpen = false;
        setTimeout(() => this.doorClosed = true, this.delay);
    }

    update() {
        if (!this.doorClosed) 
            return;
        
        if (this.targetFloors.length === 0 && this.pickupFloors.length === 0) {
            this.direction = Direction.IDLE;
        }

        if (this.targetFloors.includes(this.currentFloor) || this.pickupFloors.includes(this.currentFloor)) {
            this.removeTargetFloor(this.currentFloor);
            this.removePickupFloor(this.currentFloor);
            this.doorOpen = true;
            this.doorClosed = false;
            setTimeout(this.closeTheDoor.bind(this), 2*this.delay);
            return;
        }
        if (this.direction === Direction.PICKUP_UP) {
            if (this.pickupFloorsAbove(this.currentFloor).length !== 0) {
                this.currentFloor += 1;
                return
            }
            this.direction = Direction.PICKUP_DOWN;
        }

        if (this.direction === Direction.PICKUP_DOWN) {
            if (this.pickupFloorsBelow(this.currentFloor).length !== 0) {
                this.currentFloor -= 1;
                return
            }
            this.direction = Direction.PICKUP_UP;
        }

        if (this.direction === Direction.UP) {
            if (this.targetFloorsAbove(this.currentFloor).length !== 0) {
                this.currentFloor += 1;
                return
            }
            this.direction = Direction.DOWN;
        }

        if (this.direction === Direction.DOWN) {
            if (this.targetFloorsBelow(this.currentFloor).length !== 0) {
                this.currentFloor -= 1;
                return
            }
            this.direction = Direction.UP;
        }
    }


}

export default Elevator;